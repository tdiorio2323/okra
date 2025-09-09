export type Page =
  | { type: "landing"; hero: { title: string; subtitle?: string; video?: string; image?: string }; sections: any[] }
  | { type: "portfolio"; items: { title: string; img: string; href?: string }[] }
  | { type: "gallery"; images: string[] }
  | { type: "booking"; fields: { name: string; label: string; required?: boolean }[]; submitTo: string }
  | { type: "bio"; text: string; socials?: { label: string; href: string }[] };

export type Theme = { name: string; colors: Record<string, string>; fonts: { heading: string; body: string } };

export type SiteConfig = {
  handle: string;
  theme: Theme;
  nav: { label: string; href: string }[];
  pages: { path: string; page: Page }[];
  footer?: { links: { label: string; href: string }[] };
};

