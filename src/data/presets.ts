export interface TemplatePreset {
  id: string;
  name: string;
  subject: string;
  category: string;
  html: string;
}

export const PRESETS: TemplatePreset[] = [
  {
    id: "promo-sale",
    name: "Summer Splash Clearance Sale",
    subject: "🔥 Exclusive Deal: Up to 50% Off Everything!",
    category: "Promotion",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Summer Splash Clearance Sale</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Card Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);">
          
          <!-- Header Accent Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); padding: 8px; text-align: center;"></td>
          </tr>

          <!-- Brand Logo / Header -->
          <tr>
            <td align="center" style="padding: 30px 20px 20px 20px;">
              <span style="font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #1e293b; text-transform: uppercase;">AURA <span style="color: #f97316;">BOUTIQUE</span></span>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td align="center">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=300&q=80" alt="Summer Clearance Banner" width="600" style="width: 100%; max-width: 600px; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Main Callout -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1.2;">SUMMER SPLASH</h1>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: #ef4444; letter-spacing: 2px; text-transform: uppercase;">The Mega Clearance Event</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding: 0 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e2e8f0;">
                <tr><td></td></tr>
              </table>
            </td>
          </tr>

          <!-- Body Description -->
          <tr>
            <td style="padding: 25px 40px; text-align: center; color: #475569; font-size: 16px; line-height: 1.6;">
              Beat the heat with our hottest deals of the year. For the next 48 hours only, save up to <strong style="color: #0f172a;">50% off</strong> our entire summer catalog including swimsuits, linen apparel, and activewear accessories. Use coupon code below at checkout.
            </td>
          </tr>

          <!-- Coupon Code Display -->
          <tr>
            <td align="center" style="padding: 10px 40px 30px 40px;">
              <table border="0" cellspacing="0" cellpadding="0" style="background-color: #fef3c7; border: 2px dashed #f59e0b; border-radius: 8px;">
                <tr>
                  <td style="padding: 12px 30px; font-size: 20px; font-weight: 700; color: #b45309; letter-spacing: 4px; font-family: monospace;">SUMMER50</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 30px; background-color: #f97316;">
                    <a href="https://example.com/shop" target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 0.5px; border-radius: 30px;">SHOP THE SALE NOW</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Multi-column Feature Grid -->
          <tr>
            <td style="padding: 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Feature 1 -->
                  <td width="48%" valign="top">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=260&h=160&q=80" alt="New Apparel" width="100%" style="border-radius: 8px; display: block; margin-bottom: 15px;" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 700; color: #1e293b;">Resort Wear</h3>
                          <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.4;">Unwind in premium breathable fabrics and flowy cuts.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <!-- Spacer -->
                  <td width="4%"></td>
                  <!-- Feature 2 -->
                  <td width="48%" valign="top">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=260&h=160&q=80" alt="Footwear" width="100%" style="border-radius: 8px; display: block; margin-bottom: 15px;" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 700; color: #1e293b;">Summer Kicks</h3>
                          <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.4;">Comfortable shoes designed for beachside walks and city hikes.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 40px; text-align: center; border-radius: 0 0 16px 16px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom: 20px; color: #94a3b8; font-size: 12px; line-height: 1.5;">
                    You are receiving this email because you subscribed to receive promotional newsletters from Aura Boutique.<br />
                    123 Creative Boulevard, Suite 500, San Francisco, CA 94107
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #334155; padding-top: 20px;">
                    <a href="https://example.com/unsubscribe" style="color: #38bdf8; text-decoration: underline; font-size: 13px;">Unsubscribe</a>
                    <span style="color: #475569; padding: 0 10px;">|</span>
                    <a href="https://example.com/privacy" style="color: #38bdf8; text-decoration: underline; font-size: 13px;">Privacy Policy</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "welcome-email",
    name: "Minimalist Welcome Email",
    subject: "✨ Welcome to the Community! (Important details inside)",
    category: "Welcome",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Community!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          
          <!-- Logo Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: left;">
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: bold; color: #111111;">◇ PROJECT_NUCLEUS</span>
            </td>
          </tr>

          <!-- Greeting & Main Text -->
          <tr>
            <td style="padding: 20px 40px; text-align: left;">
              <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #111111; letter-spacing: -0.5px; line-height: 1.3;">Welcome to the next chapter.</h1>
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #444444;">We're absolutely thrilled to have you join our private beta community. Our mission is to simplify workflow architectures and restore precious headspace back to builders.</p>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #444444;">Before we get started, here are three high-priority steps to make the absolute most of your account dashboard:</p>
            </td>
          </tr>

          <!-- Process / Checklist -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <!-- Step 1 -->
                <tr>
                  <td valign="top" style="padding-bottom: 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="top">
                          <span style="display: block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #111111; color: #ffffff; text-align: center; font-size: 13px; font-weight: bold;">1</span>
                        </td>
                        <td valign="top" style="padding-left: 12px;">
                          <h3 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #111111;">Claim Your Handle</h3>
                          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666666;">Reserve your unique namespace and setup your default user profile settings.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Step 2 -->
                <tr>
                  <td valign="top" style="padding-bottom: 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="top">
                          <span style="display: block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #111111; color: #ffffff; text-align: center; font-size: 13px; font-weight: bold;">2</span>
                        </td>
                        <td valign="top" style="padding-left: 12px;">
                          <h3 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #111111;">Integrate API Streams</h3>
                          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666666;">Synchronize external telemetry and trigger automated pipeline deployments instantly.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Step 3 -->
                <tr>
                  <td valign="top" style="padding-bottom: 10px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="top">
                          <span style="display: block; width: 24px; height: 24px; line-height: 24px; border-radius: 50%; background-color: #111111; color: #ffffff; text-align: center; font-size: 13px; font-weight: bold;">3</span>
                        </td>
                        <td valign="top" style="padding-left: 12px;">
                          <h3 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #111111;">Invite Collaborators</h3>
                          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666666;">Onboard up to five team engineers for shared dashboards and notification grids.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary Button -->
          <tr>
            <td style="padding: 20px 40px 40px 40px; text-align: left;">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 4px; background-color: #111111;">
                    <a href="https://example.com/onboard" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 4px;">Launch Setup Console</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quote Signoff -->
          <tr>
            <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #eaeaea;">
              <p style="margin: 0 0 10px 0; font-style: italic; color: #555555; font-size: 14px; line-height: 1.5;">"The details are not the details. They make the design."</p>
              <span style="font-size: 12px; font-weight: 600; color: #111111; text-transform: uppercase; letter-spacing: 0.5px;">— Charles Eames</span>
            </td>
          </tr>

          <!-- Simple Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #111111; text-align: left; color: #888888; font-size: 12px; line-height: 1.6;">
              Project Nucleus Ltd, 85 Great Portland St, London, W1W 7LT, UK.<br />
              Unsubscribe anytime from <a href="https://example.com/optout" style="color: #ffffff; text-decoration: underline;">notification preferences</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "product-launch",
    name: "Sleek Product Launch Flyer",
    subject: "⚡ Introducing the All-New Chronos Pro Smartwatch",
    category: "Product Launch",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Introducing Chronos Pro</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #030712; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Card with midnight glow border -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #090d16; border: 1px solid #1f2937; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);">
          
          <!-- Brand Logo/Header -->
          <tr>
            <td style="padding: 30px 40px 10px 40px; text-align: center;">
              <span style="font-size: 18px; font-weight: 800; color: #f3f4f6; letter-spacing: 3px; text-transform: uppercase;">CHRONOS <span style="color: #6366f1;">LABS</span></span>
            </td>
          </tr>

          <!-- Tagline -->
          <tr>
            <td style="padding: 20px 40px 30px 40px; text-align: center;">
              <h1 style="margin: 0 0 10px 0; font-size: 36px; font-weight: 800; color: #ffffff; line-height: 1.1; letter-spacing: -1px;">TIME, REDEFINED.</h1>
              <p style="margin: 0; font-size: 16px; color: #9ca3af; line-height: 1.5;">Meet the ultimate titanium smartwatch for elite athletes and creatives alike.</p>
            </td>
          </tr>

          <!-- Hero Video Frame / Image Mockup -->
          <tr>
            <td align="center" style="padding: 0 20px;">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=560&h=320&q=80" alt="Chronos Pro Smartwatch" width="560" style="width: 100%; max-width: 560px; height: auto; border-radius: 16px; display: block; border: 1px solid #374151;" />
            </td>
          </tr>

          <!-- Core Value Proposition Grid -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Feature A -->
                  <td width="48%" valign="top" style="padding-bottom: 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <span style="font-size: 12px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 1px;">Materiality</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #ffffff;">Grade 5 Titanium</h4>
                          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #9ca3af;">Feather-light durability designed to withstand extreme thermal conditions.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="4%"></td>
                  <!-- Feature B -->
                  <td width="48%" valign="top" style="padding-bottom: 20px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <span style="font-size: 12px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 1px;">Longevity</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #ffffff;">30-Day Battery</h4>
                          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #9ca3af;">Revolutionary micro-solar cell array provides endless backup charge.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Banner Box -->
          <tr>
            <td align="center" style="padding: 10px 40px 40px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #111827; border-radius: 16px; padding: 30px; border: 1px solid #1f2937; text-align: center;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700; color: #ffffff;">Early Adopter Access</h3>
                    <p style="margin: 0 0 20px 0; font-size: 14px; color: #9ca3af; line-height: 1.5;">Reserve your serial-numbered timepiece before the official public release. Limited to 500 units worldwide.</p>
                    <table border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td align="center" style="border-radius: 8px; background-color: #6366f1;">
                          <a href="https://example.com/reserve" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px;">Pre-Order Chronos Pro</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #030712; padding: 40px; text-align: center; border-top: 1px solid #1f2937;">
              <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 11px; line-height: 1.6;">
                Chronos Labs Inc. &copy; 2026. All rights reserved.<br />
                Infinity Tower, Sector 7, Tokyo, Japan
              </p>
              <a href="https://example.com/unsubscribe" style="color: #4f46e5; text-decoration: none; font-size: 12px; font-weight: 600;">Update Preferences</a>
              <span style="color: #1f2937; padding: 0 8px;">&middot;</span>
              <a href="https://example.com/support" style="color: #4f46e5; text-decoration: none; font-size: 12px; font-weight: 600;">Contact Engineer</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "orqd-express-wire",
    name: "Or&Qd.Fi - Express Wire & Money Delivery Receipt",
    subject: "⚡ Or&Qd.Fi Financial: $3,450.00 Express Money Delivery Completed (*7702)",
    category: "Transfer Delivery",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Or&Qd.Fi Financial Institution - Money Delivery Receipt</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 12px 20px; text-align: center; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
              🏛️ Or&Qd.Fi • ONLINE RELIABLE & QUICK DELIVERY LLC FINANCIAL INSTITUTION
            </td>
          </tr>

          <!-- Header / Brand Logo Bar -->
          <tr>
            <td style="padding: 32px 40px 20px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; font-family: 'Segoe UI', sans-serif;">
                      Or&Qd.<span style="color: #2563eb;">Fi</span>
                    </span>
                    <span style="font-size: 11px; font-weight: 800; color: #1e40af; background-color: #eff6ff; padding: 4px 8px; border-radius: 6px; border: 1px solid #bfdbfe; vertical-align: middle; margin-left: 8px;">
                      FINANCIAL INSTITUTION
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-family: monospace; color: #2563eb; background-color: #eff6ff; padding: 6px 10px; border-radius: 8px; border: 1px solid #bfdbfe; font-weight: 700;">
                      WIRE #ORD-88219-FI
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding: 0 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e2e8f0;">
                <tr><td></td></tr>
              </table>
            </td>
          </tr>

          <!-- Headline Banner & Status -->
          <tr>
            <td style="padding: 30px 40px 15px 40px; text-align: left;">
              <div style="display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 12px; font-weight: 800; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
                ✅ Express Funds Delivered
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">Your $3,450.00 Wire Delivery is Complete!</h1>
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Dear Valued Account Holder, <strong>Or&Qd.Fi (Online Reliable & Quick Delivery LLC)</strong> has successfully processed and delivered your express transfer directly into your designated high-yield vault account.
              </p>
            </td>
          </tr>

          <!-- Transfer Amount & Account Box -->
          <tr>
            <td style="padding: 10px 40px 25px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 16px; padding: 24px;">
                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Amount Delivered</span>
                          <h2 style="margin: 4px 0 0 0; font-size: 32px; font-weight: 900; color: #1e3a8a;">$3,450.00 USD</h2>
                        </td>
                        <td align="right" valign="top">
                          <span style="font-size: 12px; font-weight: 700; color: #15803d; background-color: #dcfce7; padding: 6px 12px; border-radius: 8px;">FDIC Insured Pass</span>
                        </td>
                      </tr>
                    </table>

                    <!-- Details Table -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                      <tr>
                        <td style="font-size: 12px; font-weight: 700; color: #64748b; padding-bottom: 8px; text-transform: uppercase;">Originating Bank</td>
                        <td align="right" style="font-size: 13px; font-weight: 700; color: #0f172a; padding-bottom: 8px;">Or&Qd.Fi Federal Wire Portal</td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-weight: 700; color: #64748b; padding-bottom: 8px; text-transform: uppercase;">Destination Account</td>
                        <td align="right" style="font-size: 13px; font-weight: 700; color: #0f172a; padding-bottom: 8px;">Or&Qd.Fi High-Yield Checking (*7702)</td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-weight: 700; color: #64748b; padding-bottom: 8px; text-transform: uppercase;">Delivery Time</td>
                        <td align="right" style="font-size: 13px; font-weight: 700; color: #0f172a; padding-bottom: 8px;">Today, 06:34:12 EST</td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Transaction ID</td>
                        <td align="right" style="font-size: 13px; font-weight: 800; color: #2563eb; font-family: monospace;">TXN-ORQD-99214-SEC</td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Security Badge Grid -->
          <tr>
            <td style="padding: 0 40px 25px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="48%" valign="top" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; display: block; margin-bottom: 8px;">256-Bit Encrypted Protocol</span>
                    <strong style="font-size: 14px; color: #0f172a; display: block;">Instant Cleared Settlement</strong>
                    <span style="font-size: 12px; color: #475569; display: block; margin-top: 2px;">Funds are immediately available for withdrawal or transfer.</span>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" valign="top" style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 18px;">
                    <span style="font-size: 11px; font-weight: 700; color: #1e40af; text-transform: uppercase; display: block; margin-bottom: 4px;">Verified Institution Seal</span>
                    <strong style="font-size: 14px; color: #1e3a8a; display: block;">Or&Qd.Fi Financial Guarantee</strong>
                    <span style="font-size: 11px; color: #2563eb; display: block; margin-top: 4px;">Zero liability & fraud coverage active</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding: 10px 40px 35px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="58%">
                    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <tr>
                        <td align="center" style="border-radius: 12px; background-color: #1e3a8a; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25);">
                          <a href="https://example.com/banking" target="_blank" style="display: block; padding: 16px; font-size: 14px; font-weight: 800; color: #ffffff; text-decoration: none; text-align: center;">
                            🏦 Open Or&Qd.Fi Banking Vault
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="4%"></td>
                  <td width="38%">
                    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <tr>
                        <td align="center" style="border-radius: 12px; background-color: #f1f5f9; border: 1px solid #cbd5e1;">
                          <a href="https://example.com/receipt" target="_blank" style="display: block; padding: 16px; font-size: 13px; font-weight: 700; color: #334155; text-decoration: none; text-align: center;">
                            Download PDF Receipt
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Information -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px 40px; text-align: center; border-top: 1px solid #e2e8f0; border-radius: 0 0 20px 20px;">
              <p style="margin: 0 0 12px 0; color: #64748b; font-size: 12px; line-height: 1.6;">
                <strong>Or&Qd.Fi — Online Reliable & Quick Delivery LLC (Financial Institution)</strong><br />
                Licensed Federal Banking & Express Money Delivery Services • Member FDIC & SIPC<br />
                100 Financial Plaza, Suite 1200 • Client Support Helpline: 1-800-ORQD-FIN
              </p>
              <a href="https://example.com/privacy" style="color: #2563eb; text-decoration: none; font-size: 11px; font-weight: 700;">Banking Security Policy</a>
              <span style="color: #cbd5e1; padding: 0 8px;">•</span>
              <a href="https://example.com/support" style="color: #2563eb; text-decoration: none; font-size: 11px; font-weight: 700;">24/7 Fraud Support Center</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "orqd-banking-security",
    name: "Or&Qd.Fi - Banking Security & Fraud Alert",
    subject: "🚨 Security Alert: Unusual sign-in attempt on your Or&Qd.Fi Financial Account",
    category: "Banking Security",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Or&Qd.Fi Banking Security Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="580" border="0" cellspacing="0" cellpadding="0" style="background-color: #1e293b; border-radius: 20px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
          
          <!-- Banner -->
          <tr>
            <td style="background-color: #dc2626; padding: 14px; text-align: center; color: #ffffff; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
              🚨 Or&Qd.Fi FINANCIAL INSTITUTION • CRITICAL SECURITY ALERT
            </td>
          </tr>

          <!-- Branding Bar -->
          <tr>
            <td style="padding: 32px 40px 20px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">
                      Or&Qd.<span style="color: #38bdf8;">Fi</span>
                    </span>
                    <span style="font-size: 11px; font-weight: 700; color: #94a3b8; margin-left: 6px;">
                      Online Reliable & Quick Delivery LLC
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-family: monospace; color: #f87171; background-color: #450a0a; padding: 6px 10px; border-radius: 6px; border: 1px solid #7f1d1d;">
                      FRAUD-SEC-8042
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 10px 40px 20px 40px; text-align: left; color: #f1f5f9;">
              <h2 style="margin: 0 0 10px 0; font-size: 22px; font-weight: 800; color: #ffffff;">Review Unrecognized Device Sign-In</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #94a3b8;">
                Dear Valued Account Holder, our automated 24/7 fraud sentinel at <strong>Or&Qd.Fi Financial Institution</strong> has detected an unusual login attempt on your online banking profile from a new device location.
              </p>

              <!-- Device Log Table -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <tr>
                  <td width="35%" style="font-size: 12px; font-weight: 700; color: #64748b; padding-bottom: 8px; text-transform: uppercase;">Device Recognized</td>
                  <td style="font-size: 13px; font-weight: 600; color: #f1f5f9; padding-bottom: 8px;">Safari on Apple iPhone (iOS 17.5)</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; font-weight: 700; color: #64748b; padding-bottom: 8px; text-transform: uppercase;">IP Location</td>
                  <td style="font-size: 13px; font-weight: 600; color: #f1f5f9; padding-bottom: 8px;">Zürich, Switzerland (IP: 194.230.144.*)</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; font-weight: 700; color: #64748b; padding-bottom: 8px; text-transform: uppercase;">Timestamp</td>
                  <td style="font-size: 13px; font-weight: 600; color: #f1f5f9; padding-bottom: 8px;">July 28, 2026, 06:33 UTC</td>
                </tr>
                <tr>
                  <td style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Portal Status</td>
                  <td style="font-size: 13px; font-weight: 800; color: #ef4444;">Wire & Withdrawal Operations Locked</td>
                </tr>
              </table>

              <!-- Decision Buttons -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="48%">
                    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <tr>
                        <td align="center" style="border-radius: 10px; background-color: #dc2626;">
                          <a href="https://example.com/lock" target="_blank" style="display: block; padding: 14px; font-size: 13px; font-weight: 800; color: #ffffff; text-decoration: none; text-align: center;">
                            No, Lock My Account
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="4%"></td>
                  <td width="48%">
                    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                      <tr>
                        <td align="center" style="border-radius: 10px; background-color: #334155; border: 1px solid #475569;">
                          <a href="https://example.com/confirm" target="_blank" style="display: block; padding: 14px; font-size: 13px; font-weight: 700; color: #f1f5f9; text-decoration: none; text-align: center;">
                            Yes, That Was Me
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 40px; text-align: center; color: #64748b; font-size: 11px; border-top: 1px solid #334155;">
              &copy; 2026 Or&Qd.Fi (Online Reliable & Quick Delivery LLC Financial Institution). Member FDIC.<br />
              Never share your passcode or 2FA PIN with anyone over the phone.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "orqd-wealth-statement",
    name: "Or&Qd.Fi - Monthly Wealth Portfolio Statement",
    subject: "📊 Or&Qd.Fi Financial Institution: Your Monthly Wealth Brief & Interest Statement",
    category: "Account Statement",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Or&Qd.Fi Wealth Statement</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Statement Card -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.05); border: 1px solid #e2e8f0;">
          
          <!-- Top Header -->
          <tr>
            <td style="background: linear-gradient(90deg, #0f172a 0%, #1e293b 100%); padding: 30px 40px; text-align: left;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Or&Qd.<span style="color: #38bdf8;">Fi</span>
                    </span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">
                      Online Reliable & Quick Delivery LLC Financial Institution
                    </p>
                  </td>
                  <td align="right" valign="top">
                    <span style="font-size: 12px; font-weight: 700; color: #38bdf8; background-color: #1e293b; padding: 6px 12px; border-radius: 6px; border: 1px solid #334155;">
                      JULY 2026 STATEMENT
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Intro -->
          <tr>
            <td style="padding: 35px 40px 20px 40px; text-align: left;">
              <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #0f172a;">Portfolio Yield & Balance Overview</h1>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569;">
                Hello Account Holder, your monthly financial performance report from <strong>Or&Qd.Fi Financial Institution</strong> is ready for review. Here is a breakdown of your liquid cash, interest earnings, and express wire transfers.
              </p>
            </td>
          </tr>

          <!-- Financial Bento Grid -->
          <tr>
            <td style="padding: 10px 40px 25px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Card 1: Assets -->
                  <td width="48%" valign="top" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748b; display: block; text-transform: uppercase;">Liquid Balance</span>
                    <strong style="font-size: 22px; color: #0f172a; display: block; margin: 8px 0 2px 0;">$142,804.52</strong>
                    <span style="font-size: 12px; color: #10b981; font-weight: 600;">↑ 4.85% APY High-Yield</span>
                  </td>
                  <td width="4%"></td>
                  <!-- Card 2: Investments -->
                  <td width="48%" valign="top" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
                    <span style="font-size: 11px; font-weight: 700; color: #64748b; display: block; text-transform: uppercase;">Monthly Interest Earned</span>
                    <strong style="font-size: 22px; color: #10b981; display: block; margin: 8px 0 2px 0;">+$578.40 USD</strong>
                    <span style="font-size: 12px; color: #3b82f6; font-weight: 600;">Compounded Daily</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Performance Breakdown Table -->
          <tr>
            <td style="padding: 10px 40px 30px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <tr style="background-color: #f8fafc;">
                  <th align="left" style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Or&Qd.Fi Account</th>
                  <th align="right" style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Balance</th>
                  <th align="right" style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Yield</th>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9; font-weight: 600;">Or&Qd.Fi Express Checking (*7702)</td>
                  <td align="right" style="padding: 14px 16px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">$42,109.80</td>
                  <td align="right" style="padding: 14px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #f1f5f9;">—</td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; font-size: 13px; color: #334155; font-weight: 600;">Or&Qd.Fi High-Yield Vault (*0912)</td>
                  <td align="right" style="padding: 14px 16px; font-size: 13px; font-weight: 700; color: #0f172a;">$100,694.72</td>
                  <td align="right" style="padding: 14px 16px; font-size: 13px; color: #10b981; font-weight: 600;">+ 4.85% APY</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call To Action -->
          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #0f172a;">
                    <a href="https://example.com/statement" target="_blank" style="display: block; padding: 14px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; text-align: center;">View Full Financial Statement PDF</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 11px; line-height: 1.6;">
                &copy; 2026 Or&Qd.Fi — Online Reliable & Quick Delivery LLC Financial Institution. Member FDIC.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
  {
    id: "orqd-platinum-card",
    name: "Or&Qd.Fi - Platinum Rewards Metal Credit Card",
    subject: "💳 Or&Qd.Fi Financial: You are pre-approved for a $25,000 Premier Credit Line",
    category: "Card & Credit",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Or&Qd.Fi Platinum Credit Card Offer</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #020617; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Wrapper -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; border-radius: 20px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);">
          
          <!-- Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 36px 40px; text-align: center; color: #ffffff;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; background-color: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; display: inline-block; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.2);">PREMIER FINANCIAL SERVICES</span>
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px;">Or&Qd.Fi Platinum Rewards Visa</h1>
              <p style="margin: 0; font-size: 15px; color: #cbd5e1;">Online Reliable & Quick Delivery LLC Financial Institution</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td align="center">
              <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&h=260&q=80" alt="Or&Qd.Fi Platinum Card" width="600" style="width: 100%; max-width: 600px; height: auto; display: block;" />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 36px 40px; text-align: left; color: #f8fafc;">
              <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 800; color: #ffffff;">Exclusive $25,000 Credit Line Reserved</h2>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #94a3b8;">
                Congratulations! As a valued account holder at <strong>Or&Qd.Fi Financial Institution</strong>, you have been selected for the sleek contactless metal Or&Qd.Fi Platinum Card with zero annual fee and 0% intro APR.
              </p>

              <!-- Card Perks Grid -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td width="48%" style="background-color: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 16px;">
                    <span style="font-size: 20px; display: block; margin-bottom: 6px;">🎁</span>
                    <strong style="font-size: 14px; color: #ffffff; display: block;">3% Cash Back</strong>
                    <span style="font-size: 12px; color: #94a3b8; display: block; margin-top: 4px;">On all express wire transfers & dining</span>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="background-color: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 16px;">
                    <span style="font-size: 20px; display: block; margin-bottom: 6px;">⚡</span>
                    <strong style="font-size: 14px; color: #ffffff; display: block;">0% Intro APR</strong>
                    <span style="font-size: 12px; color: #94a3b8; display: block; margin-top: 4px;">For the first 18 billing cycles</span>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="background-color: #2563eb; border-radius: 12px;">
                    <a href="https://example.com/card" target="_blank" style="display: block; padding: 16px; font-size: 15px; font-weight: 800; color: #ffffff; text-decoration: none; text-align: center;">
                      Claim My $25,000 Platinum Card
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #020617; padding: 24px 40px; text-align: center; color: #64748b; font-size: 11px; border-top: 1px solid #1e293b;">
              &copy; 2026 Or&Qd.Fi (Online Reliable & Quick Delivery LLC Financial Institution). Equal Opportunity Lender.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  },
];

