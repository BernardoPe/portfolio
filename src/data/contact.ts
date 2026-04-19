import type { Metadata } from 'next';

export const CONTACT_METADATA: Metadata = {
  title: 'Contact - Bernardo Pereira',
  description: 'Get in touch with Bernardo Pereira',
};

export const CONTACT_PAGE_CONTENT = {
  headerIndex: '04',
  headerTitle: 'Contact',
  headerSubtitle: 'Get in touch - Send a message or reach out directly.',
  directChannelsTitle: 'Direct channels',
  locationLabel: 'Location',
  responseTimeLabel: 'Response time',
  sendButtonLabel: 'Send message',
  sendingLabel: 'Sending...',
  sentStatus: 'Message sent. Thank you!',
  fallbackStatus: 'Opening your mail client…',
} as const;
