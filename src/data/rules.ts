import type { RuleCategory } from "@/types";

export const rulesUpdatedAt = "2026-09-01";

export const rulesSeed: RuleCategory[] = [
  {
    id: "community",
    title: "Community Rules",
    summary: "How we treat each other outside the story.",
    items: [
      {
        id: "c1",
        title: "Respect is not optional",
        body: "Harassment, hate speech, bigotry and targeted abuse are not tolerated in Discord, on the server, or anywhere Rogue RP is represented.",
      },
      {
        id: "c2",
        title: "Keep out-of-character conflict out of character",
        body: "Disagreements happen. Take them to staff or a private conversation. Do not use in-character scenes to punish another player.",
      },
      {
        id: "c3",
        title: "No leaking or doxxing",
        body: "Do not share private information, unapproved recordings, or staff investigation details.",
      },
      {
        id: "c4",
        title: "Represent the community properly",
        body: "If you wear the Rogue RP name, you represent the server. Toxic public behaviour can be treated as a community offence.",
      },
    ],
  },
  {
    id: "server",
    title: "Server Rules",
    summary: "The operating standard for Rogue RP.",
    items: [
      {
        id: "s1",
        title: "Serious roleplay first",
        body: "Rogue RP is a serious roleplay environment. Random deathmatch, trolling, memeing in public scenes and breaking immersion without cause are not acceptable.",
      },
      {
        id: "s2",
        title: "Value your own life",
        body: "Characters should fear injury, arrest, loss and consequence. Do not treat the city as an arena.",
      },
      {
        id: "s3",
        title: "No exploiting",
        body: "Using bugs, unintended mechanics, duplicated items or third-party cheats will result in removal. Report issues to staff.",
      },
      {
        id: "s4",
        title: "Follow staff direction",
        body: "Staff may pause, move or close a scene when the server needs it. Arguing in public instead of using tickets wastes everyone's time.",
      },
    ],
  },
  {
    id: "roleplay",
    title: "Roleplay Rules",
    summary: "How stories are expected to be played.",
    items: [
      {
        id: "r1",
        title: "Stay in character in the city",
        body: "Use /ooc sparingly. If a scene is happening, do not collapse it with out-of-character chatter.",
      },
      {
        id: "r2",
        title: "No metagaming",
        body: "Information from Discord, streams, friends or spectator knowledge is not character knowledge unless earned in roleplay.",
      },
      {
        id: "r3",
        title: "No powergaming",
        body: "Do not force outcomes, skip other players' chance to react, or describe actions that remove agency.",
      },
      {
        id: "r4",
        title: "Give scenes room to breathe",
        body: "Not every encounter needs a gun, a chase or a speech. Ordinary roleplay is the point of a serious city.",
      },
    ],
  },
  {
    id: "combat",
    title: "Combat Rules",
    summary: "When violence happens, it must still be roleplay.",
    items: [
      {
        id: "x1",
        title: "Combat needs context",
        body: "Violence should come from an in-character reason. Initiation must be clear, fair and not used as a jump-scare for sport.",
      },
      {
        id: "x2",
        title: "No revenge after New Life",
        body: "If a character is downed or killed and returned under New Life rules, they do not remember the circumstances of that death.",
      },
      {
        id: "x3",
        title: "Do not camp hospitals or spawn areas",
        body: "Chasing injured players through medical scenes or spawn protection is prohibited.",
      },
    ],
  },
  {
    id: "vehicle",
    title: "Vehicle Rules",
    summary: "Driving is part of the world, not a stunt show.",
    items: [
      {
        id: "v1",
        title: "Drive like the city is real",
        body: "Reckless driving that exists only to crash, ram or grief is not serious roleplay.",
      },
      {
        id: "v2",
        title: "Pursuits must stay readable",
        body: "If you cannot reasonably continue a chase without destroying the scene, break it off. Staff may end unsafe pursuits.",
      },
      {
        id: "v3",
        title: "Respect emergency vehicles",
        body: "Do not ram marked units for entertainment. Yielding, blocking or fleeing should come from character choice, not ping.",
      },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Services Rules",
    summary: "Uniforms carry extra expectation.",
    items: [
      {
        id: "e1",
        title: "Play the job, not the costume",
        body: "Police, health and fire members are expected to follow departmental procedure and remain professional on scene.",
      },
      {
        id: "e2",
        title: "No corrupt-by-default characters",
        body: "Corruption, where permitted at all, is a written and approved story — not a shortcut to ignore the rules.",
      },
      {
        id: "e3",
        title: "Scene ownership",
        body: "The lead unit on scene should coordinate. Do not stack, shout over radio or take over another department's job.",
      },
    ],
  },
  {
    id: "criminal",
    title: "Criminal Rules",
    summary: "Crime is a story, not a loot loop.",
    items: [
      {
        id: "k1",
        title: "Crime needs a reason",
        body: "Robberies, hostage situations and organised crime should be planned, limited and respectful of other players' time.",
      },
      {
        id: "k2",
        title: "Fear roleplay still applies",
        body: "A weapon does not make you invincible. Hostages, bystanders and police response should matter.",
      },
      {
        id: "k3",
        title: "No targeting new players for sport",
        body: "Do not repeatedly prey on clearly new civilians. Build conflict that can actually be roleplayed.",
      },
    ],
  },
  {
    id: "staff",
    title: "Staff Rules",
    summary: "How staff are expected to operate.",
    items: [
      {
        id: "t1",
        title: "Staff are not above the story",
        body: "In-character, staff play characters. Out-of-character, staff serve the community, not their friends.",
      },
      {
        id: "t2",
        title: "Tickets stay private",
        body: "Reports, punishments and evidence are confidential. Do not discuss cases in public channels.",
      },
      {
        id: "t3",
        title: "No revenge moderation",
        body: "Staff must not handle reports they are personally involved in. Escalate instead.",
      },
    ],
  },
  {
    id: "discord",
    title: "Discord Rules",
    summary: "The community platform is part of Rogue RP.",
    items: [
      {
        id: "d1",
        title: "Use the right channels",
        body: "Support, applications, ban appeals and department talk belong in their channels. Do not ping staff for skipped queues.",
      },
      {
        id: "d2",
        title: "No advertising other servers",
        body: "Do not poach players or drop competing invites without management approval.",
      },
      {
        id: "d3",
        title: "Voice and text standards",
        body: "Soundboards, screaming, ear-rape and slurs are not a personality. You will be removed.",
      },
    ],
  },
];
