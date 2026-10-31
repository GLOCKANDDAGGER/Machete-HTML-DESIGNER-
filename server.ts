import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser with higher limit for HTML content
app.use(express.json({ limit: "10mb" }));

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("Warning: GEMINI_API_KEY is not defined in the environment.");
}

// ---------------------- API ROUTES ----------------------

// Endpoint to check environment configuration (without exposing secrets)
app.get("/api/env-config", (req, res) => {
  res.json({
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasDefaultSmtp: !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ),
  });
});

// Endpoint to generate an email template using Gemini
app.post("/api/templates/generate", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API client is not initialized. Please verify your GEMINI_API_KEY in secrets.",
      });
    }

    const { prompt, category = "Promotion" } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const systemInstruction = `You are a world-class professional email template designer and front-end developer.
Your task is to design a gorgeous, highly responsive, extremely modern HTML email template or flyer.

Design and Compatibility Guidelines:
1. Since email clients are notoriously strict with CSS, you MUST style everything using inline CSS.
2. Use safe standard system fonts or clean general Google Fonts pairings like Inter, Helvetica, Georgia, or Arial. Include sensible fallbacks.
3. Design modern layouts using tables (<table>) to ensure 100% pixel-perfect rendering in Outlook, Gmail, Apple Mail, and others.
4. Set the main width to exactly 600px (or responsive up to 600px with max-width: 600px; width: 100%). Center it with margin: 0 auto.
5. Apply a beautifully crafted color scheme based on the user's prompt (e.g. a dark slate cosmic theme, clean minimalist light look, or vibrant warm coral accenting).
6. Include a striking, eye-catching hero banner section, clear headlines, structured text content with great line heights (1.5 - 1.6), and prominent Call-To-Action (CTA) buttons with clean, clickable look (background color, padding, rounded corners, white or high-contrast text).
7. Incorporate placeholder images using high-quality Unsplash URLs relevant to the prompt (e.g., for tech use tech gadgets, for clothing use apparel, for corporate use professional meeting desks). Ensure images have correct absolute URLs, alternative text, and display: block to prevent unwanted gaps.
8. Add a polished footer with fake company coordinates (e.g., "123 Creative Studio, Suite 100, San Francisco, CA"), unsubscribe links, and social media placeholding icons.
9. Avoid JavaScript, standard form inputs, iframes, external stylesheets, and web animations.

Your response must contain ONLY the raw HTML code. Do NOT wrap your output in markdown code blocks (e.g. do not wrap in \`\`\`html or \`\`\`). Start immediately with '<!DOCTYPE html>' and end with '</html>'.`;

    const userPrompt = `Design a premium, state-of-the-art HTML email template for the category: "${category}".
Prompt instruction: ${prompt}

Make sure it contains outstanding typography, ample padding (generous negative space), beautiful colors, and is highly professional. Please render all dummy text realistically (no "lorem ipsum" filler; write engaging, context-specific marketing copies or message content).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.75,
      },
    });

    let htmlCode = response.text || "";
    // Clean up any potential markdown formatting from the response
    if (htmlCode.includes("```html")) {
      htmlCode = htmlCode.split("```html")[1].split("```")[0];
    } else if (htmlCode.includes("```")) {
      htmlCode = htmlCode.split("```")[1].split("```")[0];
    }
    htmlCode = htmlCode.trim();

    if (!htmlCode.startsWith("<!DOCTYPE") && !htmlCode.startsWith("<html")) {
      // If the AI somehow didn't generate valid HTML, wrap it or return error
      if (htmlCode.includes("<html") || htmlCode.includes("<body")) {
        // AI returned partial HTML, leave as is
      } else {
        throw new Error("AI failed to generate a standard HTML layout. Please refine your prompt.");
      }
    }

    res.json({ html: htmlCode });
  } catch (error: any) {
    console.error("Template generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate email template." });
  }
});

