import { Hotel } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button, Box } from "@mui/material";

const Header = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Giới thiệu", path: "/about-us" },
    { label: "Tất cả phòng", path: "/room-information" },
    // { label: "Phòng của tôi", path: "/room-information" },
    // { label: "Phòng của tôi", path: "/room-information" },
  ];

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 3,
        px: 2,
        py: 1.5,
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
      }}
    >
      <Button
        component={Link}
        to="/"
        startIcon={<Hotel />}
        sx={{
          textTransform: "none",
          color: "#1976d2",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        BookHotel.vn
      </Button>

      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              textTransform: "none",
              color: isActive ? "#000" : "#666",
              fontWeight: isActive ? "bold" : "normal",
              borderBottom: isActive
                ? "2px solid #1976d2"
                : "2px solid transparent",
              borderRadius: 0,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#1976d2",
                backgroundColor: "transparent",
              },
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
};

export default Header;
