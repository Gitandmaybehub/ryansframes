import type { GalleryPhoto, Sport } from "@/lib/types";

import basketballWP from "@/assets/gallery/basketball-whippany-park.jpg";
import lacrosseMorristown from "@/assets/gallery/lacrosse-morristown.jpg";
import baseballPitcher from "@/assets/gallery/baseball-whippany-pitcher.jpg";
import softballWP from "@/assets/gallery/softball-whippany-park.jpg";
import basketballMC from "@/assets/gallery/basketball-morris-catholic.jpg";
import lacrossePrinceton from "@/assets/gallery/lacrosse-princeton.jpg";
import baseballRunner from "@/assets/gallery/baseball-whippany-runner.jpg";
import soccerAction from "@/assets/gallery/soccer-action.jpg";

/**
 * The bundled starter gallery. These ship with the site and load instantly.
 * Once Sanity is connected, the site reads photos from the dashboard instead
 * (see src/lib/sanity.ts) — Ryan can add, remove, and reorder photos there.
 */
export const localPhotos: GalleryPhoto[] = [
  {
    id: "basketball-whippany-park",
    src: basketballWP,
    alt: "Whippany Park guard drives baseline past a defender during a varsity basketball game",
    caption: "Whippany Park",
    sport: "Basketball",
    width: basketballWP.width,
    height: basketballWP.height,
    blurDataURL: basketballWP.blurDataURL,
    featured: true,
  },
  {
    id: "lacrosse-morristown",
    src: lacrosseMorristown,
    alt: "Boys lacrosse players battle for a loose ball near the crease in golden evening light",
    caption: "Morristown",
    sport: "Lacrosse",
    width: lacrosseMorristown.width,
    height: lacrosseMorristown.height,
    blurDataURL: lacrosseMorristown.blurDataURL,
    featured: true,
  },
  {
    id: "baseball-whippany-pitcher",
    src: baseballPitcher,
    alt: "Whippany Park pitcher at the top of his windup with a high leg kick on the mound",
    caption: "Whippany Park",
    sport: "Baseball",
    width: baseballPitcher.width,
    height: baseballPitcher.height,
    blurDataURL: baseballPitcher.blurDataURL,
    featured: true,
  },
  {
    id: "softball-whippany-park",
    src: softballWP,
    alt: "Whippany Park softball player stands focused in the infield with her glove ready",
    caption: "Whippany Park",
    sport: "Softball",
    width: softballWP.width,
    height: softballWP.height,
    blurDataURL: softballWP.blurDataURL,
  },
  {
    id: "lacrosse-princeton",
    src: lacrossePrinceton,
    alt: "Princeton girls lacrosse attacker cradles the ball on the move toward the goal",
    caption: "Princeton",
    sport: "Lacrosse",
    width: lacrossePrinceton.width,
    height: lacrossePrinceton.height,
    blurDataURL: lacrossePrinceton.blurDataURL,
    featured: true,
  },
  {
    id: "basketball-morris-catholic",
    src: basketballMC,
    alt: "Morris Catholic point guard pushes the ball up the court in a high school basketball game",
    caption: "Morris Catholic",
    sport: "Basketball",
    width: basketballMC.width,
    height: basketballMC.height,
    blurDataURL: basketballMC.blurDataURL,
  },
  {
    id: "baseball-whippany-runner",
    src: baseballRunner,
    alt: "Whippany Park base runner takes a lead off the base through sunlit field haze",
    caption: "Whippany Park",
    sport: "Baseball",
    width: baseballRunner.width,
    height: baseballRunner.height,
    blurDataURL: baseballRunner.blurDataURL,
  },
  {
    id: "soccer-action",
    src: soccerAction,
    alt: "Boys soccer player dribbles the ball upfield on a rainy match day",
    caption: "Morris County",
    sport: "Soccer",
    width: soccerAction.width,
    height: soccerAction.height,
    blurDataURL: soccerAction.blurDataURL,
  },
];

/** Ordered list of sports present in a set of photos (for filter chips). */
export function sportsIn(photos: GalleryPhoto[]): Sport[] {
  const order: Sport[] = [
    "Basketball",
    "Baseball",
    "Lacrosse",
    "Soccer",
    "Softball",
    "Football",
    "Track",
    "Other",
  ];
  const present = new Set(photos.map((p) => p.sport));
  return order.filter((s) => present.has(s));
}
