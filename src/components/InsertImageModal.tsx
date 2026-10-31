import React, { useState } from "react";
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Sparkles, Check, Search, ShieldCheck, CreditCard, Landmark, ShoppingBag, Zap, Laptop, Layers } from "lucide-react";
import { InsertImageOptions } from "../types";

interface InsertImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertDirect: (options: InsertImageOptions) => void;
  onInsertViaAi: (options: InsertImageOptions) => void;
  isRefining?: boolean;
}

// Curated stock photos for email designs
const STOCK_IMAGES = [
  {
    category: "Banking & Finance",
    items: [
      {
        title: "Gold Platinum Credit Card",
        url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
        alt: "Gold Platinum Credit Card Graphic",
      },
      {
        title: "Modern Online Banking App",
        url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        alt: "Digital Banking Application Screen",
      },
      {
        title: "Secure Vault Shield",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        alt: "Abstract Security Vault Graphic",
      },
      {
        title: "Financial Growth Chart",
        url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
        alt: "Financial Market Growth Chart",
      },
    ],
  },
  {
    category: "Promotional & Sales",
    items: [
      {
        title: "Shopping Sale Banner",
        url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
        alt: "Special Discount Promotional Gift",
      },
      {
        title: "Gift Boxes & Bows",
        url: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
        alt: "Exclusive Member Reward Gifts",
      },
      {
        title: "Black Friday Cyber Special",
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        alt: "Special Promotion Event",
      },
    ],
  },
  {
    category: "Tech & Corporate",
    items: [
      {
        title: "Executive Desk Workspace",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
        alt: "Modern Corporate Office Desk",
      },
      {
        title: "Laptop & Smart Tablet",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        alt: "Digital Business Analytics",
      },
      {
        title: "Customer Support Executive",
        url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        alt: "Professional Customer Advisor",
      },
    ],
  },
  {
    category: "Logos & Badges",
    items: [
      {
        title: "256-Bit SSL Security Badge",
        url: "https://img.icons8.com/color/120/000000/shield.png",
        alt: "256-Bit SSL Encrypted Badge",
      },
      {
        title: "Verified Trust Seal",
        url: "https://img.icons8.com/color/120/000000/checked-checkbox.png",
        alt: "Verified Official Seal",
      },
      {
        title: "24/7 Global Support Icon",
        url: "https://img.icons8.com/color/120/000000/headset.png",
        alt: "24/7 Customer Care Icon",
      },
    ],
  },
];

