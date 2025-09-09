import React from 'react';
import SiteLayout from '@/components/site/SiteLayout';

export default function Home() {
  return (
    <SiteLayout>
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Brand</h1>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          Model. Creator. Entrepreneur. This is a clean, fast skeleton you can
          customize with your brand, photos, and copy.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <a className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800" href="/site/work">
            View Work
          </a>
          <a className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 hover:bg-slate-50" href="/site/contact">
            Contact
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
