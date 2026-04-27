'use client';

import { Mail, Send } from 'lucide-react';
import { SocialIcon } from '@/components/site/SocialIcon';
import { CONTACT_PAGE_CONTENT } from '@/data/contact';
import { PROFILE, SOCIAL_LINKS } from '@/data/profile';
import { FORM_LIMITS } from '@/data/config';
import { useContactForm } from '@/hooks/useContactForm';

export function ContactPanel(): React.JSX.Element {
  const { form, loading, sent, statusText, rateLimit, updateField, submit } = useContactForm();

  return (
    <section className="layout-container py-6 grid lg:grid-cols-12 gap-6">
      <form onSubmit={submit} className="panel-card panel-hover lg:col-span-7 p-8 space-y-5">
        <div>
          <label className="form-label">Name</label>
          <input
            required
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            maxLength={FORM_LIMITS.contact.maxNameLength}
            className="field-input"
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => updateField('email', e.target.value)}
            maxLength={FORM_LIMITS.contact.maxEmailLength}
            className="field-input"
          />
        </div>
        <div>
          <label className="form-label">Message</label>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={e => updateField('message', e.target.value)}
            maxLength={FORM_LIMITS.contact.maxMessageLength}
            className="field-input resize-none"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary-sm disabled:opacity-60">
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
