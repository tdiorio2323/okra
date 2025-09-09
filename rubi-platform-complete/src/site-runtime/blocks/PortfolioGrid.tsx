import React from "react";

export default function PortfolioGrid({ items }: { items: { title: string; img: string; href?: string }[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <a key={i} href={it.href ?? "#"} className="group block rounded-xl overflow-hidden border border-white/10">
          <img
            src={it.img}
            alt={it.title}
            className="aspect-[4/5] w-full object-cover group-hover:scale-105 transition"
          />
          <div className="p-3 text-sm opacity-90">{it.title}</div>
        </a>
      ))}
    </section>
  );
}

