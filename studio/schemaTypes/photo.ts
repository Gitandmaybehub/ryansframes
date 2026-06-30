import { defineField, defineType } from "sanity";

/**
 * A single gallery photo. This is everything Ryan fills in when he adds a shot.
 * The website reads these fields directly (see ../../src/lib/sanity.ts).
 */
export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Describe the photo",
      type: "string",
      description:
        "A short description for accessibility & Google, e.g. “Whippany Park guard drives baseline past a defender.”",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "sport",
      title: "Sport",
      type: "string",
      options: {
        list: [
          { title: "Basketball", value: "Basketball" },
          { title: "Baseball", value: "Baseball" },
          { title: "Lacrosse", value: "Lacrosse" },
          { title: "Soccer", value: "Soccer" },
          { title: "Softball", value: "Softball" },
          { title: "Football", value: "Football" },
          { title: "Hockey", value: "Hockey" },
          { title: "Wrestling", value: "Wrestling" },
          { title: "Track", value: "Track" },
          { title: "Other", value: "Other" },
        ],
      },
      initialValue: "Basketball",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Team or place (optional)",
      type: "string",
      description:
        "Shown on the photo, e.g. “Whippany Park”, “Morristown”, or “Princeton.”",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark a few of your very best shots.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order (optional)",
      type: "number",
      description:
        "Lower numbers show first. Leave blank and your newest photos show first automatically.",
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "sport", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || subtitle || "Photo", subtitle, media };
    },
  },
});
