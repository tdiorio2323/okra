import React, { useState } from "react";

export default function BookingForm({
  fields,
  submitTo,
}: {
  fields: { name: string; label: string; required?: boolean }[];
  submitTo: string;
}) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch(submitTo, { method: "POST", body: fd });
      alert("Request sent.");
      e.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      {fields.map((f) => (
        <div key={f.name} className="grid gap-1">
          <label htmlFor={f.name} className="text-sm opacity-80">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            required={!!f.required}
            className="bg-white/5 border border-white/10 rounded-md px-3 py-2 outline-none focus:ring"
          />
        </div>
      ))}
      <button disabled={loading} className="px-4 py-2 rounded-md border border-white/20">
        {loading ? "Sending..." : "Request Booking"}
      </button>
    </form>
  );
}

