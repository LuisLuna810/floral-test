import { useState, useEffect } from "react";
import { Box, Button, MenuItem, Select, TextField, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment-timezone";
import imageEnvio from "../assets/envio.jpg"
import { useDispatch, useSelector } from 'react-redux';
import { Pagar } from "../state/actions/mercadoPago"
import { addProduct, removeProduct } from "../state/slices/CartSlice";
const apiUrl = import.meta.env.VITE_API_URL;


export const FormFinal = ({ decodedToken }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const [cartItems, setCartItems] = useState(cart);
  const [priceTotal, setPriceTotal] = useState(0)
  const [termsAcepted, setTermsAcepted] = useState(false);
  //const [isSubmitting, setIsSubmitting] = useState(false);

  const [userCompras, setUserCompras] = useState(null)

  useEffect(() => {
    // Aquí puedes establecer el valor del userId

    const fetchUserCompras = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/totalcompras?id=${decodedToken?.id ? decodedToken.id : "-"}`);
        const data = await response.json();
        setUserCompras(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCompras();
  }, []);

  const pickupTimeOptions = generatePickupTimeOptions();

  const initialValues = {
    senderName: "",
    receiverName: "",
    deliveryType: "",
    address: "",
    cellphone: "",
    pickupTime: "",
    description: "",
    checkTerms: false,
  };

  const validationSchema = Yup.object().shape({
    senderName: Yup.string().required("Campo requerido"),
    receiverName: Yup.string().required("Campo requerido"),
    cellphone: Yup.number().required("Campo requerido").typeError("Debe ser un numero"),
    deliveryType: Yup.string().required("Campo requerido"),
    checkTerms: Yup.boolean().oneOf([true], "Debe aceptar los terminos y condiciones"),
    
  });


  const InvitadoId = "48ad6fdc-a31a-49a3-aca1-b157755d745e"

  const onSubmit = (values) => {
    console.log("payload");
    if (values.deliveryType === "address" && !values.address) {

      alert("Por favor, completa una direccion para hacer el envio.");
    }
    if (values.deliveryType === "pickupTime" && !values.pickupTime) {
      alert("Por favor, selecciona un horario para recoger tu compra.");
    }
    else {
      const payload = {
        cart: cart,
        senderName: values.senderName,
        receiverName: values.receiverName,
        pickupTime: values.pickupTime,
        deliveryType: values.deliveryType,
        cellphone: values.cellphone,
        address: values.address,
        description: values.description,
        userId: decodedToken?.id ? decodedToken.id : InvitadoId,
        
        totalCompras: userCompras ? userCompras : 0 // Le envio el total de compras al creador de link de mercadopago para saber si aplicar descuento o no, ya que en el 5 compra se hace descuento
      }
      
      dispatch(Pagar(payload))
    }
  };


  const handleDeliveryTypeChange = (event) => {
    const selectedDeliveryType = event.target.value;
    formik.setFieldValue("deliveryType", selectedDeliveryType);

    if (selectedDeliveryType === "address") {
      handleAddEnvio()
      setPriceTotal(80)
      formik.setFieldValue("pickupTime", "");
    } else if (selectedDeliveryType === "pickupTime") {
      setPriceTotal(0)
      handleDeleteEnvio()
      formik.setFieldValue("address", "");
    }
  };

  function generatePickupTimeOptions() {
    const startHour = moment().tz("America/Hermosillo").add(2, "hours").startOf("hour");
    const endHour = moment().tz("America/Hermosillo").add(12, "hours").endOf("hour");
    const interval = 2;
    const options = [];

    while (startHour.isSameOrBefore(endHour)) {
      options.push(startHour.format("HH:mm"));
      startHour.add(interval, "hours");
    }

    return options;
  }
  const logge = () => console.log("payload");

  const formik = useFormik({
    initialValues,
    logge,
    validationSchema,
    onSubmit,
  });

  const handleAddEnvio = () => {
    const priceEnvio =
    {
      id: "4c8d59f7-2c46-4c4f-bd86-329cdde5857e",
      name: "Envio a domicilio",
      image: imageEnvio,
      price: 80,
      color: "--",
      ColorName: "--",
      quantity: 1

    };
    dispatch(addProduct(priceEnvio));
  };

  const handleDeleteEnvio = () => {
    const productId = "4c8d59f7-2c46-4c4f-bd86-329cdde5857e"
    const color = "--"
    dispatch(removeProduct({ productId, color }));
  };


  const calculateTotal = () => {
    let total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0); // suma de todo + envio si es que tiene
    const contieneEnvio = cartItems.some(producto => producto.id === "4c8d59f7-2c46-4c4f-bd86-329cdde5857e");
    let total2 = contieneEnvio ? total : total + priceTotal

    return total2;
  };


  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography sx={{ fontSize: "38px" }}>Completa tus datos para recibir tu producto</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="senderName"
          name="senderName"
          label="Nombre del comprador"
          value={formik.values.senderName}
          onChange={formik.handleChange}
          error={formik.touched.senderName && Boolean(formik.errors.senderName)}
          helperText={formik.touched.senderName && formik.errors.senderName}
          fullWidth
          margin="normal"
        />

        <TextField
          id="receiverName"
          name="receiverName"
          label="Nombre de quien recibe"
          value={formik.values.receiverName}
          onChange={formik.handleChange}
          error={formik.touched.receiverName && Boolean(formik.errors.receiverName)}
          helperText={formik.touched.receiverName && formik.errors.receiverName}
          fullWidth
          margin="normal"
        />
        <Typography sx={{ fontWeight: "600" }}>Tipo de entrega</Typography>

        <Select
          id="deliveryType"
          name="deliveryType"
          label="Tipo de entrega"
          value={formik.values.deliveryType}
          onChange={handleDeliveryTypeChange} 
          fullWidth
          margin="normal"
          error={formik.touched.deliveryType && Boolean(formik.errors.deliveryType)}
          helperText={formik.touched.deliveryType && formik.errors.deliveryType}
        >
          <MenuItem value="">Seleccionar</MenuItem>
          <MenuItem value="address">Domicilio</MenuItem>
          <MenuItem value="pickupTime">Pasar a recoger</MenuItem>
        </Select>

        {formik.values.deliveryType === "address" && (
          <>
            <TextField
              id="address"
              name="address"
              label="Dirección"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
              margin="normal"

            />
            <Typography sx={{ fontWeight: "600", fontSize: "12px" }}>+80$ envio a domicilio</Typography>

          </>
        )}

        {formik.values.deliveryType === "pickupTime" && (
          <Select
            id="pickupTime"
            name="pickupTime"
            label="Horario de recoger"
            value={formik.values.pickupTime}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
          >
            {pickupTimeOptions.map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        )}

        <TextField
          id="cellphone"
          name="cellphone"
          label="Celular"
          value={formik.values.cellphone}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
          helperText={formik.touched.cellphone && formik.errors.cellphone}
        />
        <TextField
          id="description"
          name="description"
          label="Referencia"
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.touched.description && formik.errors.description}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAcepted}
              onChange={(e) => setTermsAcepted(e.target.checked)}
              name="checkTerms"
            />
          }
          label="Acepto los términos y condiciones"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "8px", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: 400 }}>Total a pagar  <span style={{ fontWeight: 600 }}>${calculateTotal().toFixed(2)}</span></Typography>

            {userCompras && userCompras === 5 ?
              (<>
                <Typography sx={{ color: "green", textAlign: "end" }}><span style={{ color: "red" }}>- ${calculateTotal().toFixed(2) * 0.4} </span> </Typography>
                <Typography sx={{ color: "green" }}>¡Esta es tu 5ta compra </Typography>
                <Typography sx={{ color: "green" }}>40% de descuento!</Typography>
              </>) :
              (<></>)
            }

          </Box>
        </Box>
        <Button sx={{ background: "green", fontSize: "18px", maxWidth: "800px", width: "100%", marginBottom: "36px" }} type="submit" variant="contained" color="primary" disabled={!termsAcepted}>
          PAGAR
        </Button>
        <img
          src="https://imgmp.mlstatic.com/org-img/banners/mx/medios/MLM_575X40_new.jpg"
          title="Mercado Pago - Medios de pago"
          alt="Mercado Pago - Medios de pago"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </form>
    </Box>
  );
};