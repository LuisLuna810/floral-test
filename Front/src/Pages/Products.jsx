import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import Banner from "../components/banner";
import Products from "../components/products";
import { UIProvider } from "../context/ui";
import Footer from "../components/footer";
import AppDrawer from "../components/drawer";




export const Productos = () => {
  return (
    <>
      <Container disableGutters maxWidth="xl" sx={{ background: "#fff", }}>
        <Stack>
          <UIProvider>
            <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
              <Typography variant="h4" fontFamily={'TanPearl'}>NUESTROS PRODUCTOS</Typography>
            </Box>
            <Products />
           
            <AppDrawer />
          </UIProvider>
        </Stack> 
        
      </Container>
      <Footer />
    </>
  )
}