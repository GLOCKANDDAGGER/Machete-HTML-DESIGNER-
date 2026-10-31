import React, { useState } from "react";
import { SenderConfig } from "../types";
import { Mail, Settings, Key, Server, Send, AlertCircle, CheckCircle, ExternalLink, RefreshCw } from "lucide-react";

interface SenderFormProps {
  html: string;
  defaultSubject: string;
  onSendEmail: (payload: { to: string; subject: string; html: string; config: SenderConfig }) => Promise<{
    success: boolean;
    message: string;
    previewUrl?: string;
    info?: any;
  } | null>;
  isSending: boolean;
  envConfig: {
    hasResendKey: boolean;
    hasDefaultSmtp: boolean;
  };
}

export default function SenderForm({
  html,
  defaultSubject,
  onSendEmail,
  isSending,
  envConfig,
}: SenderFormProps) {
  const [recipient, setRecipient] = useState<string>("peep12059@gmail.com");
  const [subject, setSubject] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Sender configs
  const [provider, setProvider] = useState<'test' | 'resend' | 'smtp'>('resend');
  const [fromName, setFromName] = useState<string>("AI Email Designer");
  const [fromEmail, setFromEmail] = useState<string>("onboarding@resend.dev");
  const [resendApiKey, setResendApiKey] = useState<string>("");
  const [smtpHost, setSmtpHost] = useState<string>("");
  const [smtpPort, setSmtpPort] = useState<number>(587);
  const [smtpUser, setSmtpUser] = useState<string>("");
  const [smtpPass, setSmtpPass] = useState<string>("");
  const [smtpSecure, setSmtpSecure] = useState<boolean>(false);

  // Status indicators
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
    previewUrl?: string;
  }>({ type: "idle", message: "" });

  // Sync subject with default when selected template changes
  React.useEffect(() => {
    setSubject(defaultSubject);
  }, [defaultSubject]);

  // Set default provider to resend and default from email to onboarding@resend.dev when Resend is configured
  React.useEffect(() => {
    if (envConfig.hasResendKey) {
      setProvider('resend');
      setFromEmail("onboarding@resend.dev");
    }
  }, [envConfig.hasResendKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim() || !html) return;

    setStatus({ type: "idle", message: "" });

    const configPayload: SenderConfig = {
      provider,
      fromName,
      fromEmail,
      resendApiKey,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      smtpSecure,
    };

    const finalSubject = subject || defaultSubject || "Modern Email Flyer";

    const response = await onSendEmail({
      to: recipient,
      subject: finalSubject,
      html,
      config: configPayload,
    });

    if (response) {
      if (response.success) {
        setStatus({
          type: "success",
          message: response.message,
          previewUrl: response.previewUrl,
        });
      } else {
        setStatus({
          type: "error",
          message: response.message || "Failed to transmit email template.",
        });
      }
    } else {
      setStatus({
        type: "error",
        message: "Network request failed. Ensure server-side services are active.",
      });
    }
  };

  const handleProviderChange = (prov: 'test' | 'resend' | 'smtp') => {
    setProvider(prov);
    if (prov === 'test') {
      setFromEmail("");
    } else if (prov === 'resend') {
      setFromEmail("onboarding@resend.dev");
    } else if (prov === 'smtp') {
      setFromEmail("");
    }
  };

  return (
    <div id="sender-panel" className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-600" />
          Transmit Email Flyer
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Deliver the designed HTML flyer directly to any email address as a fully rendered template.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Recipient Field */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Recipient Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. recipient@example.com"
              required
              disabled={isSending || !html}
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-hidden transition-colors disabled:opacity-50"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Custom Subject Field */}
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Subject Header (Recipient Sees)
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Exclusive summer deal..."
            disabled={isSending || !html}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-hidden transition-colors disabled:opacity-50"
          />
        </div>

        {/* Expandable Sender Settings */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-indigo-600" />
              Configure Credentials & Server ({provider === 'test' ? 'Ethereal Sandbox' : provider === 'resend' ? 'Resend API' : 'Custom SMTP'})
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              {showSettings ? "Hide Options ▲" : "Show Options ▼"}
            </span>
          </button>

          {showSettings && (
            <div className="p-4 bg-white border-t border-slate-100 space-y-4 animate-fadeIn">
              {/* Provider Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Email Sending Provider
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Test Sandbox Option */}
                  <button
                    type="button"
                    onClick={() => handleProviderChange('test')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      provider === 'test'
                        ? "border-indigo-600 bg-indigo-50/20 text-indigo-950 font-bold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-[11px] font-bold">Sandbox Test</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Zero-config sandbox</div>
                  </button>

                  {/* Resend API Option */}
                  <button
                    type="button"
                    onClick={() => handleProviderChange('resend')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      provider === 'resend'
                        ? "border-indigo-600 bg-indigo-50/20 text-indigo-950 font-bold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-[11px] font-bold">Resend API</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Send via API key</div>
                  </button>

                  {/* Custom SMTP Option */}
                  <button
                    type="button"
                    onClick={() => handleProviderChange('smtp')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      provider === 'smtp'
                        ? "border-indigo-600 bg-indigo-50/20 text-indigo-950 font-bold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-[11px] font-bold">Custom SMTP</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">SMTP credentials</div>
                  </button>
                </div>
              </div>

              {/* General Sender Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Sender From Name</label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="e.g. Aura Boutique"
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Sender From Email</label>
                  <input
                    type="text"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder={provider === 'test' ? "ethereal.email generated" : "e.g. info@domain.com"}
                    disabled={provider === 'test'}
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>

              {/* Resend Configurations */}
              {provider === 'resend' && (
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Key className="w-3.5 h-3.5 text-indigo-600" />
                    Configure Resend Key
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Enter your Resend API Key to authenticate. If you configured <code>RESEND_API_KEY</code> in environment variables, leave this empty.
                  </p>
                  <input
                    type="password"
                    value={resendApiKey}
                    onChange={(e) => setResendApiKey(e.target.value)}
                    placeholder={envConfig.hasResendKey ? "•••••••••••••••• (Configured in Env)" : "re_9axFk..."}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                  />
                </div>
              )}

              {/* SMTP Configurations */}
              {provider === 'smtp' && (
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Server className="w-3.5 h-3.5 text-indigo-600" />
                    SMTP Configuration Details
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">SMTP Host</label>
                      <input
                        type="text"
                        value={smtpHost}
                        onChange={(e) => setSmtpHost(e.target.value)}
                        placeholder="smtp.gmail.com"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Port</label>
                      <input
                        type="number"
                        value={smtpPort}
                        onChange={(e) => setSmtpPort(Number(e.target.value))}
                        placeholder="587"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">SMTP User (Email)</label>
                      <input
                        type="text"
                        value={smtpUser}
                        onChange={(e) => setSmtpUser(e.target.value)}
                        placeholder="user@gmail.com"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Password / App Pass</label>
                      <input
                        type="password"
                        value={smtpPass}
                        onChange={(e) => setSmtpPass(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="smtpSecure"
                      checked={smtpSecure}
                      onChange={(e) => setSmtpSecure(e.target.checked)}
                      className="rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                    />
                    <label htmlFor="smtpSecure" className="text-[10px] font-bold text-slate-600 uppercase cursor-pointer">
                      Use SSL/TLS (Secure Connection, usually Port 465)
                    </label>
                  </div>
                </div>
              )}

              {/* Sandbox instructions info */}
              {provider === 'test' && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-[10px] text-blue-700 leading-relaxed">
                  🚀 <strong>Sandbox Mode (Recommended for testing):</strong> This transmits the flyer using a sandboxed SMTP server. It generates a live message URL after clicking "Send" so you can view exactly how the recipient gets the fully designed HTML layout without setting up credentials!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Send Action Trigger Button */}
        <button
          type="submit"
          disabled={isSending || !recipient.trim() || !html}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {isSending ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Delivering HTML Flyer...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-emerald-100" />
              Send Flyer Now
            </>
          )}
        </button>

        {/* Transmission Result Feedback Notice */}
        {status.type !== "idle" && (
          <div
            className={`p-4 rounded-xl border flex flex-col gap-3 animate-fadeIn ${
              status.type === "success"
                ? "bg-emerald-50 border-emerald-100 text-emerald-950"
                : "bg-red-50 border-red-100 text-red-950"
            }`}
          >
            <div className="flex items-start gap-2.5 text-xs leading-relaxed font-semibold">
              {status.type === "success" ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">{status.message}</div>
            </div>

            {/* Sandbox Ethereal Inbox Link */}
            {status.type === "success" && status.previewUrl && (
              <a
                href={status.previewUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all text-center self-start"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Deliviered Flyer Sandbox Link
              </a>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
