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
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const { id, name, image } = product;
    const quantity = 1; // O la cantidad deseada

    const productData = {
      id,
      name: name + (selectedPrice.size ? " " + selectedPrice.size : ""), // si tiene tamaño, se le agrega al nombre
      image,
      size: selectedPrice.size,
      price: selectedPrice.price,
      quantityPrice: selectedPrice.quantity,
      quantity,
      color: selectedColor.CodigoColor,
      ColorName: selectedColor.ColorName,
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
          sx={{height: "4rem"}}
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
        <ProductDetailWrapper
          display={"flex"}
          flexDirection={matches ? "column" : "row"}
        >
          <Product sx={{ mr: 4 }}>
            <ProductImage src={product.image} />
          </Product>
          <ProductDetailInfoWrapper>
            <Typography sx={{ lineHeight: 2 }} variant="h4">
              {product.name}
            </Typography>
            <Typography>{product.description}</Typography>
            <Typography>Color</Typography>
            <Box sx={{ display: "flex", maxWidth: "75px" }}>
              <ColorSelect
                product={product}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                handleColorChange={handleColorChange}
              />
            </Box>
            <Typography>Detallex:</Typography>
            <Box sx={{ display: "flex", maxWidth: "75px" }}>
              <PriceSelect
                product={product}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                handlePriceChange={handlePriceChange}
              />
            </Box>
            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* <IncDec /> */}

              <Button variant="contained" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Box>

            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,
              }}
            ></Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog>
  );
}
