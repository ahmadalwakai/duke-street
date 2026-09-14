"use client";

import { motion, useReducedMotion } from "framer-motion";

export function RotatingTyre({ size = 320 }: { size?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      style={{ width: size, height: size }}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%" role="img">
        <defs>
          <radialGradient id="tyreShade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#1a1d22" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <radialGradient id="rim" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cfd5dc" />
            <stop offset="100%" stopColor="#6c747e" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#tyreShade)" stroke="#0a0c10" strokeWidth="2" />
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const x1 = 100 + Math.cos(a) * 78;
          const y1 = 100 + Math.sin(a) * 78;
          const x2 = 100 + Math.cos(a) * 94;
          const y2 = 100 + Math.sin(a) * 94;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#2a2f36"
              strokeWidth="3"
            />
          );
        })}
        <circle cx="100" cy="100" r="60" fill="url(#rim)" stroke="#3a4049" strokeWidth="2" />
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i * 72 - 90) * (Math.PI / 180);
          const x = 100 + Math.cos(a) * 38;
          const y = 100 + Math.sin(a) * 38;
          return (
            <g key={i}>
              <rect
                x={x - 6}
                y={y - 6}
                width="12"
                height="12"
                rx="3"
                fill="#2a2f36"
                transform={`rotate(${i * 72} ${x} ${y})`}
              />
            </g>
          );
        })}
        <circle cx="100" cy="100" r="14" fill="#1a1d22" stroke="#3a4049" strokeWidth="2" />
        <circle cx="100" cy="100" r="4" fill="#E11D2E" />
      </svg>
    </motion.div>
  );
}
