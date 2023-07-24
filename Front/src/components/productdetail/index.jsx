import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  TextField,
  Divider,
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
import logo from "../../utils/image/logo.png.png";

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

export default function ProductDetail({
  open,
  onClose,
  product,
  selectedPrice,
  setSelectedPrice,
  handlePriceChange,
  selectedColor,
  setSelectedColor,
  handleColorChange,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch()
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1); // O la cantidad deseada

  const handleAddToCart = () => {
    const { id, name, image } = product;
    const productData = {
      id,
      name: name + (selectedPrice.size ? " " + selectedPrice.size : ""), // si tiene tamaño, se le agrega al nombre
      image,
      size: selectedPrice.size,
      price: selectedPrice.price,
      quantityPrice: selectedPrice.quantity,
      quantity: quantity,
      color: selectedColor.CodigoColor,
      ColorName: selectedColor.ColorName,
      detailDescription: description,
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
          mb: "55px"
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ height: "4rem" }}
        >
          <Box>
            {" "}
            <img style={{ maxWidth: "100px" }} src={logo} alt="todo floral" />
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"} justifyContent={"center"} alignItems={matches ? "center" : "normal"}>
          <Product sx={{ border: "solid 1px lightgrey", borderRadius: "3px" , mb:3}}
            maxWidth={matches ? "80vw" : "40vw"} maxHeight={matches ? "80vw" : "40vw"}
            width={matches ? '100%' : '55%'}
            height={matches ? '100%' : '55%'}
          >
            <ProductImage src={product.image} />
          </Product>
          <ProductDetailInfoWrapper sx={{ mr: "2vw", ml: "2vw",}}
          width={matches ? '100%' : '45%'}
          height={matches ? '100%' : '45%'}>

            <Typography sx={{ fontFamily: '"", "cursive"', fontWeight: "500", fontSize: "2.5rem" }} variant="h4">
              {product.name.charAt(0).toLocaleUpperCase()}{product.name.slice(1).toLocaleLowerCase()}
            </Typography>
            <Divider sx={{ borderColor: "#ffc4cc", my: 2 }} />
            <Typography sx={{ fontFamily: "Roboto,sans-serif", fontWeight: "500", fontSize: "1.25rem" }} variant="h5" alignItems="center">$
              {selectedPrice.price}
            </Typography>


            <Box sx={{ my: 2, border: "solid 1px lightgrey", borderRadius: "3px", p: 1 }}>
              <Typography sx={{ fontFamily: "Roboto,sans-serif", fontWeight: "400", fontSize: "1.1rem" }} variant="h5">
                Descripción
              </Typography>
              <Box display="flex"
                alignItems="center" sx={{ height: "auto", px: 2, py: 3 }}>
                {product.description}
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Box sx={{ display: "flex", mb: 3, alignItems: "center", }}>
                  <Typography>Color:</Typography>
                  <Box >
                    <ColorSelect product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} handleColorChange={handleColorChange} />
                  </Box>

                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Typography sx={{ textAlign: "center", mr: 2 }}>Tamaño:
                  </Typography>
                  <Box >
                    <PriceSelect product={product} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} handlePriceChange={handlePriceChange} />
                  </Box>
                </Box>
              </Box>

              <Box sx={{}}>
                <TextField inputProps={{ style: { height: 50 }, maxLength: 2000 }}
                  name="description"
                  multiline
                  fullWidth
                  placeholder="Aquí puedes poner las caracteristicas que pueden poseer tus arreglos. Ej.: 2 Arreglos de rojo..."
                  label="Nota (opcional):"
                  onChange={(e) => setDescription(e.target.value)} />
              </Box>
            </Box>




            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, mt: 4 }} >
              <Box display="flex" alignItems="center" sx={{ borderRadius: "3px", width: "45%", border: "solid 1px lightgrey", }}>
                <IconButton
                  sx={{ width: "25%", height: '100%', background: "#f2f2f2", borderRadius: "0", }}
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </IconButton>
                <Typography sx={{
                  width: "50%", height: '100%', display: 'flex', justifyContent: "center", alignItems: "center", border: "solid 1px lightgrey", borderTop: 0,
                  borderBottom: 0,
                }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  sx={{ width: "25%", height: '100%', background: "#f2f2f2", borderRadius: "0", }}
                  onClick={() => setQuantity(quantity + 1)}>
                  +
                </IconButton>
              </Box>
              <Box
                sx={{ width: "45%" }}
              >
                {/* <IncDec /> */}

                <Button variant="contained"
                  fullWidth
                  sx={{ py: 2 }}
                  onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </Box>
            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog >
  );
}
