import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentVideoIcon } from "@sanity/icons";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "track",
      type: "reference",
      to: [{ type: "track" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "accentColor",
      title: "Accent color",
      description: "Optional hex used for gradient thumbnails.",
      type: "string",
    }),
    defineField({
      name: "instructor",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "body",
      title: "Long description",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "lessons",
      type: "array",
      of: [defineArrayMember({ type: "lesson" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first within a track.",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "title", track: "track.title" },
    prepare({ title, track }) {
      return { title, subtitle: track };
    },
  },
});
