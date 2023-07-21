import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Box,
  Card,
  CardContent,
  Radio,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./SnackCalculator.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addProduct } from "../state/slices/CartSlice";
import { getSnacks } from "../state/actions/createSnack";
import { useSelector } from "react-redux";
import swal from "sweetalert";

import Footer from "../components/footer";

const StepContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const SnackCalculator = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [cantidad, setCantidad] = useState(0);
  const [formData, setFormData] = useState({
    id: 1,
    name2: "Snacks:",
    guests: "",
    snacks: [],
    selectedSnacks: [],
    eventDate: "",
    total: 0,
  });

  const { snack } = useSelector((state) => state.snack);

  useEffect(() => {
    dispatch(getSnacks());
  }, [dispatch]);

  const handleAddToCart = () => {
    const { id, name2, selectedSnacks, guests, total, eventDate } = formData;
    // O la cantidad deseada
    const snacksName = selectedSnacks.map((el) => el);
    const name =
      name2 +
      " " +
      snacksName.join(", ") +
      " x" +
      guests +
      " Fecha:" +
      eventDate;

    const price = total;
    const quantity = 1;
    const image =
      "https://static.vecteezy.com/system/resources/previews/005/013/755/original/snack-logo-design-with-cassava-chips-icon-and-letter-s-initials-free-vector.jpg";

    const productData = { id, name, price, image, quantity };
    dispatch(addProduct(productData));
    window.location.href = "/cart";
  };

  const snackOptions = [
    {
      cantidad: 50,
      name: "Pack 1",
      price: 2.5,
      description:
        "✨50 vasos locos",
      image:
        "https://img2.freepng.es/20180202/luq/kisspng-popcorn-maker-clip-art-popcorn-transparent-png-5a74c0926c58c7.5964079715176009144438.jpg",
    },
    {
      cantidad: 50,
      name: "Pack 2",
      price: 1.5,
      description:
        "✨50 tostielotes,",
      image:
        "https://www.marialabonita.com/wp-content/uploads/2019/07/chips-sabor-jalapeno-barcel-46g.jpg",
    },
    {
      cantidad: 50,
      name: "Pack 3",
      price: 3,
      description:
        "✨25 vasos locos y 25 tostielotes",
      image:
        "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/fotos/b/0000000000/1545_1.jpg",
    },
    {
      cantidad: 30,
      name: "Pack 1",
      price: 2,
      description: "Pretzels",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71fUvVB-ctL._AC_UL600_SR600,600_.jpg",
    },
    {
      cantidad: 30,
      name: "Pack 2",
      price: 1,
      description: "Candy",
      image: "https://m.media-amazon.com/images/I/91vVgmcL6GL.jpg",
    },
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinish = () => {
    const selectedSnacksData = snack?.snacks?.filter((item) =>
      formData.selectedSnacks.includes(item.name)
    );
    const totalPrice =
      selectedSnacksData.reduce((sum, item) => sum + item.price, 0) *
      formData.guests;

    setFormData((prevFormData) => ({
      ...prevFormData,
      total: totalPrice,
    }));

    const currentDate = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'
    if (formData.eventDate < currentDate) {
      // La fecha ingresada es anterior al día de hoy, muestra una alerta o realiza alguna acción apropiada
      Swal.fire({
        title: "Elige una fecha correcta",
        text: "La fecha debe ser de hoy en adelante!.",
        imageUrl:
          "https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.webp",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      return;
    }

    setStep(step + 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSnackChange = (event) => {
    const { value, checked } = event.target;
    let updatedSelectedSnacks = [...formData.selectedSnacks];

    if (checked) {
      updatedSelectedSnacks.push(value);
    } else {
      updatedSelectedSnacks = updatedSelectedSnacks.filter(
        (item) => item !== value
      );
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedSnacks: updatedSelectedSnacks,
    }));
  };

  const renderStepOne = () => {
    return (
      <CSSTransition key="step1" classNames="slide" timeout={500}>
        <StepContainer className="step-1">
          <Typography
            sx={{
              margin: "50px",
              fontSize: "32px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            variant="h6"
          >
            Elija el número que se adecue a la cantidad de invitados
          </Typography>
          <Box sx={{ display: "flex", flex: "wrap", gap: "1rem" }}>
            <Button
              onClick={() => {
                setCantidad(30);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              30
            </Button>
            <Button
              onClick={() => {
                setCantidad(50);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              50
            </Button>
            <Button
              onClick={() => {
                setCantidad(80);
                handleNext();
              }}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                borderRadius: "2rem",
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              80
            </Button>
          </Box>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderStepTwo = (cantInvitados) => {
    const filteredSnackOptions = snackOptions.filter(
      (snack) => snack.cantidad === cantInvitados
    );

    return (
      <CSSTransition key="step2" classNames="slide" timeout={500}>
        <StepContainer className="step-2" sx={{ display: "flex" }}>
          <Typography
            sx={{
              marginBottom: "28px",
              fontSize: "32px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            variant="h6"
          >
            Seleccione su Pack preferido
          </Typography>
          <FormGroup sx={{ gap: "1rem", display: "flex", flex: "wrap" }}>
            {filteredSnackOptions.map((snack) => (
              <Box
                container
                rowSpacing={12}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={8}>
                  <Item>
                    <FormControlLabel
                      key={snack.name}
                      control={
                        <Checkbox
                          value={snack.name}
                          checked={formData.selectedSnacks.includes(snack.name)}
                          onChange={handleSnackChange}
                        />
                      }sx={{display: "flex", justifyContent:"flex-start"}}
                      label={`${snack.name} - Incluye: ${snack.description} Precio: $${snack.price}`}
                    />
                  </Item>
                </Grid>

                {/*            <Grid item xs={4}>
                  <Item>
                    <img
                      src={snack.image}
                      alt="imageSnack"
                      style={{ width: "50px", height: "43px", gap: "5px" }}
                    />
                  </Item>
                    </Grid> */}
              </Box>
            ))}
            <Box>
              <CardContent
                sx={{
                  border: "1px solid #e0e0e0",
                  backgroundColor: "#fff",
                  padding: "16px",
                }}
              >
                <Typography variant="body1" sx={{display: "flex", justifyContent:"center",}}>
                  IMPORTANTE
                  </Typography>
                  <Typography sx={{fontSize: "15px"}}>
                  - Todos los Packs incluyen 4 horas de servicio con personal 
                  </Typography>
                  <Typography sx={{fontSize: "15px"}}>
                  - Transporte y montaje eventos fuera de la ciudad con costo de transporte extra 
                </Typography>
              </CardContent>
            </Box>
          </FormGroup>
          <Box>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ margin: "26px" }}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ margin: "26px" }}
            >
              Siguiente
            </Button>
          </Box>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderStepThree = () => {
    return (
      <CSSTransition key="step3" classNames="slide" timeout={500}>
        <StepContainer className="step-3">
          <Typography
            sx={{
              fontSize: "32px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              marginBottom: "28px",
            }}
            variant="h6"
          >
            Paso 3: Ingrese la fecha del evento
          </Typography>
          <TextField
            sx={{ width: "10rem" }}
            label="Fecha del evento"
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ margin: "26px" }}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={handleFinish}
              sx={{ margin: "26px" }}
            >
              Finalizar
            </Button>
          </Box>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderResult = () => {
    return (
      <CSSTransition key="step4" classNames="slide" timeout={500}>
        <StepContainer className="step-4">
          <Typography
            sx={{
              fontSize: "38px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            variant="h6"
          >
            Su carrito de snacks
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              color: "black",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            variant="body1"
          >
            Cantidad de invitados:{" "}
            <div style={{ color: "green" }}> {formData.guests}</div>
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            variant="body1"
          >
            Snacks seleccionados:{" "}
            <div style={{ color: "green" }}>
              {" "}
              {formData.selectedSnacks.join(", ")}
            </div>
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            variant="body1"
          >
            Fecha del evento:{" "}
            <div style={{ color: "green" }}> {formData.eventDate}</div>
          </Typography>
          <Typography
            sx={{
              fontSize: "28px",
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            variant="body1"
          >
            Suma total: $<div style={{ color: "green" }}>{formData.total}</div>
          </Typography>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ margin: "26px" }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{ margin: "26px" }}
          >
            Finalizar
          </Button>
        </StepContainer>
      </CSSTransition>
    );
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo(cantidad);
      case 3:
        return renderStepThree();
      case 4:
        return renderResult();
      default:
        return null;
    }
  };

  return (
    <>
      <Container>
        <TransitionGroup className="steps-container">
          {renderContent()}
        </TransitionGroup>
      </Container>
      <Grid sx={{ padding: "250px" }}></Grid>
      <Footer />
    </>
  );
};
