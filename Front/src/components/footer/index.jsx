import styled from "@emotion/styled";
import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../../styles/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsappIcon from "@mui/icons-material/WhatsApp";
import { SubscribeTf, FooterTitle } from "../../styles/footer";
import SendIcon from "@mui/icons-material/Send";
import { useMediaQuery } from "@mui/material";

import Swal from "sweetalert2";

export default function Footer() {
  const is600 = useMediaQuery("(max-width:600px)");
  return (
    <Box
      sx={{
        background: Colors.shaft,
        color: Colors.white,
        p: { xs: 4, md: 5 },
        pt: 12,
        pb: 12,
        fontSize: { xs: "12px", md: "14px" },
        position: "initial",
        bottom: 0,
        width: "100%"
      }}
    >
      <Grid
        sx={{ paddingBottom: is600 ? "180px" : 0 }}
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">Nosotros</FooterTitle>
          <Typography variant="caption2">
            En Todo Floral, nos esforzamos por crear arreglos únicos que
            transmitan emociones y creen momentos inolvidables.
          </Typography>
          <Box sx={{ mt: 4, color: Colors.dove_gray }}>
            <a
              href="https://www.facebook.com/TodoFloralHermosillo/"
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              <FacebookIcon sx={{ mr: 1 }} />
            </a>
            <a
              href="https://www.instagram.com/todofloralhmo/"
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              <InstagramIcon sx={{ mr: 1 }} />
            </a>
            <a
              href="https://api.whatsapp.com/message/VPBWPSRCLRQHM1?autoload=1&app_absent=0"
              style={{ color: "inherit", textDecoration: "none" }}
              target="_blank"
            >
              <WhatsappIcon sx={{ mr: 1 }} />
            </a>
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">informacion</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Tel: 6625130440
              </Typography>
            </ListItemText>

            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Direccion: Plaza Paseo #14 entre Solidaridad y Av Paseo,
                Hermosillo, Sonora
              </Typography>
            </ListItemText>
            <ListItemText>
              <a
                href="https://goo.gl/maps/UXXhcj6YNDgAYEU59"
                target="_blank"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography lineHeight={2} variant="caption2">
                  Ver en mapa
                </Typography>
              </a>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">Mi Cuenta</FooterTitle>
          <List>
            <ListItemText>
              <a
                href="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography lineHeight={2} variant="caption2">
                  Iniciar Sesion
                </Typography>
              </a>
            </ListItemText>
            <ListItemText>
              <a
                href="/cart"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography lineHeight={2} variant="caption2">
                  Mi Carrito
                </Typography>
              </a>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">newsletter</FooterTitle>
          <Stack>
            <SubscribeTf
              color="primary"
              label="Email address"
              variant="standard"
            />
            <Button
              startIcon={<SendIcon sx={{ color: Colors.white }} />}
              sx={{ mt: 4, mb: 4 }}
              variant="contained"
              onClick={() => Swal.fire("Gracias, ya estas registrado!")}
            >
              Subscribe
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
