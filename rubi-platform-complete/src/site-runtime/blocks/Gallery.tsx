import React from "react";

export default function Gallery({ images }: { images: string[] }) {
  return (
    <section className="columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
      {images.map((src, i) => (
        <img key={i} src={src} className="mb-4 w-full rounded-xl" alt={`img-${i}`} />
      ))}
    </section>
  );
}

