import type { FaqCategory } from "@/types";

export const faqSeed: FaqCategory[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        id: "g1",
        question: "What is Rogue RP?",
        answer:
          "Rogue RP is a serious British FiveM roleplay community. The focus is immersive, realistic and player-driven stories rather than arcade chaos.",
      },
      {
        id: "g2",
        question: "Where is the server based?",
        answer:
          "Rogue RP is a United Kingdom community. Peak hours generally follow UK evenings, but players from elsewhere are welcome if they can meet the standard.",
      },
      {
        id: "g3",
        question: "Is this a whitelist server?",
        answer:
          "Yes. Rogue RP uses a whitelist process so that players joining the city understand the standard before they arrive.",
      },
      {
        id: "g4",
        question: "Who is on the staff team?",
        answer:
          "Appointed staff are listed on the Staff page. Those ranks are out of character. Do not treat staff as in-character authority unless they are also in a department role.",
      },
    ],
  },
  {
    id: "whitelist",
    title: "Whitelist",
    items: [
      {
        id: "w1",
        question: "How do I get whitelisted?",
        answer:
          "Create a website account with Discord, read the rules, then submit a whitelist application. Applications are reviewed by staff through the Rogue RP applications system.",
      },
      {
        id: "w2",
        question: "How long does a whitelist take?",
        answer:
          "Times vary with staff availability and the quality of the application. Check your dashboard for the live status rather than asking in public chats.",
      },
      {
        id: "w3",
        question: "What if I am denied?",
        answer:
          "A denial is not always permanent. Read the decision, fix the issues, and wait for any cooldown before applying again.",
      },
    ],
  },
  {
    id: "fivem",
    title: "FiveM",
    items: [
      {
        id: "f1",
        question: "What do I need to play?",
        answer:
          "A legal copy of Grand Theft Auto V, the FiveM client, and a Discord account. Additional server requirements are listed on the Server page.",
      },
      {
        id: "f2",
        question: "How do I connect?",
        answer:
          "Use Play Rogue RP or Connect to Rogue RP when the status panel shows online. That opens the FiveM join link (cfx.re/join/vqqd59q). You can also connect through play.rogueroleplay.co.uk. If the panel shows offline, wait until the city is available.",
      },
    ],
  },
  {
    id: "rules",
    title: "Rules",
    items: [
      {
        id: "u1",
        question: "Do I need to know every rule before applying?",
        answer:
          "You need to understand the standard. Nobody expects you to recite every line, but 'I did not read the rules' is not a defence.",
      },
      {
        id: "u2",
        question: "Can staff ignore rules in character?",
        answer:
          "No. Staff characters still follow server rules. Staff powers are out-of-character tools, not in-character rank.",
      },
    ],
  },
  {
    id: "departments",
    title: "Departments",
    items: [
      {
        id: "p1",
        question: "Can I join police, health or fire immediately?",
        answer:
          "No. Get whitelisted, settle into the city, then apply for a department. Each department has its own standard and training.",
      },
      {
        id: "p2",
        question: "Can I be in more than one emergency service?",
        answer:
          "That is a departmental policy decision. Assume no until command says otherwise.",
      },
    ],
  },
  {
    id: "applications",
    title: "Applications",
    items: [
      {
        id: "a1",
        question: "Where are applications handled?",
        answer:
          "Rogue RP uses its Discord applications bot as the source of truth. This website reads and displays that system. It does not replace it.",
      },
      {
        id: "a2",
        question: "Can I edit an application after sending it?",
        answer:
          "Once submitted, wait for staff. If they request more information, you will see that on your application page or in Discord.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical",
    items: [
      {
        id: "t1",
        question: "The website cannot see the server status.",
        answer:
          "Server status is read from the FiveM endpoints configured by staff. If those are not set, the site will say so instead of inventing a player count.",
      },
      {
        id: "t2",
        question: "I am stuck on login.",
        answer:
          "Discord OAuth must be configured with the correct redirect URL. If that is missing, staff need to finish the website Discord application setup.",
      },
    ],
  },
  {
    id: "discord",
    title: "Discord",
    items: [
      {
        id: "c1",
        question: "Do I have to join Discord?",
        answer:
          "Yes. Join at discord.gg/roguerp. Discord is how Rogue RP handles support, applications, departments and announcements.",
      },
      {
        id: "c2",
        question: "Where do I get support?",
        answer:
          "Use the Discord support channels or the Contact page, which points you to the correct place without publishing private staff inboxes.",
      },
    ],
  },
];
