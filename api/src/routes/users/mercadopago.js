const { Router } = require("express");
const router = Router();
const { getMercado , postPagar, getOrden, getAllUserOrden, getAllOrden} = require("../../controllers/mercadoControllers/mercadoControllers")
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-3681466089106286-041614-9c37080cd32c6cebdecde030ae7ab93b-235741436', //acces token
  });


router.post("/webhook", getMercado)

router.post("/pagar", postPagar)

router.get("/orden", getOrden)
router.get("/ordenuser", getAllUserOrden)
router.get("/ordentodas", getAllOrden)


module.exports = router;