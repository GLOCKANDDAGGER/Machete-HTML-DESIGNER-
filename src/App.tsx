import React, { useState, useEffect } from "react";
import { EmailTemplate, SenderConfig, RecentProject, InsertImageOptions } from "./types";
import { PRESETS } from "./data/presets";
import TemplateGallery from "./components/TemplateGallery";
import AiAssistant from "./components/AiAssistant";
import EmailPreview from "./components/EmailPreview";
import SenderForm from "./components/SenderForm";
import RecentProjects from "./components/RecentProjects";
import InsertImageModal from "./components/InsertImageModal";
import PinLockScreen from "./components/PinLockScreen";
import { Sparkles, Library, Mail, Code, HelpCircle, CheckCircle, Flame, Server, Lock, Clock, Image as ImageIcon, ChevronDown, FolderOpen, Plus, Trash2 } from "lucide-react";

export default function App() {
  // Config states
  const [envConfig, setEnvConfig] = useState({
    hasGeminiKey: false,
    hasResendKey: false,
    hasDefaultSmtp: false,
  });

  // Authentication Lock State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Saved custom templates & Recent Projects
  const [customTemplates, setCustomTemplates] = useState<EmailTemplate[]>([]);
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);

  // Modals & Popovers
  const [isInsertImageOpen, setIsInsertImageOpen] = useState<boolean>(false);
  const [isHistoryDropdownOpen, setIsHistoryDropdownOpen] = useState<boolean>(false);

  // Check if session is already authenticated on mount
  useEffect(() => {
    const isAuthed = sessionStorage.getItem("app_pin_authenticated") === "true";
    if (isAuthed) {
      setIsAuthenticated(true);
    }
  }, []);

  // Active template states
  const [currentHtml, setCurrentHtml] = useState<string>("");
  const [activeTemplateName, setActiveTemplateName] = useState<string>("");
  const [activeSubject, setActiveSubject] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activePrompt, setActivePrompt] = useState<string>("");

  // Loading states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Left Column navigation tabs: 'ai' | 'gallery' | 'recent'
  const [activeLeftTab, setActiveLeftTab] = useState<"ai" | "gallery" | "recent">("ai");

  // Helper to record a project into Recent Projects history
  const recordRecentProject = (
    name: string,
    subject: string,
    html: string,
    category: string,
    prompt?: string
  ) => {
    if (!html || html.length < 50) return;

    setRecentProjects((prev) => {
      // Remove any existing entry with identical HTML or name to keep history fresh
      const filtered = prev.filter((p) => p.html !== html && p.name !== name);
      const newEntry: RecentProject = {
        id: "proj_" + Date.now(),
        name: name || "Untitled Flyer",
        subject: subject || "No Subject Line",
        html,
        category: category || "General",
        prompt,
        updatedAt: new Date().toISOString(),
      };
      const updated = [newEntry, ...filtered].slice(0, 20); // Keep up to 20 recent projects
      localStorage.setItem("ai_recent_projects", JSON.stringify(updated));
      return updated;
    });
  };

  // Load configuration, saved drafts, and recent projects on mount
  useEffect(() => {
    // Check environment indicators
    fetch("/api/env-config")
      .then((res) => res.json())
      .then((data) => setEnvConfig(data))
      .catch((err) => console.error("Error reading backend configuration:", err));

    // Load saved templates
    const savedTemplates = localStorage.getItem("ai_email_templates");
    if (savedTemplates) {
      try {
        setCustomTemplates(JSON.parse(savedTemplates));
      } catch (e) {
        console.error("Error parsing saved custom templates", e);
      }
    }

    // Load recent projects
    const savedRecents = localStorage.getItem("ai_recent_projects");
    if (savedRecents) {
      try {
        setRecentProjects(JSON.parse(savedRecents));
      } catch (e) {
        console.error("Error parsing recent projects history", e);
      }
    }

    // Set initial preset by default so user sees a beautiful workspace immediately
    if (PRESETS.length > 0) {
      const defaultPreset = PRESETS.find((p) => p.id === "orqd-express-wire") || PRESETS[0];
      setCurrentHtml(defaultPreset.html);
      setActiveTemplateName(defaultPreset.name);
      setActiveSubject(defaultPreset.subject);
      setActiveCategory(defaultPreset.category);
      setActivePrompt("Baseline Preset");

      // Record baseline initial preset into recents
      recordRecentProject(
        defaultPreset.name,
        defaultPreset.subject,
        defaultPreset.html,
        defaultPreset.category,
        "Baseline Preset"
      );
    }
  }, []);

  // Set selected template
  const handleSelectTemplate = (template: {
    name: string;
    subject: string;
    html: string;
    category: string;
    prompt: string;
  }) => {
    setCurrentHtml(template.html);
    setActiveTemplateName(template.name);
    setActiveSubject(template.subject);
    setActiveCategory(template.category);
    setActivePrompt(template.prompt);

    recordRecentProject(template.name, template.subject, template.html, template.category, template.prompt);
  };

  // Generate a brand new template using Gemini API
  const handleGenerateTemplate = async (prompt: string, category: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/templates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, category }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate template from AI service.");
      }

      const generatedName = `AI Designed ${category} Flyer`;
      const generatedSubject = data.subject || `Exclusive Modern ${category} Flyer`;

      setCurrentHtml(data.html);
      setActiveTemplateName(generatedName);
      setActiveSubject(generatedSubject);
      setActiveCategory(category);
      setActivePrompt(prompt);
      setActiveLeftTab("ai"); // ensure AI tab is active to refine

      recordRecentProject(generatedName, generatedSubject, data.html, category, prompt);
    } catch (error: any) {
      alert(`AI Design Error: ${error.message || "Something went wrong"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Refine / edit an existing template using natural language instructions
  const handleRefineTemplate = async (instruction: string) => {
    if (!currentHtml) return;
    setIsRefining(true);
    try {
      const response = await fetch("/api/templates/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseHtml: currentHtml, instruction }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to refine template.");
      }

      const updatedName = activeTemplateName ? `${activeTemplateName} (Edited)` : "Refined Flyer";

      setCurrentHtml(data.html);
      setActiveTemplateName(updatedName);
      setActivePrompt(instruction);

      recordRecentProject(updatedName, activeSubject, data.html, activeCategory, instruction);
    } catch (error: any) {
      alert(`AI Refinement Error: ${error.message || "Failed to update template"}`);
    } finally {
      setIsRefining(false);
    }
  };

  // Translate template to a target language
  const handleTranslateTemplate = async (language: string) => {
    if (!currentHtml) return;
    setIsTranslating(true);
    try {
      const response = await fetch("/api/templates/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: currentHtml, language, subject: activeSubject }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to translate template.");
      }

      const translatedName = `${activeTemplateName || "Flyer"} (${language})`;
      const finalSubject = data.subject || activeSubject;

      setCurrentHtml(data.html);
      setActiveTemplateName(translatedName);
      if (data.subject) {
        setActiveSubject(data.subject);
      }

      recordRecentProject(translatedName, finalSubject, data.html, activeCategory, `Translated to ${language}`);
    } catch (error: any) {
      alert(`AI Translation Error: ${error.message || "Failed to translate template"}`);
    } finally {
      setIsTranslating(false);
    }
  };

  // Direct Image Insertion Handler
  const handleInsertImageDirect = (options: InsertImageOptions) => {
    if (!currentHtml) return;

    const imgTable = `
<!-- INSERTED IMAGE BLOCK -->
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 16px 0;">
  <tr>
    <td align="${options.alignment}">
      ${options.linkUrl ? `<a href="${options.linkUrl}" target="_blank" style="text-decoration:none;">` : ""}
        <img src="${options.url}" alt="${options.alt}" style="max-width: ${options.maxWidth}; width: 100%; height: auto; border: 0; display: inline-block; border-radius: ${options.borderRadius};" />
      ${options.linkUrl ? `</a>` : ""}
    </td>
  </tr>
</table>`;

    let updatedHtml = currentHtml;

    if (options.position === "hero") {
      if (updatedHtml.includes("<body")) {
        updatedHtml = updatedHtml.replace(/(<body[^>]*>)/i, `$1\n${imgTable}`);
      } else {
        updatedHtml = imgTable + updatedHtml;
      }
    } else if (options.position === "footer") {
      if (updatedHtml.includes("</body>")) {
        updatedHtml = updatedHtml.replace("</body>", `${imgTable}\n</body>`);
      } else {
        updatedHtml = updatedHtml + imgTable;
      }
    } else if (options.position === "logo") {
      if (updatedHtml.includes("<body")) {
        updatedHtml = updatedHtml.replace(/(<body[^>]*>)/i, `$1\n${imgTable}`);
      } else {
        updatedHtml = imgTable + updatedHtml;
      }
    } else {
      // Content position: place before body close or middle table
      if (updatedHtml.includes("</table>")) {
        const lastTableIdx = updatedHtml.lastIndexOf("</table>");
        updatedHtml = updatedHtml.slice(0, lastTableIdx) + imgTable + updatedHtml.slice(lastTableIdx);
      } else {
        updatedHtml = updatedHtml + imgTable;
      }
    }

    const updatedName = activeTemplateName ? `${activeTemplateName} (+Image)` : "Flyer with Image";

    setCurrentHtml(updatedHtml);
    setActiveTemplateName(updatedName);
    recordRecentProject(updatedName, activeSubject, updatedHtml, activeCategory, `Inserted image (${options.alt})`);
  };

  // AI-Assisted Image Insertion Handler
  const handleInsertImageViaAi = async (options: InsertImageOptions) => {
    const aiInstruction = `Insert image with src="${options.url}" and alt="${options.alt}" at the ${options.position} position. Align it ${options.alignment}, set max-width to ${options.maxWidth}, and border-radius to ${options.borderRadius}.${options.linkUrl ? " Wrap the image in a hyperlink pointing to " + options.linkUrl : ""}`;
    await handleRefineTemplate(aiInstruction);
  };

  // Recent Projects Actions
  const handleDeleteRecentProject = (id: string) => {
    const updated = recentProjects.filter((p) => p.id !== id);
    setRecentProjects(updated);
    localStorage.setItem("ai_recent_projects", JSON.stringify(updated));
  };

  const handleClearAllRecentProjects = () => {
    setRecentProjects([]);
    localStorage.removeItem("ai_recent_projects");
  };

  const handleSaveRecentAsTemplate = (project: RecentProject) => {
    handleSaveTemplate(project.name, project.subject, project.html, project.category, project.prompt || "Recent Project");
    setActiveLeftTab("gallery");
  };

  const handleDuplicateRecentProject = (project: RecentProject) => {
    const copyName = `${project.name} (Copy)`;
    recordRecentProject(copyName, project.subject, project.html, project.category, project.prompt);
    handleSelectTemplate({
      name: copyName,
      subject: project.subject,
      html: project.html,
      category: project.category,
      prompt: project.prompt || "Duplicated Project",
    });
  };

  // Save active design to localStorage
  const handleSaveTemplate = (
    name: string,
    subject: string,
    html: string,
    category: string,
    prompt: string
  ) => {
    const newTemplate: EmailTemplate = {
      id: "tpl_" + Date.now(),
      name,
      subject,
      html,
      category,
      prompt,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [newTemplate, ...customTemplates];
    setCustomTemplates(updatedList);
    localStorage.setItem("ai_email_templates", JSON.stringify(updatedList));

    // Update active states
    setActiveTemplateName(name);
    setActiveSubject(subject);
    setActiveCategory(category);

    recordRecentProject(name, subject, html, category, prompt);
  };

  // Delete saved draft from localStorage
  const handleDeleteCustomTemplate = (id: string) => {
    const updated = customTemplates.filter((t) => t.id !== id);
    setCustomTemplates(updated);
    localStorage.setItem("ai_email_templates", JSON.stringify(updated));

    // If deleted template was currently active, fall back to default
    const deleted = customTemplates.find((t) => t.id === id);
    if (deleted && activeTemplateName === deleted.name) {
      if (PRESETS.length > 0) {
        handleSelectTemplate({
          name: PRESETS[0].name,
          subject: PRESETS[0].subject,
          html: PRESETS[0].html,
          category: PRESETS[0].category,
          prompt: "Baseline Preset",
        });
      }
    }
  };

  // Transmit HTML template via email
  const handleSendEmail = async (payload: {
    to: string;
    subject: string;
    html: string;
    config: SenderConfig;
  }) => {
    setIsSending(true);
    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return {
        success: response.ok,
        message: data.message || data.error || "Completed sending operation.",
        previewUrl: data.previewUrl,
        info: data.info,
      };
    } catch (error: any) {
      console.error("Email API communication error:", error);
      return {
        success: false,
        message: error.message || "Failed to transmit message through server API.",
      };
    } finally {
      setIsSending(false);
    }
  };

  if (!isAuthenticated) {
    return <PinLockScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 overflow-hidden">
      {/* Insert Image Modal Component */}
      <InsertImageModal
        isOpen={isInsertImageOpen}
        onClose={() => setIsInsertImageOpen(false)}
        onInsertDirect={handleInsertImageDirect}
        onInsertViaAi={handleInsertImageViaAi}
        isRefining={isRefining}
      />

      {/* Top Application Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-8 py-3.5 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-100">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <div>
            <h1 className="text-md font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
              ai.machete <span className="text-indigo-600 font-extrabold">HTML MAILER</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Professional Design Suite</p>
          </div>
        </div>

        {/* Quick Toolbar & Status Badges */}
        <div className="flex items-center gap-2.5">
          {/* Quick Insert Image Button */}
          <button
            onClick={() => setIsInsertImageOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 rounded-full text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
            title="Insert or upload image into email"
          >
            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Insert Image</span>
          </button>

          {/* Quick Recent Projects Header Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsHistoryDropdownOpen(!isHistoryDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-[10px] font-bold text-slate-700 transition-all cursor-pointer"
              title="Recent projects history"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Recent Projects</span>
              {recentProjects.length > 0 && (
                <span className="px-1.5 py-0.2 bg-indigo-600 text-white rounded-full text-[9px] font-bold">
                  {recentProjects.length}
                </span>
              )}
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isHistoryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    Recent Projects History
                  </span>
                  <button
                    onClick={() => {
                      setActiveLeftTab("recent");
                      setIsHistoryDropdownOpen(false);
                    }}
                    className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    View All ({recentProjects.length})
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                  {recentProjects.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No recent history yet</p>
                  ) : (
                    recentProjects.slice(0, 5).map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          handleSelectTemplate({
                            name: proj.name,
                            subject: proj.subject,
                            html: proj.html,
                            category: proj.category,
                            prompt: proj.prompt || "",
                          });
                          setIsHistoryDropdownOpen(false);
                        }}
                        className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">{proj.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">{proj.subject}</p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0 font-semibold">
                          {proj.category || "Flyer"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("app_pin_authenticated");
              setIsAuthenticated(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 transition-all cursor-pointer"
            title="Lock workspace"
          >
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            Lock App
          </button>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Server: Connected
          </div>

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-[10px] font-bold ${
              envConfig.hasGeminiKey
                ? "bg-indigo-50 border-indigo-100 text-indigo-700"
                : "bg-red-50 border-red-100 text-red-700"
            }`}
          >
            <Server className="w-3.5 h-3.5 text-indigo-600" />
            Gemini API: {envConfig.hasGeminiKey ? "Active" : "Keys Missing"}
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-104px)] overflow-hidden">
        {/* Left Workspace Panel: Designer Suite (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col h-full gap-4 overflow-hidden">
          {/* Segmented Switcher Controls */}
          <div className="flex bg-slate-150 p-1 rounded-xl border border-slate-200 bg-slate-200/50 shrink-0">
            <button
              onClick={() => setActiveLeftTab("ai")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeLeftTab === "ai"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Design
            </button>
            <button
              onClick={() => setActiveLeftTab("gallery")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeLeftTab === "gallery"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              Templates
            </button>
            <button
              onClick={() => setActiveLeftTab("recent")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer relative ${
                activeLeftTab === "recent"
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Recent
              {recentProjects.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              )}
            </button>
          </div>

          {/* Left panel body render based on tab */}
          <div className="flex-1 overflow-hidden h-full">
            {activeLeftTab === "ai" ? (
              <AiAssistant
                currentHtml={currentHtml}
                activeTemplateName={activeTemplateName}
                activeSubject={activeSubject}
                activeCategory={activeCategory}
                activePrompt={activePrompt}
                onGenerate={handleGenerateTemplate}
                onRefine={handleRefineTemplate}
                onSaveTemplate={handleSaveTemplate}
                onTranslate={handleTranslateTemplate}
                onOpenInsertImage={() => setIsInsertImageOpen(true)}
                isGenerating={isGenerating}
                isRefining={isRefining}
                isTranslating={isTranslating}
                hasEnvKey={envConfig.hasGeminiKey}
              />
            ) : activeLeftTab === "gallery" ? (
              <TemplateGallery
                customTemplates={customTemplates}
                onSelectTemplate={handleSelectTemplate}
                onDeleteCustomTemplate={handleDeleteCustomTemplate}
                activeTemplateName={activeTemplateName}
              />
            ) : (
              <RecentProjects
                recentProjects={recentProjects}
                activeProjectHtml={currentHtml}
                onSelectProject={(project) =>
                  handleSelectTemplate({
                    name: project.name,
                    subject: project.subject,
                    html: project.html,
                    category: project.category,
                    prompt: project.prompt || "",
                  })
                }
                onDeleteProject={handleDeleteRecentProject}
                onClearAll={handleClearAllRecentProjects}
                onSaveAsTemplate={handleSaveRecentAsTemplate}
                onDuplicateProject={handleDuplicateRecentProject}
              />
            )}
          </div>
        </div>

        {/* Right Workspace Panel: Interactive Preview & Email Transmission (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col h-full gap-5 overflow-hidden">
          {/* Real-time design preview device viewport */}
          <div className="flex-1 overflow-hidden min-h-[350px]">
            <EmailPreview
              html={currentHtml}
              subject={activeSubject}
              onOpenInsertImage={() => setIsInsertImageOpen(true)}
            />
          </div>

          {/* Email dispatch controller */}
          <div className="shrink-0">
            <SenderForm
              html={currentHtml}
              defaultSubject={activeSubject}
              onSendEmail={handleSendEmail}
              isSending={isSending}
              envConfig={envConfig}
            />
          </div>
        </div>
      </main>

      {/* Polish Theme Footer */}
      <footer className="h-10 px-8 flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-white border-t border-slate-200 shrink-0">
        <div>Draft Version 4.2 • Design Engine: Gemini 3.5 Flash</div>
        <div className="flex gap-6">
          <span>System Latency: 28ms</span>
          <span className="text-emerald-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            AI Optimized
          </span>
        </div>
      </footer>
    </div>
  );
}

