import React from "react";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// SVG assets (có thể là string path hoặc React component tùy bundler)
import PlanetSvgComponent from "../../assets/404/planet.svg";
import AstronautSvgComponent from "../../assets/404/astronaut.svg";
import particlesImg from "../../assets/404/particles.png";

type CSSObj = React.CSSProperties;

/* keyframes chèn trực tiếp vào DOM để tránh lỗi TypeScript */
const keyframesCss = `
@keyframes stars {
  0% { background-position: -100% 100%; }
  100% { background-position: 0 0; }
}
@keyframes spinAround {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

/* style inline đảm bảo hoạt động ngay cả khi Tailwind chưa load */
const containerStyle: CSSObj = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "#25344C",
  color: "#fff",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const starsWrapperStyle: CSSObj = {
  position: "absolute",
  inset: 0,
  animation: "stars 12s linear infinite alternate",
  backgroundImage: `url("${particlesImg}")`,
  backgroundSize: "contain",
  backgroundRepeat: "repeat",
  backgroundPosition: "center",
  // dark overlay to better match original look:
  backgroundBlendMode: "overlay",
};

const contentStyle: CSSObj = {
  position: "relative",
  zIndex: 10,
  width: "100%",
  maxWidth: 900,
  textAlign: "center",
  padding: "20px",
  boxSizing: "border-box",
};

const titleStyle: CSSObj = {
  fontSize: 100,
  fontWeight: 800,
  lineHeight: 1,
  margin: 0,
};

const subtitleStyle: CSSObj = {
  fontSize: 16,
  lineHeight: "25px",
  fontWeight: 400,
  maxWidth: 350,
  margin: "8px auto 0",
  color: "#dbeafe", // subtle light color
};

const sceneWrapperStyle: CSSObj = {
  width: 390,
  height: 390,
  margin: "32px auto",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const astronautStyleBase: CSSObj = {
  width: 50,
  height: 50,
  position: "absolute",
  top: 20,
  right: 25,
  animation: "spinAround 5s linear 0s infinite",
};

const planetStyleBase: CSSObj = {
  width: "100%",
  height: "100%",
  display: "block",
};

/* casting to any để runtime kiểm tra typeof import */
const PlanetImported: any = PlanetSvgComponent;
const AstronautImported: any = AstronautSvgComponent;

const NotFound: React.FC = () => {
  return (
    <div style={containerStyle}>
      <style>{keyframesCss}</style>

      {/* stars background */}
      <div style={starsWrapperStyle} />

      <div style={contentStyle}>
        <h1 style={titleStyle}>404</h1>

        <div style={subtitleStyle}>
          <div style={{ fontWeight: 600 }}>LOST IN SPACE</div>
          <div>Hmm, looks like that page doesn't exist.</div>
        </div>

        <div style={sceneWrapperStyle}>
          {/* Astronaut: nếu là path -> img, nếu là component -> tạo element với props style */}
          {typeof AstronautImported === "string" ? (
            <img
              src={AstronautImported}
              alt=""
              aria-hidden
              style={astronautStyleBase}
            />
          ) : (
            // React.createElement tránh lỗi typing khi import SVG component khác nhau
            React.createElement(AstronautImported as any, {
              "aria-hidden": true,
              style: astronautStyleBase,
            })
          )}

          {/* Planet */}
          {typeof PlanetImported === "string" ? (
            <img src={PlanetImported} alt="Planet" style={planetStyleBase} />
          ) : (
            React.createElement(PlanetImported as any, {
              style: planetStyleBase,
            })
          )}
        </div>

        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              type="default"
              icon={<HomeOutlined />}
              style={{
                backgroundColor: "transparent",
                borderColor: "white",
                color: "white",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px 12px",
                borderRadius: 6,
                marginTop: 8,
              }}
            >
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
