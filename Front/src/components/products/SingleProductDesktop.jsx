import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductImage,

} from "../../styles/product";
import { Stack, Tooltip, Typography, Box } from "@mui/material";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import ProductMeta from "./ProductMeta";
import ColorSelect from "../selectcolor/selectcolores";
import PriceSelect from "../selectprice/PriceSelect";
import { addProduct, removeProduct, updateQuantity } from "../../state/slices/CartSlice";







export default function SingleProductDesktop({ product, matches }) {

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(product?.prices?.[0]);
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


  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };
  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

        <Box sx={{ maxWidth: "300px", maxHeight: "300px", minWidth: "300px", minHeight: "300px" }}>
          <ProductImage src={product.image} />
        </Box>
        {(showOptions || matches) && (
          <ProductAddToCart show={showOptions} variant="contained" onClick={handleAddToCart}>
            Add to cart
          </ProductAddToCart>
        )}
        <ProductActionsWrapper show={showOptions || matches}>
          <Stack direction={matches ? "row" : "column"}>

            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <Tooltip placement="left" title="Full view">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <Box sx={{ position: "relative", display: "flex", justifyContent: "flex-start", marginLeft: "0%", paddingBottom: "38px", width: "100%" }}>

        <Box sx={{ position: "absolute", marginLeft: "10%" }}>
          <ColorSelect product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} handleColorChange={handleColorChange} />
        </Box>
        {product?.prices?.[0]?.size ? // Si hay tamaño renderiza el selector
          <Box sx={{ position: "absolute", marginLeft: "55%" }}>
            <PriceSelect product={product} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} handlePriceChange={handlePriceChange} />
          </Box>
          :
          <></>}


      </Box>

      <ProductMeta product={product} selectedPrice={selectedPrice} />
      <ProductDetailDialog product={product} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} handlePriceChange={handlePriceChange} selectedColor={selectedColor} setSelectedColor={setSelectedColor} handleColorChange={handleColorChange} />
    </>
  );
}
