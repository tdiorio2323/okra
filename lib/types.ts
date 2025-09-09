export type Product = {
  id: string;            // design-01 … design-100
  name: string;          // FRONTZ 01 …
  priceCents: number;    // 2000
  imageSrc: string;      // /images/designs/design-01.jpg or https://...
  stripePriceId: string; // price_xxx
};

// Link page builder types
export type LinkItem = {
  id: string;
  label: string;
  url: string;
  gated?: boolean; // VIP-only
};

export type LinkPage = {
  slug: string;
  title: string;
  bio?: string;
  avatarUrl?: string;
  theme?: 'light' | 'dark';
  // Optional builder customizations
  fontFamily?: string;
  fontWeight?: number;
  scheme?: 'monochrome' | 'vibrant' | 'sunset' | 'violet';
  accent?: string;
  buttonStyle?: string; // rounded | sharp | pill | glow | outlined | gradient | hover | shadow | icon | minimal
  layout?: 'stack' | 'grid' | 'row';
  vipCode?: string; // per-slug VIP gate
  links: LinkItem[];
  updatedAt: string;
  createdAt: string;
};
