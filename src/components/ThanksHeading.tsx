"use client";

import { useSearchParams } from "next/navigation";

export function ThanksHeading() {
  const name = useSearchParams().get("name") ?? "";
  const first = name.replace(/[^\p{L}\s.'-]/gu, "").trim().slice(0, 40);
  return (
    <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
      {first ? `Thanks, ${first}.` : "Thanks."} We&apos;ve got your request.
    </h1>
  );
}
