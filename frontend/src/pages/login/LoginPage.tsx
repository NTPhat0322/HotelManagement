import { Button, Input, Typography } from "antd";
import { Hotel } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../../types/User";
import type { LoginRequest } from "../../types/login/login";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../auth/PrivateRoute";
const { Text, Title } = Typography;
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginRequest | null>({
    username: null,
    password: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const checkValid = (username: string | null, password: string | null) => {
    const clearUsername = username?.trim();
    const clearPassword = password?.trim();
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newError: Record<string, string> = {};
    // if (!clearEmail) {
    //   newError.email = "Email không được để trống";
    // } else if (!emailRegex.test(clearEmail)) {
    //   newError.email = "Không đúng định dạng email";
    // }
    if (!clearUsername) {
      newError.username = "Password không được để trống";
    }
    if (!clearPassword) {
      newError.password = "Password không được để trống";
    } else if (clearPassword.length < 6) {
      newError.password = "Password phải chứa ít nhất 6 ký tự";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSave = async () => {
    if (!formData) {
      setErrors({ email: "Vui lòng nhập thông tin", password: "" });
      return;
    }
    const usernameForValidate = formData.username?.trim() ?? "";
    const passwordForValidate = formData.password?.trim() ?? "";
    const valid = checkValid(usernameForValidate, passwordForValidate);
    if (!valid) {
      return;
    }
    // const payload = {
    //   username: usernameForValidate,
    //   password: passwordForValidate,
    // };
    const res = await authService.login(
      usernameForValidate,
      passwordForValidate
    );
    if (!res) {
      throw new Error("Lỗi không thể đăng nhập");
    }
    const { accessToken, refreshToken, ...userInfo } = res;
    login(userInfo as User); // Chỉ cần gọi và truyền res vào thôi!
    navigate("/");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[500px] bg-gray-100 shadow-lg border rounded-3xl p-6">
        <div>
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
              justifyContent: "center",
            }}
          >
            <Hotel size={20} style={{ color: "black" }} />
            TiếnPhátHotel
          </Link>
        </div>
        <div className="text-center my-7">
          <Title
            level={1}
            style={{
              margin: "10px 0",
            }}
          >
            Đăng nhập
          </Title>
          <Text type="secondary">
            Chào mừng bạn đến với khách sạn của chúng tôi
          </Text>
        </div>
        <div>
          <div className="mb-2.5">
            <Title level={4}>username hoặc Số điện thoại</Title>
            <Input
              type="text"
              placeholder="Nhập email hoặc số điện thoại của bạn"
              value={formData?.username || ""}
              onChange={(e) => {
                setFormData({ ...formData!, username: e.target.value });
              }}
              status={errors.username ? "error" : ""}
            />
            {errors.username && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.username}
              </Text>
            )}
          </div>
          <div className="mb-8">
            <Title level={4}>Password</Title>
            <Input.Password
              placeholder="Nhập Password của bạn"
              value={formData?.password || ""}
              onChange={(e) => {
                setFormData({ ...formData!, password: e.target.value.trim() });
              }}
              status={errors.password ? "error" : ""}
            />
            {errors.password && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.password}
              </Text>
            )}
          </div>
          <Button
            type="primary"
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100%",
              marginBottom: "20px",
            }}
            onClick={handleSave}
          >
            Đăng nhập
          </Button>
        </div>
        <div className="text-center ">
          <Text
            style={{
              margin: "10px auto",
            }}
          >
            Chưa có tài khoản?
            <Link to={"/register"} style={{ fontWeight: "bold" }}>
              Đăng ký ngay
            </Link>
          </Text>
          <br />
          <Link
            to={"/"}
            style={{
              fontWeight: "bold",
            }}
          >
            Trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
