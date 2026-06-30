import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: crimson "RH" monogram on near-black.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          color: "#ff5d6c",
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: "sans-serif",
          borderRadius: 7,
        }}
      >
        RH
      </div>
    ),
    { ...size }
  );
}
