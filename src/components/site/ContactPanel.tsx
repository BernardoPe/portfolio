'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

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
      setStatusText('Message sent. Thank you!');
    } catch {
      setSent(true);
      setStatusText('Opening your mail client…');
      const subject = encodeURIComponent(`Portfolio contact - ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
      window.location.href = `mailto:bernardo.correia.pereira@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 lg:px-8 py-8 lg:py-6 grid lg:grid-cols-12 gap-6">
      <form
        onSubmit={onSubmit}
        className="hover-lift lg:col-span-7 border border-border/80 rounded-2xl bg-card p-6 lg:p-8 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
          <input
            required
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-background border border-border-strong rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-background border border-border-strong rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full bg-background border border-border-strong rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="hover-lift inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
        >
          <Send size={14} /> {loading ? 'Sending...' : 'Send message'}
        </button>
        {sent && <p className="text-sm text-primary">{statusText}</p>}
      </form>

      <aside className="lg:col-span-5 space-y-4">
        <div className="hover-lift border border-border/80 rounded-2xl bg-card p-6">
          <div className="text-sm font-semibold mb-4">Direct channels</div>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:bernardo.correia.pereira@gmail.com"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <span className="h-9 w-9 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Mail size={15} />
                </span>
                bernardo.correia.pereira@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://github.com/bernardope"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <span className="h-9 w-9 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Github size={15} />
                </span>
                github.com/bernardope
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bernardope"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <span className="h-9 w-9 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Linkedin size={15} />
                </span>
                linkedin.com/in/bernardope
              </a>
            </li>
          </ul>
        </div>

        <div className="hover-lift border border-border/80 rounded-2xl bg-card p-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location</span>
            <span>Lisbon, Portugal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Response time</span>
            <span>~24h</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
