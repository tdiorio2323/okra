import React from "react";

export default function Bio({ text, socials }: { text: string; socials?: { label: string; href: string }[] }) {
  return (
    <section className="grid gap-4 max-w-2xl">
      <p className="opacity-90 leading-relaxed">{text}</p>
      {socials?.length ? (
        <ul className="flex gap-4 text-sm">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

