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
        <BannerTitle sx={{fontFamily:'"","cursive"', whiteSpace: 'nowrap', fontSize: "4rem"}} variant="h6">
        TODO FLORAL
        </BannerTitle>
        <Typography sx={{fontFamily:'"", "cursive"', fontWeight:"500", fontSize: "2rem"}} variant="h4">
          Regalar flores es regalar amor
        </Typography>
        

        <BannerDescription  variant="subtitle" sx={{paddingTop: "1rem"}}>
        Sorprende con las flores más frescas para toda ocasión y con los mejores complementos como globos, accesorios y más. Cotiza nuestra barra de snacks y agenda tu fecha. Tenemos envíos a domicilio disponibles todos los días
        </BannerDescription>

        <BannerShopButton onClick={handleClick} color="primary">Tienda </BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
}
