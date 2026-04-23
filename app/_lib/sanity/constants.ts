export const THREAD_KINDS = ["question", "tip"] as const;
export type ThreadKind = (typeof THREAD_KINDS)[number];

export const UPVOTE_TARGETS = ["thread", "reply"] as const;
export type UpvoteTarget = (typeof UPVOTE_TARGETS)[number];

export const AGENT_TIERS = ["core", "advanced", "custom"] as const;
export type AgentTier = (typeof AGENT_TIERS)[number];
