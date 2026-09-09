"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@/components/server/ConnectButton";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Card } from "@/components/ui/Card";
import type { FiveMServerStatus } from "@/types";

export function ServerStatus({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<FiveMServerStatus | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/server/status")
      .then((response) => response.json())
      .then((data: FiveMServerStatus) => {
        if (active) {
          setStatus(data);
        }
      })
      .catch(() => {
        if (active) {
          setStatus({
            health: "error",
            name: "Rogue RP",
            players: 0,
            maxPlayers: 64,
            uptimeLabel: "Unknown",
            statusLabel: "Unavailable",
            lastChecked: new Date().toISOString(),
            connectUrl: "https://cfx.re/join/vqqd59q",
            message: "Rogue RP was unable to load server status.",
          });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  if (!status) {
    return (
      <Card className={compact ? "p-5" : undefined}>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-rogue-blue">
          Loading server...
        </p>
      </Card>
    );
  }

  const indicatorState =
    status.health === "online"
      ? "online"
      : status.health === "unconfigured"
        ? "unconfigured"
        : "offline";

  return (
    <Card className={compact ? "p-5" : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-rogue-muted">
            Live status
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase text-white">{status.name}</h2>
        </div>
        <StatusIndicator
          state={indicatorState}
          label={status.health === "online" ? "Online" : status.health === "unconfigured" ? "Not configured" : "Offline"}
        />
      </div>
      {status.health === "offline" ? (
        <p className="mt-4 text-rogue-muted">{status.message}</p>
      ) : (
        <dl className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs uppercase tracking-[0.16em]">
          <div>
            <dt className="text-rogue-muted">Players</dt>
            <dd className="mt-1 text-lg text-white">
              {status.players} / {status.maxPlayers}
            </dd>
          </div>
          <div>
            <dt className="text-rogue-muted">Server status</dt>
            <dd className="mt-1 text-lg text-white">{status.statusLabel}</dd>
          </div>
          <div>
            <dt className="text-rogue-muted">Uptime</dt>
            <dd className="mt-1 text-lg text-white">{status.uptimeLabel}</dd>
          </div>
          <div>
            <dt className="text-rogue-muted">Last checked</dt>
            <dd className="mt-1 text-lg text-white">
              {new Date(status.lastChecked).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>
          </div>
        </dl>
      )}
      <div className="mt-6">
        <ConnectButton status={status} />
      </div>
    </Card>
  );
}
