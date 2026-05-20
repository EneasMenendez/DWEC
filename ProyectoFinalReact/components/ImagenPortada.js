"use client";
import { useState } from "react";

export default function ImagenPortada({ src, alt }) {
  const [error, setError] = useState(false);

  if (error || !src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className="w-100 rounded mb-4 shadow"
      style={{ maxHeight: "400px", objectFit: "cover" }}
      onError={() => setError(true)}
    />
  );
}
