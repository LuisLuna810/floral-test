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
        <BannerTitle sx={{fontFamily:'"","cursive"', whiteSpace: 'nowrap', fontSize: "4rem"}} variant="h6">
        TODO FLORAL
        </BannerTitle>
        <Typography sx={{fontFamily:'"", "cursive"', fontWeight:"500", fontSize: "2rem"}} variant="h4">
          Regalar flores es regalar amor
        </Typography>
        

        <BannerDescription  variant="subtitle" sx={{paddingTop: "1rem"}}>
        Arreglos florales, regalos y carrito de snacks
        </BannerDescription>

        <BannerShopButton onClick={handleClick} color="primary">Tienda </BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
