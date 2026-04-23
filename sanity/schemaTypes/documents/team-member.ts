import { defineArrayMember, defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "e.g. Engagement lead, Specialist — infra",
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "avatar",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alternative text" }),
      ],
    }),
    defineField({
      name: "tier",
      type: "string",
      options: {
        list: [
          { title: "Midnight lead", value: "lead" },
          { title: "Bench specialist", value: "bench" },
          { title: "Founder", value: "founder" },
        ],
        layout: "radio",
      },
      initialValue: "bench",
    }),
    defineField({
      name: "logos",
      title: "Past company logos",
      description: "Short labels shown as a résumé strip (e.g. Shopify, NASA).",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
