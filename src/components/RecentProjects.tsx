import React, { useState } from "react";
import { RecentProject } from "../types";
import { Clock, Search, FolderOpen, Trash2, Copy, BookmarkPlus, ExternalLink, Calendar, Layers, Sparkles, AlertCircle } from "lucide-react";

interface RecentProjectsProps {
  recentProjects: RecentProject[];
  activeProjectHtml?: string;
  onSelectProject: (project: RecentProject) => void;
  onDeleteProject: (id: string) => void;
  onClearAll: () => void;
  onSaveAsTemplate: (project: RecentProject) => void;
  onDuplicateProject: (project: RecentProject) => void;
}

export default function RecentProjects({
  recentProjects,
  activeProjectHtml,
  onSelectProject,
  onDeleteProject,
  onClearAll,
  onSaveAsTemplate,
  onDuplicateProject,
}: RecentProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(recentProjects.map((p) => p.category || "General")))];

  const filteredProjects = recentProjects.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.prompt && p.prompt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "All" || (p.category || "General") === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffSec < 60) return "Just now";
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Header bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">Recent Projects</h3>
            <p className="text-[10px] text-slate-400 font-semibold">
              {recentProjects.length} design {recentProjects.length === 1 ? "history item" : "history items"}
            </p>
          </div>
        </div>

        {recentProjects.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear your recent project history?")) {
                onClearAll();
              }
            }}
            className="text-[10px] font-bold text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-red-50 cursor-pointer"
            title="Clear all recent history"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Search and Filters */}
      {recentProjects.length > 0 && (
        <div className="p-3 border-b border-slate-100 space-y-2.5 bg-white">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search history by name, subject, prompt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {categories.length > 2 && (
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects List Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-10 px-4 space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700">No recent projects found</h4>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                {recentProjects.length === 0
                  ? "As you generate, edit, or customize email flyers, your recent history will appear here for fast switching."
                  : "No projects match your current search query."}
              </p>
            </div>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const isActive = activeProjectHtml && activeProjectHtml === project.html;

            return (
              <div
                key={project.id}
                className={`group relative rounded-xl border p-3 transition-all ${
                  isActive
                    ? "bg-indigo-50/60 border-indigo-400 shadow-xs ring-1 ring-indigo-400/30"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                        {project.category || "Flyer"}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {formatRelativeTime(project.updatedAt)}
                      </span>
                      {isActive && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 mt-1.5 truncate group-hover:text-indigo-600 transition-colors">
                      {project.name}
                    </h4>

                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {project.subject || "(No Subject Line)"}
                    </p>

                    {project.prompt && (
                      <p className="text-[10px] text-slate-400 italic truncate mt-1 line-clamp-1">
                        "{project.prompt}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 flex items-center justify-center gap-1 py-1 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <FolderOpen className="w-3 h-3" />
                    Open Project
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDuplicateProject(project)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Duplicate project"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSaveAsTemplate(project)}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Save to Template Library"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Delete from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
