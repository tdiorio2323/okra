import type { SiteConfig } from "../../site-runtime/engine/types";

export const willowTheme = {
  name: "noir",
  colors: { bg: "#0a0a0a", fg: "#ffffff", accent: "#d4af37" },
  fonts: { heading: "Playfair Display, serif", body: "Inter, system-ui" },
};

const config: SiteConfig = {
  handle: "willowryder",
  theme: willowTheme,
  nav: [
    { label: "Home", href: "/willowryder" },
    { label: "Portfolio", href: "/willowryder/portfolio" },
    { label: "Gallery", href: "/willowryder/gallery" },
    { label: "Booking", href: "/willowryder/booking" },
    { label: "Bio", href: "/willowryder/bio" },
  ],
  pages: [
    {
      path: "/",
      page: {
        type: "landing",
        hero: {
          title: "Willow Ryder",
          subtitle: "Actress • Model",
          image: "/media/hero.jpg",
        },
        sections: [],
      },
    },
    {
      path: "/portfolio",
      page: {
        type: "portfolio",
        items: [
          { title: "Cover Shoot", img: "/media/p1.jpg", href: "/willowryder/booking" },
          { title: "Editorial A", img: "/media/p2.jpg" },
          { title: "Editorial B", img: "/media/p3.jpg" },
        ],
      },
    },
    {
      path: "/gallery",
      page: { type: "gallery", images: ["/media/g1.jpg", "/media/g2.jpg", "/media/g3.jpg", "/media/g4.jpg"] },
    },
    {
      path: "/booking",
      page: {
        type: "booking",
        fields: [
          { name: "name", label: "Your Name", required: true },
          { name: "email", label: "Email", required: true },
          { name: "request", label: "Project Details", required: true },
          { name: "date", label: "Preferred Date" },
        ],
        submitTo: "/api/booking",
      },
    },
    {
      path: "/bio",
      page: {
        type: "bio",
        text:
          "Willow Ryder is a Chicago-based actress and model focused on premium editorial and cinematic work.",
        socials: [
          { label: "Website", href: "https://www.willowryder.com" },
          { label: "Instagram", href: "https://instagram.com/willowryder" },
          { label: "X", href: "https://x.com/willowryder" },
        ],
      },
    },
  ],
  footer: { links: [{ label: "Terms", href: "/willowryder/terms" }] },
};

export default config;

