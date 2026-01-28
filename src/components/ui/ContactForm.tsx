import React, { useState } from 'react';

export default function ContactForm(): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function isValidEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !message) {
      setError('Please fill name, email and message.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const payload = { name, email, subject, message };

      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess('Message sent — thanks!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        const mailto = `mailto:bernardo.correia.pereira@gmail.com?subject=${encodeURIComponent(subject || 'Contact from portfolio')}&body=${encodeURIComponent(
          `Name: ${name}%0AEmail: ${email}%0A%0A${message}`
        )}`;
        window.location.href = mailto;
      }
    } catch {
      const mailto = `mailto:bernardo.correia.pereira@gmail.com?subject=${encodeURIComponent(subject || 'Contact from portfolio')}&body=${encodeURIComponent(
        `Name: ${name}%0AEmail: ${email}%0A%0A${message}`
      )}`;
      window.location.href = mailto;
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          className="w-full p-3 rounded bg-secondary border border-white/10"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-3 rounded bg-secondary border border-white/10"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          type="email"
        />
      </div>

      <input
        className="w-full p-3 rounded bg-secondary border border-white/10 mb-4"
        placeholder="Subject (optional)"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />

      <textarea
        className="w-full p-3 rounded bg-secondary border border-white/10 mb-4 min-h-[140px]"
        placeholder="Your message"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
      />

      {error && <div className="text-rose-400 mb-3">{error}</div>}
      {success && <div className="text-emerald-400 mb-3">{success}</div>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-800 color-primary rounded-lg px-6 py-3 text-base font-medium transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send Message'}
        </button>

        <a
          className="text-sm color-secondary hover:underline"
          href="mailto:bernardo.correia.pereira@gmail.com"
        >
          Or email directly
        </a>
      </div>
    </form>
  );
}
