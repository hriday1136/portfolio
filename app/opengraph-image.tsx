import { ImageResponse } from "next/og";

export const alt = "Hriday Adani — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070D",
          color: "#F4F6F8",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: "0.28em",
            color: "#8993A4",
            textTransform: "uppercase",
          }}
        >
          01 / System Online
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            Hriday
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            Adani
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#8993A4",
          }}
        >
          Software Engineer · AI Systems · Research
        </div>
      </div>
    ),
    { ...size },
  );
}
