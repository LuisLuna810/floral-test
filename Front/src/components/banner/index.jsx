import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerShopButton,
  BannerTitle,
} from "../../styles/banner";

import banner from "../../utils/image/banner.png"

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = () => {
    window.location.href = "/productos";
  };


  return (
    <BannerContainer >
      <BannerImage src={banner} />
      <BannerContent>
        <BannerTitle sx={{fontFamily:'"Montez", "cursive"'}} variant="h6">
        Todo Floral
        </BannerTitle>
        <Typography sx={{fontFamily:'"Montez", "cursive"', fontWeight:"500"}} variant="h4">
          Regalar flores es regalar amor
        </Typography>
        

        <BannerDescription  variant="subtitle">
        Arreglos florales, regalos y carrito de snacks
        </BannerDescription>

        <BannerShopButton onClick={handleClick} color="primary">Tienda </BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
