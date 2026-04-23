import { defineArrayMember, defineField, defineType } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const engagement = defineType({
  name: "engagement",
  title: "Engagement",
  type: "document",
  icon: RocketIcon,
  description: "One per client workspace. Powers the Engagement home page.",
  fields: [
    defineField({
      name: "client",
      title: "Client company name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Workspace slug",
      description:
        "Used to scope content to a workspace (e.g. custom agents, community threads).",
      type: "slug",
      options: { source: "client" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      type: "string",
      description: "Short line shown on the engagement home (e.g. \"Day 8 of 60\")",
    }),
    defineField({
      name: "startDate",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      type: "date",
      validation: (rule) =>
        rule.required().custom((endDate, context) => {
          const startDate = (context.document as { startDate?: string } | undefined)
            ?.startDate;
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            return "End date must be after start date";
          }
          return true;
        }),
    }),
    defineField({
      name: "currentDay",
      title: "Current day (1-indexed)",
      description:
        "Midnight staff ticks this forward manually. Automated telemetry comes later.",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "lead",
      title: "Engagement lead",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "bench",
      title: "Bench on this engagement",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "teamMember" }] })],
    }),
    defineField({
      name: "pillars",
      type: "array",
      of: [defineArrayMember({ type: "pillarProgress" })],
      description:
        "The four pillars, in order: Audit → Tooling → Practice → Scale.",
    }),
    defineField({
      name: "pinnedCourses",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "course" }] })],
    }),
    defineField({
      name: "pinnedArticles",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })],
    }),
    defineField({
      name: "slackChannel",
      title: "Slack channel (display)",
      type: "string",
      description: "e.g. #acme-midnight — just for display in the portal.",
    }),
  ],
  preview: {
    select: { title: "client", subtitle: "headline" },
  },
});
