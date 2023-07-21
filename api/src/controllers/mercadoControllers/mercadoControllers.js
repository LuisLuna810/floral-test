//const mercadopago = require('mercadopago');
const axios = require("axios")
const { Orden, User } = require('../../db')
const { v4: uuidv4 } = require('uuid');

const {
  NOTIFICATION_MERCADOPAGO_FRONT,
  NOTIFICATION_MERCADOPAGO_BACK
} = process.env;

//whatsapp 
const accountSid = 'AC5eadedd02a97cf19742a565e921f1d80';
const authToken = '5a7e6e3a8b6fc63333814f562b693c12';
const client = require('twilio')(accountSid, authToken);

const tokenmp = 'TEST-7747005671618142-071007-2360bfeaa836996ec21b1f0a1adf7e77-1419080211'

const postPagar = async (req, res) => {

  /*mercadopago.configure({
    access_token: "TEST-8021216670138113-070920-8fec9d16d8b40375f92b98e1eb06b24d-235741436"
  });*/

  const preferenceId = uuidv4();

  try {
    const { cart, senderName, receiverName, deliveryType, address, cellphone, pickupTime, userId, username, totalCompras, description } = req.body;

    // Validar que se haya proporcionado el array de productos
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).send({ msg: 'No se proporcionaron productos válidos' });
    }



    if (totalCompras === 5) {
      cart.forEach((producto) => {
        producto.price *= 0.6; // Aplicar descuento del 40%
      });
    }

    // Crear un array de items para la preferencia de pago
    const items = cart.map((producto) => ({
      title: `${producto.name} - ${producto.color}`,
      quantity: producto.quantity,
      currency_id: 'ARS',
      unit_price: producto.price,
    }));


    const preference = {
      items: items,

      back_urls: {
        success: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
        pending: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
        failure: `${NOTIFICATION_MERCADOPAGO_FRONT}/success?preferenceId=${preferenceId}`,
      },
      notification_url: `${NOTIFICATION_MERCADOPAGO_BACK}/pagos/webhook?preferenceId=${preferenceId}`,
    };

    // Crear la preferencia en MercadoPago
    //const response = await mercadopago.preferences.create(preference);
    console.log(response, "soy response, busca payment_id")

    // Obtener el ID de preferencia de pago generado


    // Guardar la orden en la base de datos
    const orden = await Orden.create({
      preferenceId,
      senderName,
      receiverName,
      deliveryType,
      address,
      cellphone,
      pickupTime,
      cart,
      userId: userId,
      username: username,
      description,
      // Otros campos de la orden
    });

    // Redirigir al usuario al checkout de MercadoPago
    res.send({ response });
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).send('Error al procesar el pago');
  }
};


const getMercado = async (req, res) => {
  try {
    const payment = req.query

    console.log(req.query)
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment['data.id'])
      const preferenceId = payment.preferenceId

      const orden = await Orden.findOne({ where: { preferenceId: preferenceId } });
      if (orden && data.body.status === 'approved') {
        orden.estado = 'PAGADO CON EXITO';
        orden.idCompra = payment['data.id'] // numero de id compra q nos da mercadopago

        await orden.save();


        const user = await User.findOne({ where: { id: orden.userId } }) //en mi orden traigo el id del usuario, y verifico cual es el total de sus compras

        if (user) {
          if (user.totalCompras < 5) { // si hay menos de 5 compras, le sumamos 1.
            user.totalCompras = user.totalCompras + 1
            user.save()
          } else {
            user.totalCompras = 0
            user.save()
          }
        }

      }

      client.messages
        .create({
          body: 'Tienes una nueva venta en tu tienda, checala !',
          from: 'whatsapp:+14155238886',
          to: 'whatsapp:+526622297062'
        })
        .then(message => console.log(message.sid))
        .done();


    }
    res.send("webhook")
  } catch (error) {
    console.log(error)
  }
};

const getOrden = async (req, res) => {

  try {
    const preferenceId = req.query.preferenceId;
    const orden = await Orden.findOne({ where: { preferenceId: preferenceId } });

    if (!orden) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    return res.json(orden);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const getAllUserOrden = async (req, res) => {

  try {
    const userId = req.query.userId;
    const orden = await Orden.findAll({ where: { userId: userId } });

    if (!orden) {
      return res.status(404).json({ error: 'Sin Ordenes' });
    }

    return res.json(orden);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllOrden = async (req, res) => {
  try {
    const orden = await Orden.findAll({
      order: [['createdAt', 'DESC']]
    });

    if (!orden || orden.length === 0) {
      return res.status(404).json({ error: 'Sin Ordenes' });
    }

    return res.json(orden);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};




module.exports = {
  getMercado, postPagar, getOrden, getAllUserOrden, getAllOrden
};