import React, { useState } from "react";
import { Sparkles, MessageSquare, RotateCcw, Save, CheckCircle, Lightbulb, RefreshCw, Languages, Image as ImageIcon } from "lucide-react";

interface AiAssistantProps {
  currentHtml: string;
  activeTemplateName: string;
  activeSubject: string;
  activeCategory: string;
  activePrompt: string;
  onGenerate: (prompt: string, category: string) => Promise<void>;
  onRefine: (instruction: string) => Promise<void>;
  onSaveTemplate: (name: string, subject: string, html: string, category: string, prompt: string) => void;
  onTranslate: (language: string) => Promise<void>;
  onOpenInsertImage?: () => void;
  isGenerating: boolean;
  isRefining: boolean;
  isTranslating: boolean;
  hasEnvKey: boolean;
}

export default function AiAssistant({
  currentHtml,
  activeTemplateName,
  activeSubject,
  activeCategory,
  activePrompt,
  onGenerate,
  onRefine,
  onSaveTemplate,
  onTranslate,
  onOpenInsertImage,
  isGenerating,
  isRefining,
  isTranslating,
  hasEnvKey,
}: AiAssistantProps) {
  const [newPrompt, setNewPrompt] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("Transfer Delivery");
  const [refineInstruction, setRefineInstruction] = useState<string>("");
  const [saveName, setSaveName] = useState<string>("");
  const [saveSubject, setSaveSubject] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [targetLanguage, setTargetLanguage] = useState<string>("Spanish");

  const handleTranslateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetLanguage || !currentHtml) return;
    onTranslate(targetLanguage);
  };

  const predefinedTips = [
    "Include a live wire transfer delivery timeline (Initiated -> Clearing -> Delivered to Recipient)",
    "Add a 6-digit One-Time Security Transfer Authorization Code box",
    "Add relationship manager badge for Marcus Vance, Senior Financial Officer (#408)",
    "Include 1-click 'Confirm Transfer Receipt' & 'Download Banking Statement' buttons",
    "Add a secure financial audit breakdown & transaction ID #ORD-WIRE-99201",
    "Highlight Or&Qd.Fi Premier Banking VIP Membership (Zero Wire Fees & Instant Express Delivery)",
    "Add an account security alert box for new device wire authorization",
    "Include itemized financial ledger breakdown with SWIFT/BIC clearing confirmation",
  ];

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;
    onGenerate(newPrompt, newCategory);
    setNewPrompt("");
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineInstruction.trim() || !currentHtml) return;
    onRefine(refineInstruction);
    setRefineInstruction("");
  };

  const handleSaveClick = () => {
    if (!currentHtml) return;
    setSaveName(activeTemplateName === "Baseline Preset" ? "My Custom Flyer" : activeTemplateName);
    setSaveSubject(activeSubject);
    setIsSaving(true);
    setSaveSuccess(false);
  };

  const handleConfirmSave = () => {
    if (!saveName.trim()) return;
    onSaveTemplate(
      saveName,
      saveSubject || "No Subject",
      currentHtml,
      activeCategory || "Custom",
      activePrompt || "AI designed"
    );
    setSaveSuccess(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(false);
    }, 1500);
  };

  return (
    <div id="ai-assistant-panel" className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="p-5 border-b border-slate-100 bg-indigo-600 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
          <h2 className="text-lg font-bold tracking-tight">AI Email Designer</h2>
        </div>
        <p className="text-xs text-indigo-100 mt-1">
          Generate complete HTML designs and refine them using natural language.
        </p>

        {!hasEnvKey && (
          <div className="mt-3 p-2 bg-black/20 border border-white/20 rounded-lg text-[11px] leading-relaxed text-indigo-200">
            ⚠️ <strong>Missing GEMINI_API_KEY:</strong> Please configure your Gemini API Key in the Secrets panel to enable template generation.
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Save Template Action if HTML is loaded */}
        {currentHtml && !isSaving && (
          <div className="flex items-center justify-between p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl">
            <div className="text-xs text-slate-700">
              <span className="font-semibold text-indigo-700">Active Design:</span> {activeTemplateName}
            </div>
            <button
              onClick={handleSaveClick}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Save to Library
            </button>
          </div>
        )}

        {/* Save Dialog Popup Box inline */}
        {isSaving && (
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-3 animate-fadeIn">
            <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              Save Template Draft
            </h3>
            {saveSuccess ? (
              <div className="flex items-center gap-2 text-emerald-600 py-3 font-semibold text-xs">
                <CheckCircle className="w-4 h-4 animate-bounce" />
                Template saved to your local library!
              </div>
            ) : (
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Template Name</label>
                  <input
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="Enter unique layout name..."
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Default Subject Header</label>
                  <input
                    type="text"
                    value={saveSubject}
                    onChange={(e) => setSaveSubject(e.target.value)}
                    placeholder="Subject line recipient sees..."
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-1 focus:ring-indigo-500 outline-hidden bg-white"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    onClick={() => setIsSaving(false)}
                    className="px-3 py-1.5 text-[11px] text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSave}
                    disabled={!saveName.trim()}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-[11px] font-bold rounded-lg transition-colors"
                  >
                    Confirm Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section 1: Generate Brand New Template */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            1. Generate From Scratch
          </h3>

          <form onSubmit={handleGenerateSubmit} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Theme/Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Transfer Delivery">Or&Qd.Fi - Express Wire Delivery Confirmation</option>
                <option value="Banking Security">Or&Qd.Fi - Security Verification & Fraud Alert</option>
                <option value="Account Statement">Or&Qd.Fi - Monthly Financial Account Statement</option>
                <option value="Card & Credit">Or&Qd.Fi - Platinum Credit Card Delivery & Activation</option>
                <option value="Promotion">Or&Qd.Fi - High-Yield Savings & Investment Offer</option>
                <option value="Welcome">Or&Qd.Fi - Corporate Financial Account Welcome</option>
                <option value="Product Launch">Or&Qd.Fi - Instant Cross-Border Wire Gateway</option>
                <option value="Newsletter">Or&Qd.Fi - Global Financial Market Digest</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">What should this template say & look like?</label>
              <textarea
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="Describe your design (e.g., 'Wire transfer delivery confirmation for Or&Qd.Fi Online Reliable & Quick Delivery LLC with transaction reference ORD-9821, transfer status timeline, 2FA authorization code, and View Receipt button')"
                rows={3}
                required
                disabled={isGenerating || !hasEnvKey}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors placeholder:text-slate-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !newPrompt.trim() || !hasEnvKey}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-all shadow-lg shadow-indigo-100"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating Responsive HTML Flyer...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
                  Generate Elegant HTML Flyer
                </>
              )}
            </button>
          </form>
        </div>

        {/* Divider line */}
        {currentHtml && <hr className="border-slate-100" />}

        {/* Section 2: Chat to Refine / Edit HTML */}
        {currentHtml && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                2. Live Conversational Refiner
              </h3>

              {onOpenInsertImage && (
                <button
                  type="button"
                  onClick={onOpenInsertImage}
                  className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
                  title="Insert or upload image into template"
                >
                  <ImageIcon className="w-3 h-3 text-indigo-600" />
                  + Insert Image
                </button>
              )}
            </div>

            <form onSubmit={handleRefineSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">What edits should the AI make?</label>
                <input
                  type="text"
                  value={refineInstruction}
                  onChange={(e) => setRefineInstruction(e.target.value)}
                  placeholder="e.g., 'Change primary button color to deep indigo' or 'Add social links'"
                  required
                  disabled={isRefining}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isRefining || !refineInstruction.trim()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs rounded-lg transition-all shadow-xs"
              >
                {isRefining ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Updating HTML Layout...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    Apply Design Refinement
                  </>
                )}
              </button>
            </form>

            {/* Quick Tips */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-500" />
                Suggested Instant Edits
              </span>
              <div className="flex flex-wrap gap-1.5">
                {predefinedTips.map((tip) => (
                  <button
                    key={tip}
                    onClick={() => {
                      if (!isRefining) {
                        onRefine(tip);
                      }
                    }}
                    disabled={isRefining}
                    className="text-[10px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 px-2 py-1 rounded-md text-slate-600 text-left transition-all"
                  >
                    + {tip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Divider line */}
        {currentHtml && <hr className="border-slate-100" />}

        {/* Section 3: AI Translation Tool */}
        {currentHtml && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              3. AI Multi-Lingual Localizer
            </h3>

            <form onSubmit={handleTranslateSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Target Language</label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  disabled={isTranslating}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="English">English (English)</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="French">French (Français)</option>
                  <option value="German">German (Deutsch)</option>
                  <option value="Italian">Italian (Italiano)</option>
                  <option value="Japanese">Japanese (日本語)</option>
                  <option value="Chinese">Chinese (中文)</option>
                  <option value="Portuguese">Portuguese (Português)</option>
                  <option value="Arabic">Arabic (العربية)</option>
                  <option value="Hindi">Hindi (हिन्दी)</option>
                  <option value="Dutch">Dutch (Nederlands)</option>
                  <option value="Korean">Korean (한국어)</option>
                  <option value="Swedish">Swedish (Svenska)</option>
                  <option value="Russian">Russian (Русский)</option>
                  <option value="Turkish">Turkish (Türkçe)</option>
                  <option value="Polish">Polish (Polski)</option>
                  <option value="Vietnamese">Vietnamese (Tiếng Việt)</option>
                  <option value="Thai">Thai (ไทย)</option>
                  <option value="Indonesian">Indonesian (Bahasa Indonesia)</option>
                  <option value="Czech">Czech (Čeština)</option>
                  <option value="Danish">Danish (Dansk)</option>
                  <option value="Finnish">Finnish (Suomi)</option>
                  <option value="Norwegian">Norwegian (Norsk)</option>
                  <option value="Ukrainian">Ukrainian (Українська)</option>
                  <option value="Romanian">Romanian (Română)</option>
                  <option value="Greek">Greek (Ελληνικά)</option>
                  <option value="Hebrew">Hebrew (עברית)</option>
                  <option value="Tagalog">Tagalog (Filipino)</option>
                  <option value="Croatian">Croatian (Hrvatski)</option>
                  <option value="Hungarian">Hungarian (Magyar)</option>
                  <option value="Slovak">Slovak (Slovenčina)</option>
                  <option value="Slovenian">Slovenian (Slovenščina)</option>
                  <option value="Bulgarian">Bulgarian (Български)</option>
                  <option value="Serbian">Serbian (Српски)</option>
                  <option value="Lithuanian">Lithuanian (Lietuvių)</option>
                  <option value="Latvian">Latvian (Latviešu)</option>
                  <option value="Estonian">Estonian (Eesti)</option>
                  <option value="Catalan">Catalan (Català)</option>
                  <option value="Irish">Irish (Gaeilge)</option>
                  <option value="Malay">Malay (Bahasa Melayu)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isTranslating || !currentHtml}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 disabled:opacity-50 font-semibold text-xs rounded-lg transition-all border border-indigo-200"
              >
                {isTranslating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Localizing Email Layout & Subject...
                  </>
                ) : (
                  <>
                    <Languages className="w-4 h-4" />
                    Translate Layout to {targetLanguage}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
