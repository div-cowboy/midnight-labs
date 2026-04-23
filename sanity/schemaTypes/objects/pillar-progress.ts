import { defineArrayMember, defineField, defineType } from "sanity";

export const pillarProgress = defineType({
  name: "pillarProgress",
  title: "Pillar progress",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      options: {
        list: [
          { title: "The Audit Protocol", value: "The Audit Protocol" },
          { title: "The Tooling Protocol", value: "The Tooling Protocol" },
          { title: "The Practice Protocol", value: "The Practice Protocol" },
          { title: "The Scale Protocol", value: "The Scale Protocol" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Active", value: "active" },
          { title: "Done", value: "done" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "deliverables",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "done", type: "boolean", initialValue: false }),
            defineField({
              name: "due",
              title: "Due label (e.g. Day 6, Apr 30)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "name", done: "done" },
            prepare({ title, done }) {
              return { title, subtitle: done ? "Done" : "Pending" };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "status" },
  },
});
