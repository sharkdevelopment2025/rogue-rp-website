"use client";

import { useEffect, useState } from "react";

export function PlayerCount() {
  const [label, setLabel] = useState("Players —");

  useEffect(() => {
    fetch("/api/server/status")
      .then((response) => response.json())
      .then((data: { health: string; players: number; maxPlayers: number }) => {
        if (data.health === "online") {
          setLabel(`${data.players} / ${data.maxPlayers}`);
          return;
        }
        setLabel(data.health === "unconfigured" ? "Not configured" : "Offline");
      })
      .catch(() => setLabel("Unavailable"));
  }, []);

  return <span className="font-mono text-xs uppercase tracking-[0.18em] text-rogue-chrome">{label}</span>;
}
