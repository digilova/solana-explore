"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface AvatarProps {
  size: number;
  bg: string;
  initials: string;
  src?: string;
  alt?: string;
  fontSize?: number;
  style?: CSSProperties;
}

export default function Avatar({ size, bg, initials, src, alt, fontSize, style }: AvatarProps) {
  const [broken, setBroken] = useState(false);
  // Mount the <img> only after hydration: an SSR'd <img> starts its network
  // request from the server-rendered HTML before React attaches the onError
  // listener, so a load failure that happens in that window is missed and
  // the broken image never falls back to the initials.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <span
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: 9999,
        background: bg,
        color: "#FFFFFF",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: fontSize ?? Math.round(size * 0.34),
        flexShrink: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {initials}
      {src && mounted && !broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? initials}
          onError={() => setBroken(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: bg,
          }}
        />
      )}
    </span>
  );
}
