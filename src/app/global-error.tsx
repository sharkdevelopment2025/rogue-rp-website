"use client";

import { Button } from "@/components/ui/Button";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen items-center justify-center bg-[#05070b] text-white">
        <div className="px-6 text-center">
          <h1 className="text-4xl uppercase">Something went wrong.</h1>
          <p className="mt-4 text-slate-400">Rogue RP was unable to load this page.</p>
          <div className="mt-8">
            <Button onClick={reset}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