// Endpoint to refine/edit an existing template using natural language
app.post("/api/templates/refine", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API client is not initialized. Please verify your GEMINI_API_KEY in secrets.",
      });
    }

    const { baseHtml, instruction } = req.body;
    if (!baseHtml || !instruction) {
      return res.status(400).json({ error: "baseHtml and instruction are required." });
    }

    const systemInstruction = `You are an expert HTML email refiner. You will receive an existing HTML email template and a specific instruction from the user on how to modify it.
Your task is to edit the HTML code precisely, keeping all other design elements intact while updating the template according to the instructions.

Rules for Refinement:
1. ONLY modify the parts that are directly affected by the user's instructions (e.g., if they ask to change the button color to emerald green, find the button or CTA styles and update them. If they say "make the heading text 'Join Us Today'", find the heading and change it).
2. Keep the entire template responsive and clean.
3. Keep all styles inline.
4. Maintain high-fidelity layouts using standard email table techniques.
5. Do NOT include markdown code blocks. Output ONLY the raw updated HTML from '<!DOCTYPE html>' to '</html>'.`;

    const userPrompt = `Here is the existing HTML email template code:
--- START OF EXISTING HTML ---
${baseHtml}
--- END OF EXISTING HTML ---

Please apply the following instruction carefully:
Instruction: "${instruction}"

Update the HTML code and return the fully modified raw HTML email template. Do not include any explanations, warnings, or markdown ticks. Return ONLY valid HTML.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.5, // slightly lower temperature for more precise editing
      },
    });

    let htmlCode = response.text || "";
    // Clean up any potential markdown formatting from the response
    if (htmlCode.includes("```html")) {
      htmlCode = htmlCode.split("```html")[1].split("```")[0];
    } else if (htmlCode.includes("```")) {
      htmlCode = htmlCode.split("```")[1].split("```")[0];
    }
    htmlCode = htmlCode.trim();

    res.json({ html: htmlCode });
  } catch (error: any) {
    console.error("Template refinement error:", error);
    res.status(500).json({ error: error.message || "Failed to refine email template." });
  }
});

// Endpoint to translate an existing template into a target language
app.post("/api/templates/translate", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API client is not initialized. Please verify your GEMINI_API_KEY in secrets.",
      });
    }

    const { html, language, subject } = req.body;
    if (!html || !language) {
      return res.status(400).json({ error: "html and language are required." });
    }

    console.log(`Translating email layout to ${language}...`);

    const systemInstruction = `You are an expert multi-lingual email localizer and professional HTML developer.
Your task is to translate the provided HTML email template into the requested target language while PERFECTLY preserving the entire HTML markup, tag structure, inline styles, CSS classes, image URLs, and anchor href attributes.

Rules for Translation:
1. Translate all visible human-readable text contents, button labels, titles, descriptions, and placeholder text into the requested target language.
2. Under no circumstances should you modify, remove, or disrupt any HTML tags, styles (e.g., style="..."), classes, attributes, image source paths (src), or links (href).
3. Ensure the translated text fits the design naturally and grammatically.
4. Keep any layout and structural dimensions intact.
5. Do NOT include markdown code blocks. Output ONLY the raw translated HTML from '<!DOCTYPE html>' or whatever tag the input HTML starts with and end with your final HTML.`;

    const userPrompt = `Please translate the following HTML email template into "${language}".

--- START OF HTML ---
${html}
--- END OF HTML ---

Return ONLY the raw translated HTML without any markdown formatting, explanations, or backticks.`;

    const [htmlResponse, subjectResponse] = await Promise.all([
      ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.3, // low temperature for precise translation
        },
      }),
      subject ? ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Translate this email subject line into "${language}". Keep the same tone, emojis, and formatting elements. Subject: "${subject}". Return ONLY the translated subject line, with no quotes, no explanations, no prefix.`,
      }) : Promise.resolve(null),
    ]);

    let htmlCode = htmlResponse.text || "";
    // Clean up any potential markdown formatting from the response
    if (htmlCode.includes("```html")) {
      htmlCode = htmlCode.split("```html")[1].split("```")[0];
    } else if (htmlCode.includes("```")) {
      htmlCode = htmlCode.split("```")[1].split("```")[0];
    }
    htmlCode = htmlCode.trim();

    const translatedSubject = subjectResponse ? (subjectResponse.text || "").trim() : subject;

    res.json({ html: htmlCode, subject: translatedSubject });
  } catch (error: any) {
    console.error("Template translation error:", error);
    res.status(500).json({ error: error.message || "Failed to translate email template." });
  }
});

