import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
