"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl uppercase text-white">Something went wrong.</h1>
      <p className="mt-4 max-w-md text-rogue-muted">
        Rogue RP was unable to load this page.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">
          Return home
        </Button>
      </div>
    </div>
  );
}
