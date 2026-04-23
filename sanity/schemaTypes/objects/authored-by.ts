import { defineField, defineType } from "sanity";

export const authoredBy = defineType({
  name: "authoredBy",
  title: "Authored by",
  type: "object",
  fields: [
    defineField({
      name: "clerkUserId",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "isMidnightStaff",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "displayName", subtitle: "email" },
  },
});