// Endpoint to send the HTML email flyer
app.post("/api/email/send", async (req, res) => {
  try {
    const { to, subject, html, config } = req.body;

    if (!to || !subject || !html || !config) {
      return res.status(400).json({ error: "Recipient email (to), subject, html, and config are required." });
    }

    // Validate email simple format
    if (!to.includes("@")) {
      return res.status(400).json({ error: "Invalid recipient email address format." });
    }

    let resultMsg = "";
    let previewUrl = "";

    const fromName = config.fromName || "AI Email Designer";
    const fromEmail = config.fromEmail || "designer@ai-studio.local";

    if (config.provider === "test") {
      // Use Ethereal free SMTP test account for safe sandboxed delivery
      console.log("Creating Ethereal SMTP test account...");
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      const info = await transporter.sendMail({
        from: `"${fromName}" <${testAccount.user}>`, // use ethereal authenticated email
        to,
        subject,
        html,
      });

      previewUrl = nodemailer.getTestMessageUrl(info) || "";
      resultMsg = `Email successfully transmitted to test sandbox! Delivered to recipient: ${to}`;
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", previewUrl);

      return res.json({
        success: true,
        message: resultMsg,
        previewUrl: previewUrl,
        provider: "test",
        info: {
          messageId: info.messageId,
          recipient: to,
        },
      });
    } else if (config.provider === "smtp") {
      // Use custom SMTP credentials
      const host = config.smtpHost || process.env.SMTP_HOST;
      const port = Number(config.smtpPort) || Number(process.env.SMTP_PORT) || 587;
      const user = config.smtpUser || process.env.SMTP_USER;
      const pass = config.smtpPass || process.env.SMTP_PASS;
      const secure = config.smtpSecure !== undefined ? config.smtpSecure : (process.env.SMTP_SECURE === "true");

      if (!host || !user || !pass) {
        return res.status(400).json({
          error: "SMTP configuration is incomplete. Please specify SMTP host, user, and password.",
        });
      }

      console.log(`Sending email via custom SMTP: ${host}:${port}...`);
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false, // increase compatibility
        },
      });

      const finalFrom = fromEmail.includes("@") ? fromEmail : user;

      const info = await transporter.sendMail({
        from: `"${fromName}" <${finalFrom}>`,
        to,
        subject,
        html,
      });

      console.log("SMTP Message sent: %s", info.messageId);
      return res.json({
        success: true,
        message: `Email successfully sent to ${to} via custom SMTP.`,
        provider: "smtp",
        info: {
          messageId: info.messageId,
        },
      });
    } else if (config.provider === "resend") {
      // Use Resend API
      let resendKey = config.resendApiKey || process.env.RESEND_API_KEY;
      if (!resendKey) {
        return res.status(400).json({
          error: "Resend API Key is missing. Please provide it in the Sender Settings or configured secrets.",
        });
      }

      // Sanitize the key by trimming whitespace and stripping enclosing single or double quotes
      resendKey = resendKey.trim().replace(/^['"]|['"]$/g, '');

      console.log("Sending email via Resend API...");
      const finalFromEmail = fromEmail.includes("@") ? fromEmail : "onboarding@resend.dev";
      const cleanFromName = fromName.replace(/"/g, '').trim();
      const finalFrom = cleanFromName ? `"${cleanFromName}" <${finalFromEmail}>` : finalFromEmail;

      let response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: finalFrom,
          to,
          subject,
          html,
        }),
      });

      let data = await response.json() as any;

      if (!response.ok) {
        const errorMsg = data.message || "";
        // If it's an unverified domain error and the domain was not onboarding@resend.dev, try to fall back gracefully to onboarding@resend.dev
        if (errorMsg.toLowerCase().includes("not verified") && finalFromEmail !== "onboarding@resend.dev") {
          console.log(`Domain "${finalFromEmail}" is unverified. Retrying with onboarding@resend.dev...`);
          const fallbackFrom = cleanFromName ? `"${cleanFromName}" <onboarding@resend.dev>` : "onboarding@resend.dev";
          
          const fallbackResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fallbackFrom,
              to,
              subject,
              html,
            }),
          });
          
          const fallbackData = await fallbackResponse.json() as any;
          if (fallbackResponse.ok) {
            return res.json({
              success: true,
              message: `Email sent to ${to}. Notice: Custom domain "${finalFromEmail}" is unverified in your Resend account, so we used the sandbox "onboarding@resend.dev" address to successfully deliver the mail.`,
              provider: "resend",
              info: fallbackData,
            });
          } else {
            throw new Error(fallbackData.message || `Resend API returned status ${fallbackResponse.status}`);
          }
        }
        
        throw new Error(errorMsg || `Resend API returned status ${response.status}`);
      }

      console.log("Resend response:", data);
      return res.json({
        success: true,
        message: `Email successfully sent to ${to} via Resend API.`,
        provider: "resend",
        info: data,
      });
    } else {
      return res.status(400).json({ error: "Unsupported email sender provider." });
    }
  } catch (error: any) {
    console.error("Email sending error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while sending the email. Verify credentials and network availability.",
    });
  }
});

// ---------------------- VITE & STATIC FILES SETUP ----------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
