import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const lesson = defineType({
  name: "lesson",
  title: "Lesson",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 8m 14s)",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      description:
        "Paste any YouTube / Vimeo / Mux playback URL. Hosting is deferred to V1.1.",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "duration" },
  },
});
