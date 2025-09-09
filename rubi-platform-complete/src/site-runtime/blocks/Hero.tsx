import React from "react";

export default function Hero({
  title,
  subtitle,
  image,
  video,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl">
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[60vh] object-cover"
        />
      ) : (
        <img src={image} alt={title} className="w-full h-[60vh] object-cover" />
      )}
      <div className="absolute inset-0 bg-black/40 grid place-items-center text-center p-8">
        <h1 className="text-4xl md:text-6xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-3 text-base md:text-lg opacity-90">{subtitle}</p>}
      </div>
    </section>
  );
}

