import type { Request, Response } from 'express';
import { sendEmail } from '@/server/email';
import { getSecret } from '#airo/secrets';
import fs from 'fs';
import path from 'path';

const STORAGE_FILE = '/private/notify-subscribers.json';
const EMAIL_MAX_LEN = 254;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function loadSubscribers(): string[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) return [];
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data) as string[];
  } catch {
    return [];
  }
}

function saveSubscribers(list: string[]): void {
  const dir = path.dirname(STORAGE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

export default async function handler(req: Request, res: Response) {
  const raw = req.body as Record<string, unknown>;
  const email = typeof raw.email === 'string' ? raw.email.slice(0, EMAIL_MAX_LEN) : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const eEmail = escapeHtml(email);

  // Store the subscriber
  const subscribers = loadSubscribers();
  if (!subscribers.includes(email.toLowerCase())) {
    subscribers.push(email.toLowerCase());
    saveSubscribers(subscribers);
  }

  const recipient = getSecret('CONTACT_RECIPIENT_EMAIL');

  // Auto-reply to subscriber
  const autoReplyHtml = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #1B4332; padding: 28px 32px; border-radius: 8px 8px 0 0;">
        <p style="color: #C9A84C; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px;">OrganicGlobe International</p>
        <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-weight: 600;">You're on the List!</h1>
      </div>
      <div style="background: #f9f6f0; padding: 28px 32px; border: 1px solid #e5ddd0; border-top: none;">
        <p style="font-size: 15px; line-height: 1.7; margin: 0 0 16px;">Hello,</p>
        <p style="font-size: 14px; line-height: 1.8; color: #444; margin: 0 0 16px;">
          Thank you for signing up to be notified when <strong style="color: #1B4332;">OrganicGlobe International</strong> goes live. We're working hard behind the scenes to bring you a technology-driven, farmer-first organic supply chain.
        </p>
        <p style="font-size: 14px; line-height: 1.8; color: #444; margin: 0 0 24px;">
          We'll send you a personal note the moment we're ready. Stay tuned — big things are coming.
        </p>
        <div style="background: #1B4332; border-radius: 6px; padding: 16px 20px; margin-bottom: 24px; text-align: center;">
          <p style="color: #C9A84C; font-size: 13px; font-style: italic; margin: 0;">"Clean Food. Fair Farms. Global Reach."</p>
        </div>
        <p style="font-size: 13px; color: #888; margin: 0;">
          Warm regards,<br/>
          <strong style="color: #1B4332;">Avinash Chavan</strong><br/>
          Founder &amp; Managing Director<br/>
          OrganicGlobe International · Maharashtra, India
        </p>
      </div>
      <div style="background: #1B4332; padding: 14px 32px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #ffffff50; font-size: 10px; margin: 0;">OrganicGlobe International · Est. 2023 · Maharashtra, India · Exporting Worldwide</p>
      </div>
    </div>
  `;

  const autoReplyText = `Hello,\n\nThank you for signing up to be notified when OrganicGlobe International goes live.\n\nWe'll send you a personal note the moment we're ready.\n\nWarm regards,\nAvinash Chavan\nFounder & Managing Director\nOrganicGlobe International`;

  try {
    // Send auto-reply to subscriber
    await sendEmail({
      fromName: 'OrganicGlobe International',
      to: email,
      replyTo: recipient ? String(recipient) : undefined,
      subject: "You're on the list — OrganicGlobe International",
      html: autoReplyHtml,
      text: autoReplyText,
    });

    // Notify the company of new subscriber
    if (recipient) {
      await sendEmail({
        fromName: 'OrganicGlobe International',
        to: String(recipient),
        replyTo: email,
        subject: `New launch notification signup: ${email}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1B4332; padding: 20px 28px; border-radius: 8px 8px 0 0;">
              <p style="color: #C9A84C; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 4px;">OrganicGlobe International</p>
              <h2 style="color: #fff; font-size: 18px; margin: 0;">New Notify Me Signup</h2>
            </div>
            <div style="background: #f9f6f0; padding: 24px 28px; border: 1px solid #e5ddd0; border-top: none;">
              <p style="font-size: 14px; color: #444; margin: 0 0 12px;">A new visitor has signed up to be notified at launch:</p>
              <p style="font-size: 16px; font-weight: 600; color: #1B4332; margin: 0 0 16px;">${eEmail}</p>
              <p style="font-size: 13px; color: #888; margin: 0;">Total subscribers: <strong>${subscribers.length}</strong></p>
            </div>
            <div style="background: #1B4332; padding: 12px 28px; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="color: #ffffff50; font-size: 10px; margin: 0;">Sent from the OrganicGlobe International website</p>
            </div>
          </div>
        `,
        text: `New notify me signup: ${email}\nTotal subscribers: ${subscribers.length}`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('notify.email.failed', error);
    // Still return success if email fails but subscriber was saved
    return res.status(200).json({ ok: true });
  }
}
