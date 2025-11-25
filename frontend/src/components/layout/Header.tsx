import { CircleUser, Hotel } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";

const Header = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Giới thiệu", path: "/about-us" },
    { label: "Tất cả phòng", path: "/room-information" },
  ];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div
        className="flex"
        style={{
          gap: "24px",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "black",
            fontWeight: "bold",
            fontSize: "1rem",
            textDecoration: "none",
          }}
        >
          <Hotel
            size={20}
            style={{
              color: "black",
            }}
          />
          TiếnPhátHotel
        </Link>

        {/* Menu Items */}
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                type="link"
                style={{
                  textTransform: "none",
                  color: isActive ? "white" : "#666",
                  backgroundColor: isActive ? "black" : "white",
                  fontWeight: isActive ? "bold" : "normal",
                  borderBottom: isActive
                    ? "2px solid #1677ff"
                    : "2px solid transparent",
                  borderRadius: "10px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isActive
                    ? "black"
                    : "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isActive
                    ? "black"
                    : "white";
                }}
              >
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        {/* <CircleUser size={30} /> */}
        <Link to={"/login"}>
          <Button
            type="link"
            style={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              border: "1px solid",
              boxShadow: "unset",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "lightgray";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            Đăng nhập
          </Button>
        </Link>
        <Link to={"/register"}>
          <Button
            type="link"
            style={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              border: "1px solid",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "lightgray";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            Đăng ký
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
