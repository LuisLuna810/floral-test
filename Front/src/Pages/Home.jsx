import { Container, Typography, Box, Stack, Grid, Button } from "@mui/material";
import Banner from "../components/banner";
// import Products from "../components/products";
import { UIProvider } from "../context/ui";
import Footer from "../components/footer";
import AppDrawer from "../components/drawer";
import Promotions from "../components/promotions";




export const Home = () => {
  return (
    <>
      <Container disableGutters maxWidth="xl" sx={{ background: "#fff", }}>
        <Stack>
          <UIProvider>
            <Banner />
            <Promotions />
            {/* <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
              <Typography variant="h4">Our Products</Typography>
            </Box>
            <Products /> */}
            <Footer />
            <AppDrawer />
          </UIProvider>
        </Stack>
      </Container>
    </>
  )
}