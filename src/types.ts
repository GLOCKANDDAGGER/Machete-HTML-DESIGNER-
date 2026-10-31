export interface RecentProject {
  id: string;
  name: string;
  subject: string;
  html: string;
  category: string;
  prompt?: string;
  updatedAt: string;
}

export interface InsertImageOptions {
  url: string;
  alt: string;
  linkUrl?: string;
  position: 'hero' | 'content' | 'logo' | 'footer' | 'custom';
  alignment: 'left' | 'center' | 'right';
  maxWidth: string; // e.g. "100%", "300px", "120px"
  borderRadius: string; // e.g. "0px", "8px", "16px", "9999px"
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  prompt: string;
  category: string;
  createdAt: string;
}

export interface SenderConfig {
  provider: 'resend' | 'smtp' | 'test';
  resendApiKey: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpSecure: boolean;
  fromEmail: string;
  fromName: string;
}

export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  config: SenderConfig;
}

export interface DesignRequestPayload {
  prompt: string;
  category?: string;
  baseHtml?: string; // Optional: for refining an existing design
  instruction?: string; // Optional: detailed edit instruction
}
