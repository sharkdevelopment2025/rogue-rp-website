"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@/components/server/ConnectButton";
import type { FiveMServerStatus } from "@/types";

export function PlayRogueButton() {
  const [status, setStatus] = useState<FiveMServerStatus | null>(null);

  useEffect(() => {
    fetch("/api/server/status")
      .then((response) => response.json())
      .then((data: FiveMServerStatus) => setStatus(data))
      .catch(() => setStatus(null));
  }, []);

  return <ConnectButton status={status} label="Play Rogue RP" />;
}
