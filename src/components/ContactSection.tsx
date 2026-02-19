import React from 'react';
import Section from './ui/Section';
import SectionId from '../types/sections';
import ContactForm from './ui/ContactForm';

export default function ContactSection(): React.JSX.Element {
  return (
    <Section id={SectionId.Contact} title="Get In Touch" subtitle="Contact Me.">
      <div className="w-full relative px-4 pt-6">
        <div className="bg-secondary rounded-xl px-8 py-6 shadow-lg max-w-3xl mx-auto">
          <p className="color-tertiary mb-5 text-sm md:text-base">
            I&apos;m open to opportunities and collaborations. Send me a message and I&apos;ll get
            back to you.
          </p>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
