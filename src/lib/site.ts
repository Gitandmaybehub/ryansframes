/**
 * Central site configuration.
 *
 * 👉 Ryan / editor: everything you'd want to change without touching design code
 *    lives here. Items marked TODO are placeholders to fill in before launch.
 */

export const SITE = {
  name: "Ryan Heiart",
  role: "Sports Photographer",
  tagline: "Capturing the moment, not just the photo.",
  location: "Hanover, New Jersey",
  region: "Morris County, NJ",

  // TODO: change to your real domain once it's connected on Vercel.
  url: "https://www.ryansframes.com",

  description:
    "Ryan Heiart is a Morris County, New Jersey sports photographer capturing the beauty, triumph, and raw emotion of high school athletics — from Whippany Park to clients across New Jersey.",

  // ---- Contact -------------------------------------------------------------
  instagram: {
    handle: "ryansframes",
    url: "https://www.instagram.com/ryansframes/",
  },

  phone: {
    display: "(973) 828-5706",
    e164: "+19738285706",
  },

  // No public email by request (Ryan is a minor). Leave null to hide email UI.
  email: null as string | null,

  // ---- Numbers shown around the site --------------------------------------
  stats: [
    { value: "50+", label: "Events covered" },
    { value: "Boys & Girls", label: "Every sport" },
    { value: "Morris County", label: "& beyond" },
  ],

  // ---- Navigation (each item is its own page/route) ------------------------
  nav: [
    { label: "Home", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof SITE;
