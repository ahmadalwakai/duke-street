"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  index?: number;
  className?: string;
  style?: CSSProperties;
  /** Optional inline style helpers so parents can keep flex layout. */
  flexShrink?: number;
  flex?: string | number;
  width?: string;
};

export function FadeUp({
  children,
  delay = 0,
  index = 0,
  className,
  style,
  flexShrink,
  flex,
  width,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const computed = delay + index * 0.06;

  useEffect(() => {
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    // Safety: ensure content is shown even if observer never fires (e.g. above-the-fold race).
    const fallback = window.setTimeout(() => setVisible(true), 250);
    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduce]);

  const merged: CSSProperties = {
    ...(flexShrink !== undefined ? { flexShrink } : null),
    ...(flex !== undefined ? { flex } : null),
    ...(width !== undefined ? { width } : null),
    ...style,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={merged}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease: "easeOut", delay: computed }}
    >
      {children}
    </motion.div>
  );
}
