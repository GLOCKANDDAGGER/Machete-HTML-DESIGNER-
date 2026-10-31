import React, { useState, useEffect } from "react";
import { Eye, Code, Monitor, Tablet, Smartphone, Maximize2, Copy, Check, ExternalLink, Download, Image as ImageIcon } from "lucide-react";

interface EmailPreviewProps {
  html: string;
  subject: string;
  onOpenInsertImage?: () => void;
}

export default function EmailPreview({ html, subject, onOpenInsertImage }: EmailPreviewProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile" | "fullscreen">("desktop");
  const [copied, setCopied] = useState(false);

  // Auto-adapt preview mode on small screens on initial mount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewportMode("mobile");
      } else if (window.innerWidth < 1024) {
        setViewportMode("tablet");
      }
    };
    
    // Run initially
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!html) return;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject ? subject.replace(/[^a-z0-9]/gi, '_').toLowerCase() : "email_flyer"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="email-preview-container" className="flex flex-col h-full bg-slate-200/50 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden shadow-xs">
      {/* Top Menu bar with Tab Toggles and Viewport Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-1.5 p-0.5 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab("visual")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "visual"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "code"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            HTML Source
          </button>
        </div>

        {/* Viewport controls - only show on Live Preview tab */}
        {activeTab === "visual" && (
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
            <button
              onClick={() => setViewportMode("desktop")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewportMode === "desktop"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Desktop View (760px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline ml-1">Desktop</span>
            </button>
            <button
              onClick={() => setViewportMode("tablet")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewportMode === "tablet"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Tablet View (520px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline ml-1">Tablet</span>
            </button>
            <button
              onClick={() => setViewportMode("mobile")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewportMode === "mobile"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Mobile View (360px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline ml-1">Mobile</span>
            </button>
            <button
              onClick={() => setViewportMode("fullscreen")}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                viewportMode === "fullscreen"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Full Screen View (100% Width)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline ml-1">Full Screen</span>
            </button>
          </div>
        )}

        {/* Actions layout bar */}
        <div className="flex items-center gap-2">
          {onOpenInsertImage && (
            <button
              onClick={onOpenInsertImage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition-colors border border-indigo-200/80 cursor-pointer shadow-2xs"
              title="Insert image into this email layout"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Insert Image
            </button>
          )}

          {html && (
            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-200"
              title="Download HTML template file"
            >
              <Download className="w-3.5 h-3.5" />
              Download HTML
            </button>
          )}

          {activeTab === "code" && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  Copied Code!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy HTML Code
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Subject Line Bar */}
      {html && (
        <div className="bg-white px-5 py-2.5 border-b border-slate-200/60 flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Subject Header:</span>
          <p className="text-xs font-semibold text-slate-700 truncate">{subject || "(No Subject Line)"}</p>
        </div>
      )}

      {/* Main Preview Pane */}
      <div className="flex-1 overflow-auto p-4 md:p-6 flex justify-center items-center">
        {activeTab === "visual" ? (
          <div className="transition-all duration-300 flex items-center justify-center h-full w-full">
            {html ? (
              <div
                className={`transition-all duration-300 h-full w-full flex items-center justify-center ${
                  viewportMode === "mobile"
                    ? "max-w-[360px] border-[12px] border-slate-900 rounded-[32px] bg-white shadow-2xl aspect-[9/16] max-h-[580px] relative overflow-hidden"
                    : viewportMode === "tablet"
                    ? "max-w-[520px] border-[8px] border-slate-800 rounded-[20px] bg-white shadow-xl h-full max-h-[640px] relative overflow-hidden"
                    : viewportMode === "fullscreen"
                    ? "max-w-full border border-slate-200 rounded-lg bg-white shadow-lg h-full overflow-hidden"
                    : "max-w-[760px] border border-slate-200 rounded-lg bg-white shadow-lg h-full overflow-hidden"
                }`}
              >
                {/* Visual rendering iframe */}
                <iframe
                  id="email-preview-frame"
                  title="HTML Email Viewport"
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-popups allow-same-origin"
                  srcDoc={html || "<div style='font-family:sans-serif;color:#64748b;padding:40px;text-align:center;'>No template content loaded. Select a template or write a prompt on the left to start.</div>"}
                />
              </div>
            ) : (
              <div className="text-center p-8 max-w-sm">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">No layout is currently active</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Choose a template design from the library or use the AI generator to create a custom HTML template.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* HTML code editor view */
          <div className="w-full h-full max-w-4xl bg-slate-900 border border-slate-950 rounded-xl overflow-hidden shadow-inner flex flex-col">
            <div className="px-4 py-2 bg-slate-950 text-[10px] font-mono text-slate-400 flex justify-between items-center shrink-0">
              <span>email_flyer_output.html</span>
              <span>READONLY HTML PREVIEW</span>
            </div>
            <textarea
              readOnly
              value={html || "<!-- Select a template or generate with AI to view HTML code here -->"}
              className="flex-1 w-full font-mono text-xs text-emerald-400/90 bg-slate-900/90 p-5 outline-hidden border-0 resize-none overflow-y-auto leading-relaxed select-all"
            />
          </div>
        )}
      </div>
    </div>
  );
}
