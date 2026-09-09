"use client";

import { Button } from "@/components/ui/Button";

export default function AdminErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl uppercase text-white">This page could not load.</h1>
      <p className="mt-4 max-w-md text-rogue-muted">
        The rest of the staff dashboard is still available. Try this page again or go back to the
        editor home.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/admin" variant="secondary" prefetch={false}>
          Dashboard
        </Button>
      </div>
    </div>
  );
}
