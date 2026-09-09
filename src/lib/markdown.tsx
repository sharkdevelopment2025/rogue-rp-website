import type { ReactNode } from "react";

export function renderMarkdown(source: string): ReactNode[] {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) {
      return null;
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={index} className="font-display text-2xl font-semibold text-white">
          {inline(trimmed.slice(4))}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={index} className="font-display text-3xl font-semibold text-white">
          {inline(trimmed.slice(3))}
        </h2>
      );
    }
    if (trimmed.startsWith("# ")) {
      return (
        <h1 key={index} className="font-display text-4xl font-semibold text-white">
          {inline(trimmed.slice(2))}
        </h1>
      );
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((line) => line.startsWith("- "));
      return (
        <ul key={index} className="list-disc space-y-2 pl-5 text-rogue-muted">
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{inline(item.slice(2))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={index} className="text-base leading-8 text-rogue-muted">
        {inline(trimmed)}
      </p>
    );
  });
}

function inline(value: string): ReactNode {
  const parts = value.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2].startsWith("http") || link[2].startsWith("/") ? link[2] : "#";
      return (
        <a key={index} href={href} className="text-rogue-blue underline-offset-4 hover:underline">
          {link[1]}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
