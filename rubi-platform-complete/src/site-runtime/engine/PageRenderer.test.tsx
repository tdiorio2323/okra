import { render, screen } from "@testing-library/react";
import PageRenderer from "./PageRenderer";
import type { SiteConfig } from "./types";

const cfg: SiteConfig = {
  handle: "willowryder",
  theme: {
    name: "noir",
    colors: { bg: "#000", fg: "#fff", accent: "#d4af37" },
    fonts: { heading: "Playfair", body: "Inter" },
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  pages: [
    { path: "/", page: { type: "landing", hero: { title: "Willow Ryder", subtitle: "Actress" }, sections: [] } },
    { path: "/portfolio", page: { type: "portfolio", items: [{ title: "A", img: "/a.jpg" }] } },
    {
      path: "/booking",
      page: { type: "booking", fields: [{ name: "email", label: "Email", required: true }], submitTo: "/api" },
    },
    { path: "/bio", page: { type: "bio", text: "Bio text" } },
  ],
  footer: { links: [{ label: "Terms", href: "/terms" }] },
};

test("renders landing hero title", () => {
  render(<PageRenderer page={cfg.pages[0].page} theme={cfg.theme} nav={cfg.nav} footer={cfg.footer} />);
  expect(screen.getByText("Willow Ryder")).toBeInTheDocument();
});

test("renders portfolio grid item", () => {
  render(<PageRenderer page={cfg.pages[1].page} theme={cfg.theme} nav={cfg.nav} footer={cfg.footer} />);
  expect(screen.getByText("A")).toBeInTheDocument();
});

test("renders booking form field", () => {
  render(<PageRenderer page={cfg.pages[2].page} theme={cfg.theme} nav={cfg.nav} footer={cfg.footer} />);
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
});

test("renders bio text", () => {
  render(<PageRenderer page={cfg.pages[3].page} theme={cfg.theme} nav={cfg.nav} footer={cfg.footer} />);
  expect(screen.getByText(/Bio text/)).toBeInTheDocument();
});

