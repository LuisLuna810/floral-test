import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme";
import styled from "@emotion/styled";
import { Product, ProductImage } from "../../styles/product";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { useDispatch } from "react-redux";
import { addProduct } from "../../state/slices/CartSlice";

import PriceSelect from "../selectprice/PriceSelect";
import ColorSelect from "../selectcolor/selectcolores";
import { useState } from "react";

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(2),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 0,
}));

export default function ProductDetail({ open, onClose, product, selectedPrice, setSelectedPrice, handlePriceChange, selectedColor, setSelectedColor, handleColorChange }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch()
  const [description, setDescription] = useState("")

  const handleAddToCart = () => {
    const { id, name, image } = product;
    const quantity = 1; // O la cantidad deseada

    const productData =
    {
      id,
      name: name + (selectedPrice.size ? " " + selectedPrice.size : ""), // si tiene tamaño, se le agrega al nombre
      image, size: selectedPrice.size,
      price: selectedPrice.price,
      quantityPrice: selectedPrice.quantity,
      quantity,
      color: selectedColor.CodigoColor,
      ColorName: selectedColor.ColorName,
      detailDescription: description
    };
    dispatch(addProduct(productData));

  };

  return (
    <Dialog
      TransitionComponent={SlideTransition}
      variant="permanant"
      open={open}
      fullScreen
    >
      <DialogTitle
        sx={{
          background: Colors.secondary,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          Todo Floral
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"}>
          <Product sx={{ mr: 10, ml: 10, maxWidth: "45rem", maxHeight: "45rem" }}>
            <ProductImage src={product.image} />
          </Product>
          <ProductDetailInfoWrapper sx={{ mr: 10, ml: 10, width:"100%" }}>

            <Typography sx={{ fontFamily: '"", "cursive"', fontWeight: "500", fontSize: "3.5rem" }} variant="h4">
              {product.name.charAt(0).toLocaleUpperCase()}{product.name.slice(1).toLocaleLowerCase()}
            </Typography>
            <Typography sx={{ fontFamily: '"", "cursive"', fontWeight: "500", fontSize: "1.8rem", mb:5}} variant="h5">
              {product.description.charAt(0).toLocaleUpperCase()}{product.description.slice(1).toLocaleLowerCase()}
            </Typography>
            <Box sx={{ display: "flex", justifyContent:"space-between"}}>
              <Box>
                <Typography>Color:</Typography>
                <Box sx={{ display: "flex", maxWidth: "75px", mb: 3 }}>
                  <ColorSelect product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} handleColorChange={handleColorChange} />
                </Box>
                <Typography>Tamaño:</Typography>
                <Box sx={{ display: "flex", maxWidth: "75px", mb: 3 }}>
                  <PriceSelect product={product} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} handlePriceChange={handlePriceChange} />
                </Box>
              </Box>
              <Box sx={{ maxWidth: "250px" , Height:"300px"}}>
                <TextField inputProps={{ style: { height: 300 }}} name="description"
                  label="Nota (opcional):" onChange={(e) => setDescription(e.target.value)} />
              </Box>
            </Box>



            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* <IncDec /> */}

              <Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>
            </Box>

            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,
              }}
            >

            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog>
  );
}
