import { defineArrayMember, defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const thread = defineType({
  name: "thread",
  title: "Thread",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      type: "string",
      options: {
        list: [
          { title: "Question", value: "question" },
          { title: "Tip", value: "tip" },
        ],
        layout: "radio",
      },
      initialValue: "question",
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "author",
      type: "authoredBy",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "workspace",
      type: "reference",
      to: [{ type: "engagement" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "upvotes",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isPinned",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isResolved",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Newest",
      name: "newest",
      by: [
        { field: "isPinned", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author.displayName",
    },
  },
});
