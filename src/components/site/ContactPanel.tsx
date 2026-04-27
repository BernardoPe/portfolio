'use client';

import { Mail, Send } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { SocialIcon } from '@/components/site/SocialIcon';
import { CONTACT_PAGE_CONTENT } from '@/data/contact';
import { PROFILE, SOCIAL_LINKS } from '@/data/profile';
import { FORM_LIMITS } from '@/data/config';
import { useContactForm } from '@/hooks/useContactForm';

export function ContactPanel(): React.JSX.Element {
  const { form, loading, sent, statusText, rateLimit, updateField, submit } = useContactForm();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [form.message]);

  const isNameOver = form.name.length > FORM_LIMITS.contact.maxNameLength;
  const isEmailOver = form.email.length > FORM_LIMITS.contact.maxEmailLength;
  const isMessageOver = form.message.length > FORM_LIMITS.contact.maxMessageLength;
  const isAnyOver = isNameOver || isEmailOver || isMessageOver;

  return (
    <section className="layout-container py-6 grid lg:grid-cols-12 gap-6">
      <form onSubmit={submit} className="panel-card panel-hover lg:col-span-7 p-8 space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="form-label mb-0">Name</label>
            {form.name.length > 0 && (
              <span
                className={`text-[10px] ${isNameOver ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}
              >
                {form.name.length} / {FORM_LIMITS.contact.maxNameLength}
              </span>
            )}
          </div>
          <input
            required
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            className={`field-input ${isNameOver ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="form-label mb-0">Email</label>
            {form.email.length > 0 && (
              <span
                className={`text-[10px] ${isEmailOver ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}
              >
                {form.email.length} / {FORM_LIMITS.contact.maxEmailLength}
              </span>
            )}
          </div>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => updateField('email', e.target.value)}
            className={`field-input ${isEmailOver ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="form-label mb-0">Message</label>
            {form.message.length > 0 && (
              <span
                className={`text-[10px] ${isMessageOver ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}
              >
                {form.message.length} / {FORM_LIMITS.contact.maxMessageLength}
              </span>
            )}
          </div>
          <textarea
            ref={textareaRef}
            required
            rows={4}
            value={form.message}
            onChange={e => updateField('message', e.target.value)}
            className={`field-input resize-none overflow-y-auto min-h-[120px] max-h-[400px] ${isMessageOver ? 'border-red-500 focus:border-red-500' : ''}`}
          />
        </div>
        <button
          type="submit"
          disabled={loading || isAnyOver}
          className="btn-primary-sm disabled:opacity-60"
        >
          <Send size={14} />
          {loading ? CONTACT_PAGE_CONTENT.sendingLabel : CONTACT_PAGE_CONTENT.sendButtonLabel}
        </button>
        {sent && <p className="text-sm text-primary">{statusText}</p>}
        {rateLimit && (
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            {rateLimit.remaining} requests remaining
            {rateLimit.reset &&
              ` • Resets in ${Math.ceil((parseInt(rateLimit.reset) * 1000 - Date.now()) / 60000)}m`}
          </p>
        )}
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
