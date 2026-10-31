import React, { useState } from "react";
import { PRESETS, TemplatePreset } from "../data/presets";
import { EmailTemplate } from "../types";
import { FileText, Sparkles, Plus, Trash2, CheckCircle2, History } from "lucide-react";

interface TemplateGalleryProps {
  customTemplates: EmailTemplate[];
  onSelectTemplate: (template: { name: string; subject: string; html: string; category: string; prompt: string }) => void;
  onDeleteCustomTemplate: (id: string) => void;
  activeTemplateName: string;
}

export default function TemplateGallery({
  customTemplates,
  onSelectTemplate,
  onDeleteCustomTemplate,
  activeTemplateName,
}: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Transfer Delivery",
    "Banking Security",
    "Account Statement",
    "Card & Credit",
    "Promotion",
    "Welcome",
    "Custom",
  ];

  const filteredPresets = PRESETS.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  const filteredCustoms = customTemplates.filter(
    (t) => selectedCategory === "All" || selectedCategory === "Custom"
  );

  const handleSelectPreset = (p: TemplatePreset) => {
    onSelectTemplate({
      name: p.name,
      subject: p.subject,
      html: p.html,
      category: p.category,
      prompt: "Baseline Preset",
    });
  };

  const handleSelectCustom = (t: EmailTemplate) => {
    onSelectTemplate({
      name: t.name,
      subject: t.subject,
      html: t.html,
      category: t.category,
      prompt: t.prompt,
    });
  };

  return (
    <div id="template-gallery-container" className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          Template Library
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Select an AI preset design to customize or load your saved drafts.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Presets Section */}
        {selectedCategory !== "Custom" && filteredPresets.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              AI Baseline Presets
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {filteredPresets.map((p) => {
                const isActive = activeTemplateName === p.name;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {p.name}
                          </h4>
                          {isActive && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          Subject: {p.subject}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Saved Drafts Section */}
        {filteredCustoms.length > 0 ? (
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-indigo-600" />
              Your Custom AI Designs
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {filteredCustoms.map((t) => {
                const isActive = activeTemplateName === t.name;
                return (
                  <div
                    key={t.id}
                    className={`group relative p-4 rounded-xl border transition-all ${
                      isActive
                        ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    <div
                      onClick={() => handleSelectCustom(t)}
                      className="cursor-pointer pr-8"
                    >
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {t.name}
                        </h4>
                        {isActive && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        Subject: {t.subject}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2">
                        Created: {new Date(t.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCustomTemplate(t.id);
                      }}
                      className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-colors"
                      title="Delete Template"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          selectedCategory === "Custom" && (
            <div className="text-center py-8">
              <History className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-600">No custom designs saved yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                Generate a template with the AI Assistant and save it to build your list.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
