import { useEffect, useState } from "react";
import { getBanner } from "../../apis/HotelImgAPI";
// import type { Banner } from "../../types/RoomIMAGE";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { CardDetail } from "../../types/RoomIMAGE";
import { Star } from "lucide-react";

const HomePage = () => {
  const [banner, setBanner] = useState<string | null>(null);
  const fakeData: CardDetail[] = [
    {
      name: "Phòng VIP Hướng Biển",
      star: 4.5, // Số sao (từ 1 đến 5)
      numberVote: 150, // Số lượt đánh giá
      price: 3500000, // Giá phòng (VNĐ)
    },
    {
      name: "Phòng Đơn Tiêu Chuẩn",
      star: 4.6,
      numberVote: 420,
      price: 1200000,
    },
    {
      name: "Căn Hộ Gia Đình",
      star: 4.9,
      numberVote: 85,
      price: 5800000,
    },
    { name: "Grand Plaza Hotel", star: 4.8, numberVote: 430, price: 1500000 },
    { name: "Seaside Resort", star: 4.9, numberVote: 237, price: 2000000 },
    { name: "Mountain View Hotel", star: 4.6, numberVote: 567, price: 800000 },
  ];

  const formatMoney = (price: number) => {
    return price.toLocaleString("vi-VN");
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBanner();
        setBanner(data);
        console.log(data);
      } catch (error) {
        toast.error("Lỗi khi gọi API banner");
        console.error(error);
      }
    };
    fetchBanner();
  }, []);
  return (
    <div>
      <Box width="100%" height="400px" overflow="hidden">
        <Box
          component="img"
          src={banner!}
          alt="Banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
      <Box
        sx={{
          margin: "20px 20px",
        }}
      >
        <Box
          sx={{
            mb: "20px",
          }}
        >
          <Typography component="h6" variant="h4">
            Khách sạn nổi bật
          </Typography>
          <Typography
            sx={{
              color: "#665565",
            }}
          >
            Những phòng best seller của chúng tôi
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "50px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {fakeData &&
            fakeData.map((i) => (
              <Card
                sx={{
                  width: "450px",
                  height: "430px",
                  borderRadius: "20px",
                  boxShadow: "20px gray",
                  transition: "transform 0.3s, box-shadow 0.3s", // Thêm hiệu ứng chuyển động mượt mà
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 8,
                    cursor: "pointer",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={banner!}
                  alt="Hinh1"
                  sx={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                    mb: "10px",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ mb: "10px" }}
                  >
                    {i.name}
                  </Typography>

                  <Box display="flex" gap="15px">
                    <Typography gutterBottom variant="body1" fontSize="20px">
                      <Star
                        size={18}
                        color="#FFC107"
                        fill="#FFC107"
                        style={{ marginRight: "4px" }}
                      />
                      {i.star}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontSize="20px"
                      mr="12px"
                    >
                      ({i.numberVote}) lượt đánh giá
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "auto",
                      padding: "16px",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Từ {formatMoney(i.price)}đ/đêm
                    </Typography>
                    <Button
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        height: "30px",
                        width: "fit",
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            ))}
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
