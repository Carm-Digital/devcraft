export const SOCIAL_LINKS = [
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "TikTok", href: "#", icon: "tiktok" },
  { name: "Twitter / X", href: "#", icon: "twitter" },
  { name: "Snapchat", href: "#", icon: "snapchat" },
] as const;

export type SocialIconId = (typeof SOCIAL_LINKS)[number]["icon"];

