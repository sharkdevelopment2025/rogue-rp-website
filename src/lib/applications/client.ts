import { getServerEnv, isApplicationApiConfigured } from "@/lib/env";
import type { ApplicationDetail, ApplicationStatus, ApplicationSummary, WhitelistStatus } from "@/types";

export interface ApplicationQuery {
  search?: string;
  status?: string;
  discordId?: string;
}

export interface ApplicationListResult {
  configured: boolean;
  items: ApplicationSummary[];
  message: string;
}

interface RemoteApplication {
  id?: string;
  reference?: string;
  type?: string;
  status?: string;
  submittedAt?: string;
  submitted_at?: string;
  stage?: string;
  interviewStatus?: string;
  interview_status?: string;
  decision?: string;
  notifications?: Array<{ id?: string; createdAt?: string; created_at?: string; message?: string }>;
}

function mapStatus(value: string | undefined): ApplicationStatus {
  const normalised = (value || "submitted").toLowerCase().replace(/\s+/g, "_");
  const allowed: ApplicationStatus[] = [
    "submitted",
    "under_review",
    "interview",
    "approved",
    "denied",
    "withdrawn",
  ];
  return allowed.includes(normalised as ApplicationStatus)
    ? (normalised as ApplicationStatus)
    : "submitted";
}

function mapSummary(item: RemoteApplication, index: number): ApplicationSummary {
  return {
    id: item.id || `unknown-${index}`,
    reference: item.reference || item.id || `RRP-${String(index + 1).padStart(6, "0")}`,
    type: item.type || "Whitelist Application",
    status: mapStatus(item.status),
    submittedAt: item.submittedAt || item.submitted_at || new Date().toISOString(),
    stage: item.stage || "Received",
    interviewStatus: item.interviewStatus || item.interview_status || null,
    decision: item.decision || null,
  };
}

async function applicationFetch(path: string, init?: RequestInit): Promise<Response | null> {
  const env = getServerEnv();
  if (!isApplicationApiConfigured()) {
    return null;
  }

  const response = await fetch(`${env.applicationApiUrl}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.applicationApiKey}`,
      ...(init?.headers ?? {}),
    },
  });

  return response;
}

export async function getApplications(query: ApplicationQuery = {}): Promise<ApplicationListResult> {
  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.status) params.set("status", query.status);
  if (query.discordId) params.set("discordId", query.discordId);
  const suffix = params.size ? `?${params.toString()}` : "";
  const response = await applicationFetch(`/applications${suffix}`);

  if (!response) {
    return {
      configured: false,
      items: [],
      message: "The Rogue RP applications bot is not connected yet.",
    };
  }

  if (!response.ok) {
    return {
      configured: true,
      items: [],
      message: "The applications service could not be reached.",
    };
  }

  const json = (await response.json()) as { items?: RemoteApplication[] } | RemoteApplication[];
  const items = Array.isArray(json) ? json : json.items || [];
  return {
    configured: true,
    items: items.map(mapSummary),
    message: items.length ? "Applications loaded." : "No applications found.",
  };
}

export async function getMyApplications(discordId: string): Promise<ApplicationListResult> {
  const response = await applicationFetch(`/applications/my`, {
    headers: { "X-Discord-Id": discordId },
  });

  if (!response) {
    return getApplications({ discordId });
  }

  if (!response.ok) {
    return {
      configured: true,
      items: [],
      message: "Your applications could not be loaded.",
    };
  }

  const json = (await response.json()) as { items?: RemoteApplication[] } | RemoteApplication[];
  const items = Array.isArray(json) ? json : json.items || [];
  return {
    configured: true,
    items: items.map(mapSummary),
    message: items.length ? "Applications loaded." : "You have no applications on file.",
  };
}

export async function getApplication(id: string, discordId?: string): Promise<ApplicationDetail | null> {
  const response = await applicationFetch(`/applications/${encodeURIComponent(id)}`, {
    headers: discordId ? { "X-Discord-Id": discordId } : undefined,
  });
  if (!response || !response.ok) {
    return null;
  }
  const json = (await response.json()) as RemoteApplication;
  const summary = mapSummary(json, 0);
  return {
    ...summary,
    notifications: (json.notifications || [])
      .map((item, index) => ({
        id: item.id || `note-${index}`,
        createdAt: item.createdAt || item.created_at || new Date().toISOString(),
        message: item.message || "",
      }))
      .filter((item) => item.message),
  };
}

export async function getWhitelistStatus(discordId: string): Promise<WhitelistStatus> {
  const response = await applicationFetch(
    `/whitelist/status?discordId=${encodeURIComponent(discordId)}`,
  );

  if (!response) {
    return {
      state: "none",
      updatedAt: null,
      configured: false,
      message: "Whitelist status will appear once the applications bot is connected.",
    };
  }

  if (!response.ok) {
    return {
      state: "none",
      updatedAt: null,
      configured: true,
      message: "Whitelist status could not be loaded.",
    };
  }

  const json = (await response.json()) as {
    state?: string;
    status?: string;
    updatedAt?: string;
    updated_at?: string;
    message?: string;
  };
  const raw = (json.state || json.status || "none").toLowerCase();
  const state =
    raw === "approved" || raw === "pending" || raw === "denied" || raw === "none"
      ? raw
      : "none";

  return {
    state,
    updatedAt: json.updatedAt || json.updated_at || null,
    configured: true,
    message:
      json.message ||
      (state === "approved"
        ? "You are currently whitelisted for Rogue RP."
        : state === "pending"
          ? "Your application is currently being reviewed."
          : state === "denied"
            ? "Your latest whitelist application was not approved."
            : "You do not have an active whitelist record."),
  };
}

export async function mutateApplication(
  id: string,
  action: "claim" | "approve" | "deny" | "interview" | "assign",
  payload: Record<string, string> = {},
): Promise<{ ok: boolean; message: string }> {
  const response = await applicationFetch(`/applications/${encodeURIComponent(id)}/${action}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response) {
    return { ok: false, message: "Applications bot is not connected." };
  }

  if (!response.ok) {
    return { ok: false, message: "The applications service rejected that action." };
  }

  return { ok: true, message: "Action sent to the applications bot." };
}
