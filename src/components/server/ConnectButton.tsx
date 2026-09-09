"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { FiveMServerStatus } from "@/types";

export function ConnectButton({
  status,
  label = "Connect to Rogue RP",
}: {
  status?: FiveMServerStatus | null;
  label?: string;
}) {
  const [message, setMessage] = useState("");

  if (!status || status.health === "unconfigured") {
    return (
      <Button disabled variant="secondary">
        {label}
      </Button>
    );
  }

  if (status.health !== "online" || !status.connectUrl) {
    return (
      <div>
        <Button
          variant="secondary"
          onClick={() => setMessage("Rogue RP is currently unavailable.")}
        >
          {label}
        </Button>
        {message ? <p className="mt-3 text-sm text-rogue-danger">{message}</p> : null}
      </div>
    );
  }

  return (
    <Button href={status.connectUrl} external>
      {label}
    </Button>
  );
}
