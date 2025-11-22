import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NotFound from "./pages/error/NotFound";
import RoomDetails from "./pages/home/RoomDetails";
import LayOut from "./pages/home/LayOut";
import AboutUs from "./pages/home/AboutUs";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/room-information" element={<RoomDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
