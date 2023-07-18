import React from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import imagenCarro from "../utils/image/52.jpg"
import { BannerShopButton } from '../styles/banner';
import Footer from '../components/footer';

export const Servicios = () => {
  const servicios = [

    {
      titulo: 'Bodas',
      imagen: 'https://cdn.pixabay.com/photo/2017/08/06/20/11/wedding-2595862_1280.jpg',
      frase: 'Celebra el amor con estilo',
    },
    {
      titulo: 'Fiestas',
      imagen: 'https://cursodeorganizaciondelhogar.com/wp-content/uploads/2018/03/decoracion-guirnaldas-con-globos-color-plata-2018-1-3.jpg',
      frase: 'Diversión asegurada para todos',
    },
    {
      titulo: 'Post bodas',
      imagen: 'https://previews.123rf.com/images/dolgachov/dolgachov1501/dolgachov150104738/35771286-d%C3%ADas-de-fiesta-la-gente-los-sentimientos-y-saludos-concepto-cerca-de-hombre-con-cesta-llena-de.jpg',
      frase: 'Celebra el inicio de una nueva etapa',
    },
    {
      titulo: 'Xv’s',
      imagen: 'https://centrosdemesa.co/wp-content/uploads/2018/09/YYYYYYYYYdecoracion-con-globos-para-15-anos-696x335.jpg',
      frase: 'Un día especial para celebrar',
    },
    {
      titulo: 'Centros de mesa',
      imagen: 'https://estudio070.files.wordpress.com/2020/02/decoracic3b3n-flores-boda.jpg',
      frase: 'Detalles únicos para tu evento',
    },
    {
      titulo: 'Baby showers y más…',
      imagen: 'https://decoracionesbonitas.com/wp-content/uploads/2022/01/baby-shower-flores.jpg',
      frase: 'Celebra la llegada de un nuevo miembro',
    },
    {
      titulo: '',
      imagen: imagenCarro,
      frase: '',
    },
  ];

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {servicios.map((servicio, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <img src={servicio.imagen} alt={servicio.titulo} style={{ width: '100%' }} />
              <Typography variant="h6" align="center">
                {servicio.titulo}
              </Typography>
              <Typography variant="body1" align="center">
                {servicio.frase}
              </Typography>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4} key={88} sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
            <Typography sx={{
              fontSize: "28px"
            }}>
              CARRITO DE SNACKS PARA TU EVENTO
              <Typography sx={{
                fontSize: "18px"
              }}>
                Cotiza muy rapido en nuestra seccion de snacks, elegi la cantidad de invitados, los snacks que mas te gusten, la fecha del evento y listo !
              </Typography>
            </Typography>
            
          </Grid>
          <Grid item xs={12} sm={6} md={4} key={88} sx={{ width: "100%", display: "flex", justifyItems: "center", alignItems: "center" }}>

            <Button href='/snackcart' sx={{
              background: "green", color: "white"
            }}>Cotizar Carrito de Snacks</Button>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

