import { useEffect, useState } from "react";
import { getBanner } from "../../apis/HotelImgAPI";
import { toast } from "react-toastify";
import { Card, Button, Row, Col, Typography } from "antd";
import { Star } from "lucide-react";
import type { CardDetail } from "../../types/RoomIMAGE";

const { Title, Text } = Typography;

const HomePage = () => {
  const [banner, setBanner] = useState<string | null>(null);

  const fakeData: CardDetail[] = [
    {
      name: "Phòng VIP Hướng Biển",
      numberOfBed: "1 giường đôi lớn",
      numberOfPeople: 2,
      star: 4.5,
      numberVote: 150,
      price: 3500000,
    },
    {
      name: "Phòng Đơn Tiêu Chuẩn",
      numberOfBed: "1 giường đơn lớn",
      numberOfPeople: 1,
      star: 4.6,
      numberVote: 420,
      price: 1200000,
    },
    {
      name: "Căn Hộ Gia Đình",
      numberOfBed: "2 giường đôi lớn",
      numberOfPeople: 4 - 5,
      star: 4.9,
      numberVote: 85,
      price: 5800000,
    },
    {
      name: "Grand Plaza Hotel",
      numberOfBed: "1 giường đôi lớn",
      numberOfPeople: 2,
      star: 4.8,
      numberVote: 430,
      price: 1500000,
    },
    {
      name: "Seaside Resort",
      numberOfBed: "1 giường đôi lớn",
      numberOfPeople: 2,
      star: 4.9,
      numberVote: 237,
      price: 2000000,
    },
    {
      name: "Mountain View Hotel",
      numberOfBed: "1 giường đôi lớn",
      numberOfPeople: 2,
      star: 4.6,
      numberVote: 567,
      price: 800000,
    },
  ];

  const formatMoney = (price: number) => price.toLocaleString("vi-VN");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBanner();
        setBanner(data);
      } catch (error) {
        toast.error("Lỗi khi gọi API banner");
        console.error(error);
      }
    };
    fetchBanner();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Banner */}
      <div className="w-full h-[400px] overflow-hidden">
        <img
          src={banner!}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="mt-5 mb-5 text-center">
        <Title level={2}>Khách sạn nổi bật</Title>
        <Text type="secondary">Những phòng best seller của chúng tôi</Text>
      </div>

      {/* Cards */}
      <Row gutter={[24, 24]} className="p-4 justify-center">
        {fakeData.map((i) => (
          <Col key={i.name} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              hoverable
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              bodyStyle={{ padding: "16px" }}
              cover={
                <img
                  alt={i.name}
                  src={banner!}
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                  }}
                />
              }
              onMouseEnter={(e) => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "translateY(-2px)";
                card.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget as HTMLElement;
                card.style.transform = "translateY(0)";
                card.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
              }}
            >
              <Title level={4} style={{ marginBottom: "8px" }}>
                {i.name}
              </Title>
              <Text className="block mb-2">
                Phòng dành cho: {i.numberOfPeople} người
              </Text>

              <div className="flex items-center gap-2 mb-3">
                <Star size={18} color="#FFC107" fill="#FFC107" />
                <Text>
                  {i.star} ({i.numberVote}) lượt đánh giá
                </Text>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Text strong>Từ {formatMoney(i.price)}đ/đêm</Text>
                <Button
                  style={{
                    backgroundColor: "black",
                    borderColor: "black",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1f2937";
                    // gray-800
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "black";
                  }}
                >
                  Xem chi tiết
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
