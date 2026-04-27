import { useState } from 'react';
import { CONTACT_PAGE_CONTENT } from '@/data/contact';
import { PROFILE } from '@/data/profile';
import { FORM_LIMITS } from '@/data/config';

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export interface RateLimitState {
  remaining: string | null;
  reset: string | null;
}

export function useContactForm() {
  const [form, setForm] = useState<ContactFormState>({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [rateLimit, setRateLimit] = useState<RateLimitState | null>(null);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.message ||
      loading ||
      form.name.length > FORM_LIMITS.contact.maxNameLength ||
      form.email.length > FORM_LIMITS.contact.maxEmailLength ||
      form.message.length > FORM_LIMITS.contact.maxMessageLength
    ) {
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

      const remaining = res.headers.get('X-RateLimit-Remaining');
      const reset = res.headers.get('X-RateLimit-Reset');
      if (remaining) {
        setRateLimit({ remaining, reset });
      }

      if (!res.ok) {
        if (res.status === 429) {
          const retryAfter = res.headers.get('Retry-After');
          throw new Error(
            `Rate limit exceeded. Please try again in ${retryAfter || 'some'} seconds.`
          );
        }
        throw new Error('Could not send message');
      }

      setForm({ name: '', email: '', message: '' });
      setSent(true);
      setStatusText(CONTACT_PAGE_CONTENT.sentStatus);
    } catch (err) {
      setSent(true);
      setStatusText(err instanceof Error ? err.message : CONTACT_PAGE_CONTENT.fallbackStatus);

      if (!(err instanceof Error && err.message.includes('Rate limit'))) {
        const subject = encodeURIComponent(`Portfolio contact - ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
        window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    sent,
    statusText,
    rateLimit,
    updateField,
    submit,
  };
}
