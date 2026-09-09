export type NewsCategory =
  | "Server Update"
  | "Department Update"
  | "Community News"
  | "Development Update"
  | "Event"
  | "Announcement";

export type WhitelistState = "none" | "pending" | "approved" | "denied";

export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "interview"
  | "approved"
  | "denied"
  | "withdrawn";

export type WebsiteAccess = "active" | "suspended";

export type MediaKind = "screenshot" | "video" | "event" | "community" | "trailer";

export interface SessionUser {
  discordId: string;
  username: string;
  globalName: string | null;
  discriminator: string;
  avatar: string | null;
  issuedAt: number;
  lastLogin: number;
  staffKey?: boolean;
}

export interface StoredUser extends SessionUser {
  guildMember: boolean;
  roleIds: string[];
  websiteAccess: WebsiteAccess;
  createdAt: string;
  lastLoginAt: string;
}

export interface PublicUser {
  discordId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface ApplicationSummary {
  id: string;
  reference: string;
  type: string;
  status: ApplicationStatus;
  submittedAt: string;
  stage: string;
  interviewStatus: string | null;
  decision: string | null;
}

export interface ApplicationDetail extends ApplicationSummary {
  notifications: Array<{
    id: string;
    createdAt: string;
    message: string;
  }>;
}

export interface WhitelistStatus {
  state: WhitelistState;
  updatedAt: string | null;
  message: string;
  configured: boolean;
}

export type ServerHealth = "online" | "offline" | "unconfigured" | "error";

export interface FiveMServerStatus {
  health: ServerHealth;
  name: string;
  players: number;
  maxPlayers: number;
  uptimeLabel: string;
  statusLabel: string;
  lastChecked: string;
  connectUrl: string | null;
  message: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: NewsCategory;
  tags: string[];
  author: string;
  featuredImage: string | null;
  published: boolean;
  scheduledFor: string | null;
  publishedAt: string;
  updatedAt: string;
}

export interface DepartmentLeadership {
  title: string;
  name: string;
}

export interface DepartmentRecord {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  colour: string;
  logo: string;
  requirements: string[];
  leadership: DepartmentLeadership[];
  statistics: Array<{ label: string; value: string }>;
  applicationType: string;
}

export type StaffGroup =
  | "Owner"
  | "Co Owner"
  | "Senior Admin"
  | "Admin"
  | "Moderator";

export interface TeamMember {
  id: string;
  discordName: string;
  role: string;
  group: StaffGroup;
  avatar: string;
  description: string;
  socials: Array<{ label: string; href: string }>;
  order: number;
}

export interface RuleItem {
  id: string;
  title: string;
  body: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  summary: string;
  items: RuleItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export interface MediaItem {
  id: string;
  title: string;
  kind: MediaKind;
  src: string;
  poster?: string;
  href?: string;
  published: boolean;
}

export interface SiteSettings {
  discordInvite: string;
  serverDisplayName: string;
  maxPlayers: number;
  maintenanceMessage: string;
}

export interface AuditLogEntry {
  id: string;
  createdAt: string;
  actorDiscordId: string;
  actorName: string;
  action: string;
  target: string;
  detail: string;
}
