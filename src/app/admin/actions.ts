"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError, requireStaff } from "@/lib/auth/guards";
import { writeAuditLog } from "@/lib/repositories/audit";
import { saveNews, deleteNews, setNewsPublished } from "@/lib/repositories/news";
import { deleteTeamMember, getTeamMember, saveTeamMember } from "@/lib/repositories/team";
import { normalizeStaffGroup } from "@/data/team";
import { saveDepartment } from "@/lib/repositories/departments";
import { saveSettings } from "@/lib/repositories/settings";
import { setUserAccess } from "@/lib/repositories/users";
import { listAllMedia, saveMediaItem, deleteMediaItem } from "@/lib/repositories/media";
import { saveRules } from "@/lib/repositories/rules";
import { saveFaq } from "@/lib/repositories/faq";
import { listRules } from "@/lib/repositories/rules";
import { listFaq } from "@/lib/repositories/faq";
import { savePublicUpload } from "@/lib/uploads";
import type { MediaKind, NewsCategory, WebsiteAccess } from "@/types";

async function audit(action: string, target: string, detail: string) {
  const staff = await requireStaff("content");
  await writeAuditLog({
    actorDiscordId: staff.user.discordId,
    actorName: staff.user.username,
    action,
    target,
    detail,
  });
}

export async function saveNewsAction(formData: FormData) {
  const staff = await requireStaff("content");
  const uploaded = await savePublicUpload(formData.get("featuredFile"));
  const featuredImage =
    uploaded || String(formData.get("featuredImage") || "").trim() || "/logo.jpg";
  const article = await saveNews({
    id: String(formData.get("id") || "") || undefined,
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    category: String(formData.get("category") || "Announcement") as NewsCategory,
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    author: String(formData.get("author") || staff.user.username),
    featuredImage,
    published: formData.get("published") === "on",
    scheduledFor: String(formData.get("scheduledFor") || "") || null,
    slug: String(formData.get("slug") || "") || undefined,
  });
  await writeAuditLog({
    actorDiscordId: staff.user.discordId,
    actorName: staff.user.username,
    action: "news.save",
    target: article.id,
    detail: article.title,
  });
  revalidatePath("/news");
  revalidatePath("/admin/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNewsAction(id: string) {
  await requireStaff("content");
  await deleteNews(id);
  await audit("news.delete", id, "Article removed");
  revalidatePath("/news");
  revalidatePath("/admin/news");
}

export async function publishNewsAction(id: string, published: boolean) {
  await requireStaff("content");
  await setNewsPublished(id, published);
  await audit(published ? "news.publish" : "news.unpublish", id, "");
  revalidatePath("/news");
  revalidatePath("/admin/news");
}

export async function saveTeamAction(formData: FormData) {
  await requireStaff("content");
  const id = String(formData.get("id") || crypto.randomUUID());
  const existing = await getTeamMember(id);
  const uploaded = await savePublicUpload(formData.get("avatarFile"));
  const member = await saveTeamMember({
    id,
    discordName: String(formData.get("discordName") || "").trim(),
    role: String(formData.get("role") || "").trim(),
    group: normalizeStaffGroup(String(formData.get("group") || "Admin")),
    avatar: uploaded || String(formData.get("avatar") || "").trim() || existing?.avatar || "/logo.jpg",
    description: String(formData.get("description") || "").trim(),
    socials: existing?.socials ?? [],
    order: Number(formData.get("order") || existing?.order || 99),
  });
  await audit("team.save", member.id, member.discordName);
  revalidatePath("/staff");
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function deleteTeamAction(id: string) {
  await requireStaff("content");
  await deleteTeamMember(id);
  await audit("team.delete", id, "");
  revalidatePath("/staff");
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function saveDepartmentAction(formData: FormData) {
  await requireStaff("content");
  const uploaded = await savePublicUpload(formData.get("logoFile"));
  await saveDepartment({
    id: String(formData.get("id")),
    slug: String(formData.get("slug")),
    name: String(formData.get("name")),
    shortName: String(formData.get("shortName")),
    tagline: String(formData.get("tagline")),
    description: String(formData.get("description")),
    colour: String(formData.get("colour")),
    logo: uploaded || String(formData.get("logo") || "").trim() || "/logo.jpg",
    requirements: String(formData.get("requirements") || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    leadership: [
      {
        title: String(formData.get("leadTitle") || "Command"),
        name: String(formData.get("leadName") || "Assigned"),
      },
    ],
    statistics: [
      { label: "Application", value: String(formData.get("applicationValue") || "Required") },
    ],
    applicationType: String(formData.get("applicationType") || "Department"),
  });
  await audit("department.save", String(formData.get("id")), String(formData.get("name")));
  revalidatePath("/departments");
  revalidatePath("/admin/departments");
}

export async function saveSettingsAction(formData: FormData) {
  await requireStaff("settings");
  await saveSettings({
    discordInvite: String(formData.get("discordInvite") || ""),
    serverDisplayName: String(formData.get("serverDisplayName") || "Rogue RP"),
    maxPlayers: Number(formData.get("maxPlayers") || 128),
    maintenanceMessage: String(formData.get("maintenanceMessage") || ""),
  });
  await audit("settings.save", "site", "Settings updated");
  revalidatePath("/");
}

export async function setAccessAction(discordId: string, access: WebsiteAccess) {
  const staff = await requireStaff("users");
  if (staff.user.discordId === discordId) {
    throw new AuthError("You cannot suspend your own access.", "forbidden");
  }
  await setUserAccess(discordId, access);
  await writeAuditLog({
    actorDiscordId: staff.user.discordId,
    actorName: staff.user.username,
    action: access === "suspended" ? "user.suspend" : "user.restore",
    target: discordId,
    detail: access,
  });
  revalidatePath("/admin/users");
}

export async function saveMediaAction(formData: FormData) {
  await requireStaff("content");
  const id = String(formData.get("id") || crypto.randomUUID());
  const existing = (await listAllMedia()).find((item) => item.id === id);
  const uploaded = await savePublicUpload(formData.get("file"));
  const src = uploaded || String(formData.get("src") || "").trim() || existing?.src || "";
  if (!src) {
    throw new Error("Add an image file or an image path.");
  }
  await saveMediaItem({
    id,
    title: String(formData.get("title") || "").trim(),
    kind: String(formData.get("kind") || "screenshot") as MediaKind,
    src,
    href: String(formData.get("href") || "") || undefined,
    published: formData.get("published") === "on",
  });
  await audit("media.save", id, String(formData.get("title") || ""));
  revalidatePath("/media");
  revalidatePath("/admin/media");
}

export async function deleteMediaAction(id: string) {
  await requireStaff("content");
  await deleteMediaItem(id);
  await audit("media.delete", id, "");
  revalidatePath("/media");
  revalidatePath("/admin/media");
}

export async function saveRuleItemAction(formData: FormData) {
  await requireStaff("content");
  const { categories } = await listRules();
  const categoryId = String(formData.get("categoryId"));
  const itemId = String(formData.get("itemId") || "");
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "").trim();
  const next = categories.map((category) => {
    if (category.id !== categoryId) {
      return category;
    }
    if (itemId) {
      return {
        ...category,
        items: category.items.map((item) =>
          item.id === itemId ? { ...item, title, body } : item,
        ),
      };
    }
    return {
      ...category,
      items: [...category.items, { id: crypto.randomUUID(), title, body }],
    };
  });
  await saveRules(next);
  await audit(itemId ? "rules.update" : "rules.add", categoryId, title);
  revalidatePath("/rules");
  revalidatePath("/admin/rules");
}

export async function deleteRuleItemAction(categoryId: string, itemId: string) {
  await requireStaff("content");
  const { categories } = await listRules();
  await saveRules(
    categories.map((category) =>
      category.id === categoryId
        ? { ...category, items: category.items.filter((item) => item.id !== itemId) }
        : category,
    ),
  );
  await audit("rules.delete", itemId, categoryId);
  revalidatePath("/rules");
  revalidatePath("/admin/rules");
}

export async function saveFaqItemAction(formData: FormData) {
  await requireStaff("content");
  const categories = await listFaq();
  const categoryId = String(formData.get("categoryId"));
  const itemId = String(formData.get("itemId") || "");
  const question = String(formData.get("question") || "").trim();
  const answer = String(formData.get("answer") || "").trim();
  const next = categories.map((category) => {
    if (category.id !== categoryId) {
      return category;
    }
    if (itemId) {
      return {
        ...category,
        items: category.items.map((item) =>
          item.id === itemId ? { ...item, question, answer } : item,
        ),
      };
    }
    return {
      ...category,
      items: [...category.items, { id: crypto.randomUUID(), question, answer }],
    };
  });
  await saveFaq(next);
  await audit(itemId ? "faq.update" : "faq.add", categoryId, question);
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
}

export async function deleteFaqItemAction(categoryId: string, itemId: string) {
  await requireStaff("content");
  const categories = await listFaq();
  await saveFaq(
    categories.map((category) =>
      category.id === categoryId
        ? { ...category, items: category.items.filter((item) => item.id !== itemId) }
        : category,
    ),
  );
  await audit("faq.delete", itemId, categoryId);
  revalidatePath("/faq");
  revalidatePath("/admin/faq");
}
