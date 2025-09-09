import React from "react";
import type { Page, Theme } from "./types";
import Hero from "../blocks/Hero";
import PortfolioGrid from "../blocks/PortfolioGrid";
import Gallery from "../blocks/Gallery";
import BookingForm from "../blocks/BookingForm";
import Bio from "../blocks/Bio";

export default function PageRenderer({
  page,
  theme,
  nav,
  footer,
}: {
  page: Page;
  theme: Theme;
  nav: { label: string; href: string }[];
  footer?: { links: { label: string; href: string }[] };
}) {
  const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen" style={{ background: theme.colors.bg, color: theme.colors.fg }}>
      <header className="sticky top-0 backdrop-blur border-b border-white/10">
        <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="font-semibold" style={{ fontFamily: theme.fonts.heading }}>Willow Ryder</div>
          <ul className="flex gap-6 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:opacity-80">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      {footer && (
        <footer className="mx-auto max-w-6xl px-4 py-10 border-t border-white/10 text-sm opacity-80">
          <ul className="flex gap-4 flex-wrap">
            {footer.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </div>
  );

  switch (page.type) {
    case "landing":
      return (
        <Shell>
          <Hero {...page.hero} />
        </Shell>
      );
    case "portfolio":
      return (
        <Shell>
          <PortfolioGrid items={page.items} />
        </Shell>
      );
    case "gallery":
      return (
        <Shell>
          <Gallery images={page.images} />
        </Shell>
      );
    case "booking":
      return (
        <Shell>
          <BookingForm fields={page.fields} submitTo={page.submitTo} />
        </Shell>
      );
    case "bio":
      return (
        <Shell>
          <Bio text={page.text} socials={page.socials} />
        </Shell>
      );
  }
}

