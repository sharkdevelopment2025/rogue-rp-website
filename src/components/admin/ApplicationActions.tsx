"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ApplicationActions({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [reviewer, setReviewer] = useState("");

  async function run(action: string, payload: Record<string, string> = {}) {
    setMessage("");
    const response = await fetch(`/api/applications/${id}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await response.json()) as { message?: string; error?: string };
    setMessage(json.message || json.error || "Done.");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => run("claim")}>Claim</Button>
        <Button variant="secondary" onClick={() => run("interview")}>
          Request interview
        </Button>
        <Button variant="secondary" onClick={() => run("approve")}>
          Approve
        </Button>
        <Button variant="danger" onClick={() => run("deny")}>
          Deny
        </Button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={reviewer}
          onChange={(event) => setReviewer(event.target.value)}
          placeholder="Reviewer Discord ID"
          className="min-h-11 flex-1 border border-white/10 bg-black/40 px-3 text-sm text-white"
        />
        <Button variant="ghost" onClick={() => run("assign", { reviewerId: reviewer })}>
          Assign reviewer
        </Button>
      </div>
      {message ? <p className="text-sm text-rogue-chrome">{message}</p> : null}
    </div>
  );
}
