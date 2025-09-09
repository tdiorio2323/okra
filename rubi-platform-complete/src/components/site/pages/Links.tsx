import React from 'react';
import SiteLayout from '@/components/site/SiteLayout';

type LinkItem = {
  label: string;
  href: string;
  note?: string;
};

const PROFILE = {
  name: 'Your Name',
  handle: '@yourhandle',
  avatar: 'https://placehold.co/112x112',
  bio: 'Official links in one place',
};

const LINKS: LinkItem[] = [
  { label: 'Twitter / X', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Website', href: '#' },
  { label: 'Contact / Bookings', href: '/site/contact' },
];

export default function Links() {
  return (
    <SiteLayout>
      <section
        className="mx-auto max-w-md text-center"
        style={{
          // Brand colors from live site
          // @ts-ignore - CSS variables
          '--wr-primary': '#EA5172',
          '--wr-secondary': '#FE8F8B',
          '--wr-bg-hover': '#FFF5F7',
          '--wr-border': '#FFE3EA',
        }}
      >
        <img
          src={PROFILE.avatar}
          alt={PROFILE.name}
          className="mx-auto h-28 w-28 rounded-full object-cover border border-slate-200"
        />
        <h1 className="mt-4 text-2xl font-semibold">{PROFILE.name}</h1>
        <p className="mt-1 text-slate-500 text-sm">{PROFILE.handle}</p>
        <p className="mt-3 text-slate-700">{PROFILE.bio}</p>

        <div className="mt-8 space-y-3">
          {LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block w-full rounded-xl border px-5 py-3 text-left transition border-[var(--wr-border,#f3e1e5)] bg-white hover:bg-[var(--wr-bg-hover,#fff5f7)]"
            >
              <span className="block font-medium text-slate-900">{item.label}</span>
              {item.note && <span className="text-slate-500 text-sm">{item.note}</span>}
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-slate-500">Updated {new Date().toLocaleDateString()}</p>
      </section>
    </SiteLayout>
  );
}
