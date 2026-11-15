import type { Request, Response } from 'express';
import { sendEmail } from '@/server/email';
import { getSecret } from '#airo/secrets';

// ── Security helpers ──────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function asStr(val: unknown, maxLen: number): string {
  if (val === null || val === undefined) return '';
  return String(val).slice(0, maxLen);
}

const LIMITS = { name: 120, company: 200, email: 254, phone: 30, country: 100, message: 4000, inquiryType: 30 };

export default async function handler(req: Request, res: Response) {
  const raw = req.body as Record<string, unknown>;
  const name        = asStr(raw.name,        LIMITS.name);
  const company     = asStr(raw.company,     LIMITS.company);
  const email       = asStr(raw.email,       LIMITS.email);
  const phone       = asStr(raw.phone,       LIMITS.phone);
  const country     = asStr(raw.country,     LIMITS.country);
  const message     = asStr(raw.message,     LIMITS.message);
  const inquiryType = asStr(raw.inquiryType, LIMITS.inquiryType);

  if (!name || !email || !country || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const recipient = getSecret('CONTACT_RECIPIENT_EMAIL');
  if (!recipient) {
    console.error('email.recipient_unset: CONTACT_RECIPIENT_EMAIL not configured');
    return res.status(500).json({ error: 'Email recipient not configured' });
  }

  const inquiryLabels: Record<string, string> = {
    importer: 'International Importer',
    distributor: 'Distributor / Retailer',
    farmer: 'Farmer Partner',
    other: 'General Enquiry',
  };
  const inquiryLabel = inquiryLabels[inquiryType] ?? 'General Enquiry';

  // Escaped values for HTML insertion
  const eName        = escapeHtml(name);
  const eCompany     = escapeHtml(company);
  const eEmail       = escapeHtml(email);
  const ePhone       = escapeHtml(phone);
  const eCountry     = escapeHtml(country);
  const eMessage     = escapeHtml(message);
  const eInquiryLabel = escapeHtml(inquiryLabel);
  const eInquiryType  = escapeHtml(inquiryType);

  const subject = `[${inquiryLabel}] New enquiry from ${name}${company ? ` — ${company}` : ''}`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #1B4332; padding: 28px 32px; border-radius: 8px 8px 0 0;">
        <p style="color: #C9A84C; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px;">OrganicGlobe International</p>
        <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 600;">New Website Enquiry</h1>
      </div>
      <div style="background: #f9f6f0; padding: 28px 32px; border: 1px solid #e5ddd0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; color: #666; font-size: 13px; width: 140px;">Enquiry Type</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; font-size: 13px; font-weight: 600; color: #C9A84C;">${eInquiryLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; color: #666; font-size: 13px;">Full Name</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; font-size: 13px; font-weight: 600;">${eName}</td>
          </tr>
          ${eCompany ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; color: #666; font-size: 13px;">${eInquiryType === 'farmer' ? 'Farm / Village' : 'Company'}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; font-size: 13px;">${eCompany}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; color: #666; font-size: 13px;">Email</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; font-size: 13px;"><a href="mailto:${eEmail}" style="color: #1B4332;">${eEmail}</a></td>
          </tr>
          ${ePhone ? `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; color: #666; font-size: 13px;">Phone / WhatsApp</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; font-size: 13px;">${ePhone}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; color: #666; font-size: 13px;">${eInquiryType === 'farmer' ? 'District / State' : 'Country / Region'}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5ddd0; font-size: 13px;">${eCountry}</td>
          </tr>
        </table>
        <div>
          <p style="color: #666; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
          <div style="background: #ffffff; border: 1px solid #e5ddd0; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${eMessage}</div>
        </div>
      </div>
      <div style="background: #1B4332; padding: 16px 32px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #ffffff80; font-size: 11px; margin: 0;">Sent from the OrganicGlobe International website contact form</p>
      </div>
    </div>
  `;

  const text = `New ${inquiryLabel} enquiry\n\nName: ${name}\n${company ? `Company: ${company}\n` : ''}Email: ${email}\n${phone ? `Phone: ${phone}\n` : ''}${inquiryType === 'farmer' ? 'District/State' : 'Country'}: ${country}\n\nMessage:\n${message}`;

  // Auto-reply content sent back to the visitor
  const autoReplySubject = `We've received your enquiry — OrganicGlobe International`;
  const autoReplyHtml = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #1B4332; padding: 28px 32px; border-radius: 8px 8px 0 0;">
        <p style="color: #C9A84C; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px;">OrganicGlobe International</p>
        <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 600;">Thank You for Reaching Out</h1>
      </div>
      <div style="background: #f9f6f0; padding: 28px 32px; border: 1px solid #e5ddd0; border-top: none;">
        <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">Dear <strong>${eName}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.8; color: #444; margin: 0 0 16px;">
          Thank you for contacting OrganicGlobe International. We have received your enquiry as a <strong style="color: #1B4332;">${eInquiryLabel}</strong> and our team will review it shortly.
        </p>
        <p style="font-size: 14px; line-height: 1.8; color: #444; margin: 0 0 24px;">
          We typically respond within <strong>1–2 business days</strong>. If your matter is urgent, feel free to reply directly to this email.
        </p>
        <div style="background: #ffffff; border-left: 3px solid #C9A84C; padding: 14px 18px; border-radius: 0 6px 6px 0; margin-bottom: 24px;">
          <p style="font-size: 13px; color: #666; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 1px;">Your Message</p>
          <p style="font-size: 13px; line-height: 1.7; color: #333; margin: 0; white-space: pre-wrap;">${eMessage}</p>
        </div>
        <p style="font-size: 13px; color: #888; margin: 0;">
          Warm regards,<br/>
          <strong style="color: #1B4332;">Avinash Chavan</strong><br/>
          Founder &amp; Managing Director<br/>
          OrganicGlobe International · Maharashtra, India
        </p>
      </div>
      <div style="background: #1B4332; padding: 16px 32px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #C9A84C; font-size: 11px; margin: 0 0 4px; font-style: italic;">"Clean Food. Fair Farms. Global Reach."</p>
        <p style="color: #ffffff50; font-size: 10px; margin: 0;">OrganicGlobe International · Est. 2023 · Maharashtra, India</p>
      </div>
    </div>
  `;
  const autoReplyText = `Dear ${name},\n\nThank you for contacting OrganicGlobe International. We have received your enquiry as a ${inquiryLabel} and our team will review it shortly.\n\nWe typically respond within 1–2 business days.\n\nYour message:\n${message}\n\nWarm regards,\nAvinash Chavan\nFounder & Managing Director\nOrganicGlobe International`;

  try {
    // Send notification to the company
    await sendEmail({
      fromName: 'OrganicGlobe International',
      to: String(recipient),
      replyTo: String(email),
      subject,
      html,
      text,
    });

    // Send auto-reply to the visitor
    await sendEmail({
      fromName: 'OrganicGlobe International',
      to: String(email),
      replyTo: String(recipient),
      subject: autoReplySubject,
      html: autoReplyHtml,
      text: autoReplyText,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('contact.email.failed', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
