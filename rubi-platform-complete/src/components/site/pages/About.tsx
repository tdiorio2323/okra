import React from 'react';
import SiteLayout from '@/components/site/SiteLayout';

export default function About() {
  return (
    <SiteLayout>
      <h1 className="text-3xl font-semibold">About</h1>
      <p className="mt-4 text-slate-700 max-w-3xl">
        This section tells your story: background, mission, values, and
        highlights. Replace this placeholder with authentic copy and photos.
      </p>
    </SiteLayout>
  );
}
