import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #eee",
        backgroundColor: "#fff",
        textAlign: "center",
        py: 2,
        color: "#555",
        fontSize: "0.9rem",
        mt: "auto", // giúp Footer dính cuối
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} <strong>BookHotel.vn</strong> — All rights
        reserved.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Link href="/" underline="hover" color="#1976d2">
          Trang chủ
        </Link>
        <Link href="/about-us" underline="hover" color="#1976d2">
          Giới thiệu
        </Link>
        <Link href="/contact" underline="hover" color="#1976d2">
          Liên hệ
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
