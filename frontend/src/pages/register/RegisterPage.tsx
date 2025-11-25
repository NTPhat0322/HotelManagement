import { Button, Input, Typography } from "antd";
import { Hotel } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authorizeAxiosInstance } from "../../utils/authorizeAxios";
import { toast } from "react-toastify";
import type { City, District, UserRegister, Ward } from "../../types/User";
const { Text, Title } = Typography;

const RegisterPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCityID, setSelectedCityID] = useState<string>("");
  const [selectedDistrictID, setSelectedDistrictID] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [ward, setWard] = useState<Ward[]>([]);
  const [formData, setFormData] = useState<UserRegister | null>({
    firstName: null,
    lastName: null,
    phone: null,
    dateOfBirth: null,
    address: null,
    city: null,
    district: null,
    ward: null,
    email: null,
    password: null,
  });
  const fetchDataCity = async () => {
    try {
      const res = await authorizeAxiosInstance.get(
        "https://api.vnappmob.com/api/v2/province/"
      );

      if (!res?.data?.results) {
        toast.error("Không có dữ liệu thành phố");
        return;
      }
      setCities(res.data.results);
    } catch (error) {
      toast.error("Lỗi khi gọi api thành phố");
      console.error(errors);
    }
  };
  const fetchDistrict = async (selectedCityID: string) => {
    try {
      const res = await authorizeAxiosInstance.get(
        `https://api.vnappmob.com/api/v2/province/district/${selectedCityID}`
      );
      if (!res?.data?.results) {
        toast.error("Không có dữ liệu quận");
        return;
      }
      setDistricts(res.data.results);
    } catch (error) {
      toast.error("Lỗi khi gọi api quận");
      console.error(errors);
    }
  };
  const fetchWard = async (selectedDistrictID: string) => {
    try {
      const res = await authorizeAxiosInstance.get(
        `https://api.vnappmob.com/api/v2/province/ward/${selectedDistrictID}`
      );
      if (!res?.data?.results) {
        toast.error("Không có dữ liệu phường");
        return;
      }
      setWard(res.data.results);
    } catch (error) {
      toast.error("Lỗi khi gọi api phường");
      console.error(errors);
    }
  };
  useEffect(() => {
    fetchDataCity();
  }, []);
  useEffect(() => {
    if (selectedCityID) {
      fetchDistrict(selectedCityID);
    }
  }, [selectedCityID]);
  useEffect(() => {
    if (selectedDistrictID) {
      fetchWard(selectedDistrictID);
    }
  }, [selectedDistrictID]);

  const checkValid = (data: UserRegister) => {
    const clearEmail = data.email?.trim();
    const clearPassword = data.password?.trim();
    const clearFirstName = data.firstName?.trim();
    const clearLastName = data.lastName?.trim();
    const clearPhone = data.phone?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)(3|5|7|8|9|1[2-9])[0-9]{7,8}$/;
    const newError: Record<string, string> = {};
    if (!clearFirstName) {
      newError.firstName = "Họ không được để trống";
    }
    if (!clearLastName) {
      newError.lastName = "Tên không được để trống";
    }
    if (!clearPhone) {
      newError.phone = "Sđt không được để trống";
    } else if (!phoneRegex.test(clearPhone)) {
      newError.phone =
        "SĐT không đúng định dạng, bắt đầu bằng 0 hoặc +84 và có 10-11 chữ số";
    }
    if (!formData?.city) {
      newError.city = "Thành phố không được để trống";
    }
    if (!formData?.district) {
      newError.district = "Quận không được để trống";
    }
    if (!formData?.ward) {
      newError.ward = "Phường không được để trống";
    }
    if (!formData?.address) {
      newError.address = "Địa chỉ không được để trống";
    }
    if (!clearEmail) {
      newError.email = "Email không được để trống";
    } else if (!emailRegex.test(clearEmail)) {
      newError.email = "Không đúng định dạng email";
    }
    if (!clearPassword) {
      newError.password = "Password không được để trống";
    } else if (clearPassword.length < 6) {
      newError.password = "Password phải chứa ít nhất 6 ký tự";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSave = () => {
    if (!formData) {
      setErrors({ email: "Vui lòng nhập thông tin", password: "" });
      return;
    }
    const payload = {
      firstName: formData.firstName?.trim() ?? "",
      lastName: formData.lastName?.trim() ?? "",
      phone: formData.phone?.trim() ?? "",
      email: formData.email?.trim() ?? "",
      password: formData.password?.trim() ?? "",
      address: formData.address?.trim() ?? "",
      city: formData.city?.trim() ?? "",
      district: formData.district?.trim() ?? "",
      ward: formData.ward?.trim() ?? "",
      dateOfBirth: formData.dateOfBirth,
    };
    const valid = checkValid(payload);
    if (!valid) {
      return;
    }

    console.log(payload);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[850px] bg-gray-100 p-6 rounded-3xl">
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
        <div className="text-center mb-5">
          <Title
            level={1}
            style={{
              margin: "10px 0",
            }}
          >
            Đăng ký
          </Title>
          <Text type="secondary">
            Chào mừng bạn đến với khách sạn của chúng tôi
          </Text>
        </div>
        <div className="flex mb-5 gap-4">
          <div className="flex-1">
            <Title level={4}>Họ</Title>
            <Input
              style={{
                width: "100%",
              }}
              type="text"
              placeholder="Nhập họ của bạn"
              value={formData?.firstName || ""}
              onChange={(e) => {
                setFormData({ ...formData!, firstName: e.target.value });
              }}
              status={errors.firstName ? "error" : ""}
            />
            {errors.firstName && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.firstName}
              </Text>
            )}
          </div>
          {/* hang 1  */}
          <div className="flex-1">
            <Title level={4}>Tên</Title>
            <Input
              type="text"
              placeholder="Nhập tên của bạn"
              value={formData?.lastName || ""}
              onChange={(e) => {
                setFormData({ ...formData!, lastName: e.target.value });
              }}
              status={errors.lastName ? "error" : ""}
            />
            {errors.lastName && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.lastName}
              </Text>
            )}
          </div>
          {/* hang 2 */}
        </div>
        <div className="flex mb-5 gap-4">
          <div className="flex-1">
            <Title level={4}>Số điện thoại</Title>
            <Input
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={11}
              placeholder="Nhập số điện thoại của bạn"
              value={formData?.phone || ""}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                setFormData({ ...formData!, phone: digitsOnly });
              }}
              status={errors.phone ? "error" : ""}
            />
            {errors.phone && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.phone}
              </Text>
            )}
          </div>
          <div className="flex-1">
            <Title level={4}>Ngày sinh</Title>
            <Input
              type="date"
              value={formData?.dateOfBirth || ""}
              onChange={(e) => {
                // const ngaySinh = moment(e.target.value).format("DD/MM/YYYY");
                setFormData({ ...formData!, dateOfBirth: e.target.value });
              }}
              status={errors.dateOfBirth ? "error" : ""}
            />
            {errors.dateOfBirth && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.dateOfBirth}
              </Text>
            )}
          </div>
        </div>
        {/* hang 3 */}
        <div className="flex mb-5 gap-2">
          <div className="flex-1/3">
            <Title level={4}>Thành phố</Title>
            <select
              value={selectedCityID}
              onChange={(e) => {
                const cityID = e.target.value;
                setSelectedCityID(cityID);
                const ctName = cities.find(
                  (city) => city.province_id === cityID
                );
                setFormData({
                  ...formData!,
                  city: ctName?.province_name || "",
                  district: "",
                  ward: "",
                });
              }}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: errors.city ? "1px solid red" : "1px solid #d9d9d9",
              }}
            >
              <option value="">-- Chọn thành phố --</option>
              {cities &&
                cities.map((c) => (
                  <option key={c.province_id} value={c.province_id!}>
                    {c.province_name}
                  </option>
                ))}
            </select>
            {errors.city && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.city}
              </Text>
            )}
          </div>
          <div className="flex-1/3">
            <Title level={4}>Quận</Title>
            <select
              value={selectedDistrictID}
              onChange={(e) => {
                const districtID = e.target.value;
                setSelectedDistrictID(districtID);
                const districtName = districts.find(
                  (dis) => dis.district_id === districtID
                );
                setFormData({
                  ...formData!,
                  district: districtName?.district_name || "",
                  ward: "",
                });
              }}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: errors.district ? "1px solid red" : "1px solid #d9d9d9",
              }}
            >
              <option value="">-- Chọn quận --</option>
              {districts &&
                districts.map((c) => (
                  <option key={c.district_id} value={c.district_id!}>
                    {c.district_name}
                  </option>
                ))}
            </select>
            {errors.district && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.district}
              </Text>
            )}
          </div>
          <div className="flex-1/3">
            <Title level={4}>Phường</Title>
            <select
              value={formData?.ward || ""}
              onChange={(e) => {
                setFormData({
                  ...formData!,
                  ward: e.target.value,
                });
              }}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: errors.ward ? "1px solid red" : "1px solid #d9d9d9",
              }}
            >
              <option value="">-- Chọn Phường --</option>
              {ward &&
                ward.map((c) => (
                  <option key={c.ward_id} value={c.ward_name!}>
                    {c.ward_name}
                  </option>
                ))}
            </select>
            {errors.ward && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.ward}
              </Text>
            )}
          </div>
        </div>
        {/* hang 4 */}
        <div className="mb-5">
          <Title level={4}>Địa chỉ</Title>
          <Input
            placeholder="Nhập địa chỉ của bạn"
            value={formData?.address || ""}
            onChange={(e) => {
              setFormData({ ...formData!, address: e.target.value });
            }}
            status={errors.address ? "error" : ""}
          />
          {errors.address && (
            <Text
              type="danger"
              style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
            >
              {errors.address}
            </Text>
          )}
        </div>
        {/* hang 5 */}
        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <Title level={4}>Email</Title>
            <Input
              type="text"
              placeholder="Nhập email của bạn"
              value={formData?.email || ""}
              onChange={(e) => {
                setFormData({ ...formData!, email: e.target.value });
              }}
              status={errors.email ? "error" : ""}
            />
            {errors.email && (
              <Text
                type="danger"
                style={{ fontSize: "12px", marginTop: "4px", display: "block" }}
              >
                {errors.email}
              </Text>
            )}
          </div>
          <div className="flex-1">
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
        </div>
        <div>
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
            Đăng ký
          </Button>
        </div>
        <div className="text-center">
          <Text>
            Đã có tài khoản?
            <Link to={"/login"} style={{ fontWeight: "bold" }}>
              Đăng nhập
            </Link>
          </Text>
          <br />
          <Link to={"/"}>Trở về trang chủ</Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
