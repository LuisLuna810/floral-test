import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    container: 'my-toast-container', // Clase CSS para el contenedor principal
    popup: 'my-toast-popup' // Clase CSS para el cuadro emergente
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    document.querySelector('.my-toast-popup').style.zIndex = '999999999999999999999999999';
  }

})


const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item.id === product.id && item.color === product.color && product.size === item.size && product.price === item.price);

      if (existingProduct) {
        if (existingProduct.id === "4c8d59f7-2c46-4c4f-bd86-329cdde5857e") {
          existingProduct.quantity = 1
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully envio'
          })
        } else {
          existingProduct.quantity += product.quantity;
          Toast.fire({
            icon: 'success',
            title: `Se agrego +1 ${product.name} ${product.quantityPrice ? "x" + product.quantityPrice : ""} al carrito`,

          })
        }

      } else {
        state.push(product);
        Toast.fire({
          icon: 'success',
          title: `${product.name} ${product.quantityPrice ? "x" + product.quantityPrice : ""}  se agrego al carrito`
        })
      }
    },
    removeProduct: (state, action) => {

      const { productId, color } = action.payload;
      const index = state.findIndex((item) => item.id === productId && item.color === color);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, color, size, price } = action.payload;
      const product = state.find((item) => item.id === productId && item.color === color && item.price === price && item.size === size);
      if (product && product.id != "4c8d59f7-2c46-4c4f-bd86-329cdde5857e") {
        product.quantity = quantity;
      }
    },
  },
});

export const { addProduct, removeProduct, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;