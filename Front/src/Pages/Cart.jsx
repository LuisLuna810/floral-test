import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Grid,
  Box,
  Button,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Colors } from "../styles/theme";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addProduct,
  removeProduct,
  updateQuantity,
} from "../state/slices/CartSlice";
import Footer from "../components/footer";
import { important } from "polished";

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
  const {
    id,
    name,
    price,
    quantity,
    image,
    color,
    ColorName,
    size,
    quantityPrice,
  } = item;

  const handleQuantityChange = (newQuantity) => {
    onUpdateQuantity(id, newQuantity, color, size, price);
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Grid container spacing={2} alignItems="center" sx={{ pb: "35px" }}>
      <Grid item xs={12} sm={3}>
        <Box display="flex" alignItems="center">
          <img
            src={image}
            alt={name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <Typography>
            {name} {quantityPrice ? "x" + quantityPrice : ""}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Box display="flex" alignItems="center" justifyContent={"flex-end"}>
          <Typography sx={{ color: color }}>{ColorName}</Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={2}
        container
        justifyContent="flex-end"
        alignItems="center"
      >
        <Typography>
          {isMobile ? "Precio" : ""}
          <Typography sx={{ color: "#4CAF50" }}>
            ${price?.toFixed(2)}
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={2} container justifyContent="flex-end">
        <Box display="flex" alignItems="center">
          {isMobile ? "Cantidad" : ""}
          <IconButton
            size="small"
            disabled={quantity <= 0}
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </IconButton>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        container
        justifyContent="flex-end"
        alignItems="center"
      >
        <Typography>
          {isMobile ? "Subtotal " : ""}
          <Typography sx={{ color: "#4CAF50" }}>
            ${(price * quantity).toFixed(2)}
          </Typography>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        container
        justifyContent="flex-end"
        alignItems="center"
      >
        <IconButton
          size="small"
          sx={{ color: "#F44336" }}
          onClick={() => onDelete(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart);
  const [shippingChecked, setShippingChecked] = useState(false);



  const isMobile = useMediaQuery('(max-width:600px)');



  const updateQuantitys = (productId, newQuantity, color, size, price) => {
    if (newQuantity < 1) {
      return;
    }

    const updatedItems = cartItems.map((cartItem) => {
      if (
        cartItem.id === productId &&
        cartItem.color === color &&
        cartItem.size === size &&
        cartItem.price === price
      ) {
        dispatch(
          updateQuantity({
            productId: cartItem.id,
            quantity: newQuantity,
            color: cartItem.color,
            size: cartItem.size,
            price: cartItem.price,
          })
        );

        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
  };

  const removeFromCart = (productId, color) => {
    const index = cartItems.findIndex(
      (cartItem) => cartItem.id === productId && cartItem.color === color
    );
    if (index !== -1) {
      const updatedItems = [...cartItems];
      updatedItems.splice(index, 1);
      setCartItems(updatedItems);
      dispatch(removeProduct({ productId, color }));
    }
  };

  const calculateTotal = () => {
    let total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (shippingChecked) {
      total += 80;
    }
    return total;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "28px",
          marginTop: "28px",
        }}
      >
        <div
          style={{
            background: Colors.light_gray,
            width: "80%",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center", }}
            fontFamily={'TanPearl'} fontSize={"2rem"} my={2}
          >
            CARRITO DE COMPRA
          </Typography>
          <hr />
          {cartItems.length === 0 ? (
            <Typography>No hay productos en el carrito.</Typography>
          ) : (
            <div>
              {isMobile ? (
                <></>
              ) : (
                <>
                  <Grid container spacing={2} justifyContent="flex-end">
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6">Producto</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6">Color</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6">Precio</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6">Cantidad</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6">Subtotal</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6">Eliminar</Typography>
                    </Grid>
                  </Grid>
                </>
              )}

              {cartItems.map((item) => (
                <>
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(
                      productId,
                      newQuantity,
                      color,
                      size,
                      price
                    ) =>
                      updateQuantitys(
                        productId,
                        newQuantity,
                        color,
                        size,
                        price
                      )
                    }
                    onDelete={(productId, color) =>
                      removeFromCart(productId, item.color)
                    }
                  />
                  <hr />
                </>
              ))}

              <Grid container spacing={2} justifyContent="flex-end">
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sm={2}
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "500",
                      color: "#4CAF50",
                    }}
                  >
                    <Typography sx={{ textAlign: "end", color: "black" }}>
                      TOTAL
                    </Typography>{" "}
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                {/* <FormControlLabel
                control={<Checkbox checked={shippingChecked} onChange={() => setShippingChecked(!shippingChecked)} />}
                label="Envío a domicilio(+$80)"
              /> */}
                <a href="/realizarpedido">
                  <Button variant="contained" color="primary">
                    Realizar pedido
                  </Button>
                </a>
              </Grid>
            </div>
          )}
        </div>
      </div>
      <Box sx={{ p:"270px" }}>
      </Box>
      <Footer />
    </>
  );
};