export default function InsertImageModal({
  isOpen,
  onClose,
  onInsertDirect,
  onInsertViaAi,
  isRefining = false,
}: InsertImageModalProps) {
  const [sourceTab, setSourceTab] = useState<"upload" | "url" | "stock">("stock");
  
  // Image URL state
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageAlt, setImageAlt] = useState<string>("Email Banner Visual");
  const [linkUrl, setLinkUrl] = useState<string>("");
  
  // Placement settings
  const [position, setPosition] = useState<'hero' | 'content' | 'logo' | 'footer' | 'custom'>('hero');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('center');
  const [maxWidth, setMaxWidth] = useState<string>("100%");
  const [borderRadius, setBorderRadius] = useState<string>("8px");
  
  // Stock gallery filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please upload a smaller image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
          if (!imageAlt || imageAlt === "Email Banner Visual") {
            setImageAlt(file.name.replace(/\.[^/.]+$/, ""));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectStock = (stock: { title: string; url: string; alt: string }) => {
    setImageUrl(stock.url);
    setImageAlt(stock.title);
  };

  const handleSubmitDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Please upload an image, select a stock photo, or provide an image URL.");
      return;
    }
    onInsertDirect({
      url: imageUrl,
      alt: imageAlt || "Email Image",
      linkUrl: linkUrl || undefined,
      position,
      alignment,
      maxWidth,
      borderRadius,
    });
    onClose();
  };

  const handleSubmitAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert("Please upload an image, select a stock photo, or provide an image URL.");
      return;
    }
    onInsertViaAi({
      url: imageUrl,
      alt: imageAlt || "Email Image",
      linkUrl: linkUrl || undefined,
      position,
      alignment,
      maxWidth,
      borderRadius,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Insert Image Into Email</h3>
              <p className="text-[11px] text-slate-500">Upload or choose stock graphics for your flyer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Source Switcher Tabs */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 flex gap-2 bg-white">
          <button
            type="button"
            onClick={() => setSourceTab("stock")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              sourceTab === "stock"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs"
                : "text-slate-600 hover:bg-slate-100 border border-transparent"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Stock Photo Library
          </button>
          <button
            type="button"
            onClick={() => setSourceTab("upload")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              sourceTab === "upload"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs"
                : "text-slate-600 hover:bg-slate-100 border border-transparent"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Local Image
          </button>
          <button
            type="button"
            onClick={() => setSourceTab("url")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              sourceTab === "url"
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs"
                : "text-slate-600 hover:bg-slate-100 border border-transparent"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Paste Web Image URL
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: Stock Photo Library */}
          {sourceTab === "stock" && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter stock graphics (e.g. Card, Security, Gift, Office)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {STOCK_IMAGES.map((group) => {
                  const filteredItems = group.items.filter(
                    (item) =>
                      !searchQuery ||
                      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      group.category.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={group.category} className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {group.category}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {filteredItems.map((item) => (
                          <div
                            key={item.title}
                            onClick={() => handleSelectStock(item)}
                            className={`group relative rounded-xl border p-1.5 flex flex-col items-center cursor-pointer transition-all ${
                              imageUrl === item.url
                                ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-xs"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className="w-full h-16 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center relative">
                              <img
                                src={item.url}
                                alt={item.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                              {imageUrl === item.url && (
                                <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                                    <Check className="w-3 h-3" />
                                  </div>
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-700 mt-1.5 text-center truncate w-full">
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Upload Local File */}
          {sourceTab === "upload" && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Select Image File from Device</label>
              <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-6 text-center bg-slate-50/50 transition-colors cursor-pointer relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">Click or drag & drop image here</p>
                <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, WebP, GIF up to 5MB</p>
              </div>
            </div>
          )}

          {/* TAB 3: Paste Image Web URL */}
          {sourceTab === "url" && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Direct Image URL</label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-1559526324-4b87b5e36e44..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Active Image Selected Preview Card */}
          {imageUrl && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-white flex items-center justify-center">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Selected Image</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{imageUrl.slice(0, 60)}...</p>
              </div>
            </div>
          )}

          {/* Image Settings Configuration Form */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Image Layout & Style Settings</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Alt Text (Accessibility)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g., Platinum Credit Card Graphic"
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Clickable Link URL (Optional)</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com/apply-now"
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Placement Position</label>
                <select
                  value={position}
                  onChange={(e) => {
                    const pos = e.target.value as any;
                    setPosition(pos);
                    if (pos === "hero") setMaxWidth("100%");
                    else if (pos === "logo") setMaxWidth("120px");
                    else if (pos === "content") setMaxWidth("400px");
                  }}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="hero">Hero Banner (Top)</option>
                  <option value="content">Body Content Area</option>
                  <option value="logo">Brand Logo Header</option>
                  <option value="footer">Footer Badge</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Alignment</label>
                <select
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Max Width</label>
                <select
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="100%">100% (Full Width)</option>
                  <option value="480px">480px (Large)</option>
                  <option value="320px">320px (Medium)</option>
                  <option value="160px">160px (Small)</option>
                  <option value="100px">100px (Logo Size)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Corners</label>
                <select
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="0px">Sharp (0px)</option>
                  <option value="8px">Rounded (8px)</option>
                  <option value="16px">Smooth (16px)</option>
                  <option value="9999px">Circle (Pill)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-lg transition-all cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSubmitAi}
              disabled={!imageUrl || isRefining}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Place via AI Assistant
            </button>

            <button
              type="button"
              onClick={handleSubmitDirect}
              disabled={!imageUrl}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              Insert Directly into Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
