import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#09090b",
          backgroundImage:
            "radial-gradient(900px circle at 88% -10%, rgba(204,26,47,0.24), transparent 60%)",
          color: "#f5f5f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#ff5d6c",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{ width: 6, height: 26, background: "#cc1a2f" }}
          />
          Sports Photographer · Morris County, NJ
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 150,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Ryan Heiart
          </div>
          <div style={{ marginTop: 24, fontSize: 40, color: "#a7a7b0" }}>
            Capturing the moment — not just the photo.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#a7a7b0",
          }}
        >
          <div style={{ display: "flex" }}>@{SITE.instagram.handle}</div>
          <div style={{ display: "flex", color: "#8c8c97" }}>
            50+ events covered · Boys &amp; girls sports
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
