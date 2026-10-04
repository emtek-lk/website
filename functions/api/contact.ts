// Cloudflare Pages Function: POST /api/contact
// Sends the contact form to hello@emtek.lk via the Resend API. The RESEND_API_KEY
// secret is set in the Cloudflare Pages dashboard (Settings > Environment variables),
// never committed here. See README for setup steps.

interface Env {
  RESEND_API_KEY: string;
}

const TO_EMAIL = 'hello@emtek.lk';
const FROM_EMAIL = 'EMTEK Website <website@emtek.lk>';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const wantsJson = (request: Request) => (request.headers.get('accept') ?? '').includes('application/json');

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const { origin } = new URL(request.url);
  const json = wantsJson(request);

  const fail = (status: number, message: string) =>
    json
      ? new Response(JSON.stringify({ ok: false, error: message }), { status, headers: { 'content-type': 'application/json' } })
      : Response.redirect(`${origin}/contact?error=1`, 303);

  const succeed = () =>
    json ? new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } }) : Response.redirect(`${origin}/contact?sent=1`, 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'Invalid form submission.');
  }

  // Honeypot: a hidden field real visitors never see or fill in. Bots that fill every
  // field trip it; we pretend success so they don't learn to leave it alone.
  if (String(form.get('website') ?? '').trim()) return succeed();

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const phone = String(form.get('phone') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  if (!name || name.length > 200) return fail(400, 'Enter your name.');
  if (!EMAIL_PATTERN.test(email) || email.length > 320) return fail(400, 'Enter a valid email address.');
  if (!message || message.length > 5000) return fail(400, 'Enter a message.');
  if (phone.length > 50) return fail(400, 'Phone number is too long.');

  if (!env.RESEND_API_KEY) return fail(500, 'Email is not configured.');

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `.trim();

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `New enquiry from ${name}`,
      html,
    }),
  });

  if (!resendRes.ok) return fail(502, 'Could not send your message. Please email us directly.');

  return succeed();
}
