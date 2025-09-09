import cfg from "./site.config";

test("has required pages and nav", () => {
  expect(cfg.nav.length).toBeGreaterThan(0);
  const paths = cfg.pages.map((p) => p.path);
  expect(paths).toContain("/");
  expect(paths).toContain("/portfolio");
  expect(paths).toContain("/booking");
});

