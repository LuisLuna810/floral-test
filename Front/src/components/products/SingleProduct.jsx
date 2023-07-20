import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Box } from "@mui/material";
import {

  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,

} from "../../styles/product";
import { Stack, Tooltip, Typography } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import ProductMeta from "./ProductMeta";
import ColorSelect from "../selectcolor/selectcolores";
import PriceSelect from "../selectprice/PriceSelect";

import { addProduct } from "../../state/slices/CartSlice";

export default function SingleProduct({ product, matches }) {
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(product?.prices?.[0]);

  const dispatch = useDispatch();

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
      ColorName: selectedColor.ColorName
    };
    dispatch(addProduct(productData));

  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    //console.log(event.target.value, "asd")
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };


  useEffect(() => {
    if (product?.Stocks?.length > 0) {
      setSelectedColor(product.Stocks[0]);
    }
  }, [product]);


  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => showProductDetailDialog()}>
      <Box
          sx={{
            maxWidth: "10rem",
            maxHeight: "10rem",
            minWidth: "10rem",
            minHeight: "10rem",
          }}
        >
        <ProductImage src={product.image} />
        </Box>
        <ProductMeta product={product} matches={matches} selectedPrice={selectedPrice} />
        <ProductActionsWrapper>
          <Stack direction={matches ? "row" : "column"}>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductDetailDialog product={product} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} handlePriceChange={handlePriceChange} selectedColor={selectedColor} setSelectedColor={setSelectedColor} handleColorChange={handleColorChange} />
    </>
  );
}
