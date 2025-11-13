import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Text } = Typography;

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid #eee",
        backgroundColor: "#fff",
        textAlign: "center",
        padding: "16px 0",
        color: "#555",
        fontSize: "0.9rem",
        marginTop: "auto",
      }}
    >
      <Text style={{ display: "block", marginBottom: "8px" }}>
        © {new Date().getFullYear()} <strong>BookHotel.vn</strong> — All rights
        reserved.
      </Text>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link
          to="/"
          style={{
            color: "#1677ff",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4096ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#1677ff")}
        >
          Trang chủ
        </Link>
        <Link
          to="/about-us"
          style={{
            color: "#1677ff",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4096ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#1677ff")}
        >
          Giới thiệu
        </Link>
        <Link
          to="/contact"
          style={{
            color: "#1677ff",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4096ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#1677ff")}
        >
          Liên hệ
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
