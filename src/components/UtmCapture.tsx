"use client";

import { useEffect } from "react";

export const ATTRIBUTION_KEY = "pd_attribution";

export type Attribution = {
  utm: { source: string; medium: string; campaign: string; term: string; content: string };
  landing: string;
  referrer: string;
};

/** Remembers where the visitor first came from (first touch, this tab only). */
export function UtmCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
      const p = new URLSearchParams(window.location.search);
      const data: Attribution = {
        utm: {
          source: p.get("utm_source") ?? "",
          medium: p.get("utm_medium") ?? "",
          campaign: p.get("utm_campaign") ?? "",
          term: p.get("utm_term") ?? "",
          content: p.get("utm_content") ?? "",
        },
        landing: window.location.pathname,
        referrer: document.referrer ? new URL(document.referrer).hostname : "",
      };
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
    } catch {
      /* storage blocked: attribution is optional */
    }
  }, []);
  return null;
}

export function readAttribution(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
