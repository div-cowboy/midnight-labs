import { defineArrayMember, defineField, defineType } from "sanity";
import { RobotIcon } from "@sanity/icons";

export const agent = defineType({
  name: "agent",
  title: "Agent",
  type: "document",
  icon: RobotIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return "Required";
          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return "Slug must be lowercase with hyphens only";
          }
          return true;
        }),
    }),
    defineField({
      name: "tier",
      type: "string",
      options: {
        list: [
          { title: "Core (ships with Claude Code)", value: "core" },
          { title: "Advanced (Midnight library)", value: "advanced" },
          { title: "Custom (built for this engagement)", value: "custom" },
        ],
        layout: "radio",
      },
      initialValue: "advanced",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      description: "One-line pitch shown on the agent card.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      description: "2–4 sentence description used on the detail page.",
    }),
    defineField({
      name: "systemPrompt",
      title: "System prompt (body)",
      type: "text",
      rows: 12,
      description:
        "The agent body that ships in `.claude/agents/<slug>.md`. Markdown is fine.",
    }),
    defineField({
      name: "model",
      type: "string",
      options: {
        list: [
          { title: "Haiku 4.5", value: "haiku" },
          { title: "Sonnet 4.6", value: "sonnet" },
          { title: "Opus 4.7", value: "opus" },
        ],
        layout: "dropdown",
      },
      initialValue: "sonnet",
    }),
    defineField({
      name: "tools",
      description:
        "Tool names the agent is allowed to use (e.g. Read, Grep, Bash).",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "example",
      title: "Example invocation (display)",
      description: "Shown on the detail page to illustrate the agent in use.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "stats",
      title: "Subjective quality stats (1–5)",
      description: "Purely decorative; shown in the detail sidebar.",
      type: "object",
      fields: [
        defineField({
          name: "power",
          type: "number",
          validation: (rule) => rule.min(0).max(5),
          initialValue: 3,
        }),
        defineField({
          name: "speed",
          type: "number",
          validation: (rule) => rule.min(0).max(5),
          initialValue: 3,
        }),
        defineField({
          name: "depth",
          type: "number",
          validation: (rule) => rule.min(0).max(5),
          initialValue: 3,
        }),
      ],
    }),
    defineField({
      name: "author",
      description:
        "Display string — e.g. 'Anthropic', 'Midnight', 'Daniel Ibarra · Payments'.",
      type: "string",
    }),
    defineField({
      name: "relatedCourses",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "course" }] })],
    }),
    defineField({
      name: "workspace",
      title: "Workspace (Custom tier only)",
      description:
        "For Custom-tier agents, bind to the engagement whose team built it.",
      type: "reference",
      to: [{ type: "engagement" }],
      hidden: ({ parent }) => parent?.tier !== "custom",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tier" },
  },
});
