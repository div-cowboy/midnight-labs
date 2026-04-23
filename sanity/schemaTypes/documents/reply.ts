import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const reply = defineType({
  name: "reply",
  title: "Reply",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "thread",
      type: "reference",
      to: [{ type: "thread" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "workspace",
      type: "reference",
      to: [{ type: "engagement" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "authoredBy",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "upvotes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isOfficial",
      title: "Official answer",
      description: "Set when a Midnight staff member posts the reply.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "body",
      subtitle: "author.displayName",
    },
  },
});
