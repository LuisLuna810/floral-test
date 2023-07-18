import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
const apiUrl = import.meta.env.VITE_API_URL;

import Footer from '../components/footer';

export const Orden = () => {
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    // Aquí haces la llamada al backend para obtener la orden según el preferenceId
    // y actualizas el estado con la respuesta
    const fetchOrden = async () => {
      try {
        const preferenceId = new URLSearchParams(window.location.search).get('preferenceId');
        const response = await fetch(`${apiUrl}/pagos/orden?preferenceId=${preferenceId}`);
        const data = await response.json();
        setOrden(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrden();
  }, []);

  if (!orden) {
    return <Typography>Cargando...</Typography>;
  }
  const estadoColor = orden.estado === 'PAGADO CON EXITO' ? 'green' : 'orange';

  return (
    <Box sx={{ color: "Black", display: "flex", justifyContent: "center", flexDirection: "column", width: "100%" }}>

      <Box bgcolor={estadoColor} mt={2} p={1} borderRadius={0}>
        <Typography sx={{ textAlign: "center" }} variant="h5" color="white">
          Estado: {orden.estado}
        </Typography>
      </Box>


      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "100%", maxWidth: "900px", border: "1px solid black" }}>
          <Typography sx={{ textAlign: "center", border: "1px solid black", background: "rgb(230,230,230)" }} variant="h4">Detalle de la Orden</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Nombre del comprador: {orden.senderName}</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Nombre de quien recibe: {orden.receiverName}</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Tipo de orden: {orden.deliveryType}</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Direccion: {orden.address}</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Telefono: {orden.cellphone}</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Hora de envio: {orden.pickupTime}</Typography>



          <Typography>Id de Compra: {orden.idCompra}</Typography>
          <Typography>Fecha de Creación: {orden.createdAt}</Typography>
          <Typography>Fecha de Actualización: {orden.updatedAt}</Typography>

          <Typography sx={{ border: "1px solid black", textAlign: "center", background: "rgb(230,230,230)" }}>DETALLES DE VENTA</Typography>
          {orden.cart?.map((product) => {
            return (
              <Box sx={{ border: "1px solid black" }}>
                <Typography>Nombre: {product.name} {product.quantityPrice ? "x" + product.quantityPrice : ""}</Typography>
                <Typography>Precio por unidad: ${product.price}</Typography>
                <Typography>Tamaño: {product.size}</Typography>
                <Typography>Color: {product.ColorName}</Typography>
                <Typography>Cantidad: {product.quantity}</Typography>
              </Box>
            )
          })}
        </Box></Box>
      <Footer />
    </Box>
  );
};