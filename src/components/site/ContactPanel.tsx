'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { SocialIcon } from '@/components/site/SocialIcon';
import { CONTACT_PAGE_CONTENT } from '@/data/contact';
import { PROFILE, SOCIAL_LINKS } from '@/data/profile';

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export function ContactPanel(): React.JSX.Element {
  const [form, setForm] = useState<ContactFormState>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [statusText, setStatusText] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message || loading) {
      return;
    }

    setLoading(true);
    setSent(false);
    setStatusText('');

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio contact - ${form.name}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Could not send message');
      }

      setForm({ name: '', email: '', message: '' });
      setSent(true);
      setStatusText(CONTACT_PAGE_CONTENT.sentStatus);
    } catch {
      setSent(true);
      setStatusText(CONTACT_PAGE_CONTENT.fallbackStatus);
      const subject = encodeURIComponent(`Portfolio contact - ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="layout-container py-6 grid lg:grid-cols-12 gap-6">
      <form onSubmit={onSubmit} className="panel-card panel-hover lg:col-span-7 p-8 space-y-5">
        <div>
          <label className="form-label">Name</label>
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="field-input"
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="field-input"
          />
        </div>
        <div>
          <label className="form-label">Message</label>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="field-input resize-none"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary-sm disabled:opacity-60">
          <Send size={14} />
          {loading ? CONTACT_PAGE_CONTENT.sendingLabel : CONTACT_PAGE_CONTENT.sendButtonLabel}
        </button>
        {sent && <p className="text-sm text-primary">{statusText}</p>}
      </form>

      <aside className="lg:col-span-5 space-y-4">
        <div className="panel-card panel-hover p-6">
          <div className="text-sm font-semibold mb-4">
            {CONTACT_PAGE_CONTENT.directChannelsTitle}
          </div>
          <ul className="space-y-3 text-sm">
            {SOCIAL_LINKS.map(link => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <span className="h-9 w-9 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                    {link.id === 'email' ? (
                      <Mail size={15} />
                    ) : (
                      <SocialIcon brand={link.id} size={15} className="opacity-90" />
                    )}
                  </span>
                  {link.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel-card panel-hover p-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{CONTACT_PAGE_CONTENT.locationLabel}</span>
            <span>{PROFILE.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{CONTACT_PAGE_CONTENT.responseTimeLabel}</span>
            <span>{PROFILE.responseTime}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
