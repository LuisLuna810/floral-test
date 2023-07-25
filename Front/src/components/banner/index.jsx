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
    <BannerContainer sx={{justifyContent: "space-evenly"}} >
      <BannerImage src={banner} />
      <BannerContent>
        <BannerTitle sx={{ whiteSpace: 'nowrap', fontSize: "3.5rem"}} variant="h6" fontFamily={'TanPearl'}>
        TODO FLORAL
        </BannerTitle>
        <Typography sx={{ fontWeight:"500", fontSize: "2rem"}} variant="h4" fontFamily={'Anaktoria'}>
          Regalar flores es regalar amor
        </Typography>
        

        <BannerDescription  variant="subtitle" sx={{paddingTop: "1rem", fontSize: "1.61rem", mb:5}} fontFamily={'MoonTime'}>
        Arreglos florales, regalos y carrito de snacks
        </BannerDescription>

        <BannerShopButton onClick={handleClick} color="primary">Tienda </BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
