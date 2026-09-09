import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { TeamMember } from "@/types";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <Image
          src={member.avatar}
          alt=""
          width={88}
          height={88}
          className="rounded-full border border-rogue-blue/40 object-cover"
        />
        <div>
          <h3 className="font-display text-2xl text-white">{member.discordName}</h3>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-rogue-blue">{member.role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-rogue-muted">{member.description}</p>
      {member.socials.length ? (
        <ul className="mt-4 flex flex-wrap gap-3">
          {member.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-rogue-chrome hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
