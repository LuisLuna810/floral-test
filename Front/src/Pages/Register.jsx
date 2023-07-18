import React from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from "yup";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,

  Paper,
  Box,
  Grid,
  Typography
} from '@mui/material';


import { register } from '../state/actions/user';


//components



//-------------------- Assets --------------------------
import imageLogin from "../assets/12.png"





function Copyright(props) {

  const dispatch = useDispatch()



  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Todo Floral
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const initialValuesLogin = {
  username: '',
  email: '',
  password: '',
}


const loginSchema = Yup.object().shape({
  username: Yup.string().required('Complete este campo'),
  email: Yup.string().email('mail inválido').required('Debes colocar un email'),
  password: Yup.string().required('Complete este campo').matches(
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
    'La contraseña debe tener mínimo 8 caracteres, 1 número y un simbolo.'
  )
})



export function RegisterForm() {

  const theme = useTheme();
  const loginFont = theme.palette.primary.loginFont
  const loginbackground = theme.palette.background.login
  const logininput = theme.palette.background.logininput
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleFormSubmit = (values) => {
    const data = new FormData();
    for (let value in values) {
      data.append(value, values[value])
    }
    let aregistrar = {
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username')
    }

    dispatch(register(aregistrar))

  };
  return (
    <div>
      <Grid container component="main" sx={{ alignItems: "center", background: loginbackground }}>
        <Grid
          item
          md={7}
          sx={{
            display: { xs: "none", md: "flex", sm: "none" },
            justifyContent: "center",

          }}
        >
          <Grid sx={{ display: "flex", maxWidth: "568px", marginBottom: "100px", maxHeight: "497px", justifyContent: "center", display: "flex" }}>
            <Box minWidth={"400px"} maxWidth={"400px"}>
              <img style={{ maxWidth: "400px", minWidth: "400px" }} src={imageLogin}></img>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={5} elevation={6} square sx={{ justifyContent: "center", display: "flex" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              maxWidth: "400px",
              maxHeight: "497px"
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontSize: "30px", fontWeight: "600", color: loginFont, marginBottom: "18px" }}>
              Crear cuenta Todo Floral
            </Typography>
            <Typography component="h1" variant="h5" sx={{ fontSize: "14px", fontWeight: "400", color: loginFont, lineHeight: "20px", marginBottom: "18px" }}>
              ¿Ya tienes cuenta? <Link to="/login" style={{ textDecoration: 'underline', color: '#00D5FA' }}>
                Inicia sesión.</Link >
              Tomara solo unos segundos
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesLogin}
                validationSchema={loginSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm
                }) => (
                  <Box component='form' onSubmit={handleSubmit}>
                    <Typography sx={{ fontWeight: "500", fontSize: "14px", color: loginFont, marginBottom: "2px" }}>
                      Nombre y apellido
                    </Typography>
                    <TextField
                      sx={{ marginBottom: "27px", background: logininput }}

                      required
                      fullWidth
                      id="username"
                      label="Ingresa tu nombre y apellido"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="username"
                      autoComplete="username"
                      error={
                        Boolean(touched.username) && Boolean(errors.username)
                      }
                      helperText={touched.username && errors.username}
                    />
                    <Typography sx={{ fontWeight: "500", fontSize: "14px", color: loginFont, marginBottom: "2px" }}>
                      Email
                    </Typography>
                    <TextField
                      sx={{ marginBottom: "27px", background: logininput }}

                      required
                      fullWidth
                      id="email"
                      label="Ingresa tu email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      autoComplete="email"
                      error={
                        Boolean(touched.email) && Boolean(errors.email)
                      }
                      helperText={touched.email && errors.email}
                    />
                    <Typography sx={{ fontWeight: "500", fontSize: "14px", color: loginFont, marginBottom: "2px" }}>
                      Contraseña
                    </Typography>
                    <TextField
                      sx={{ marginBottom: "22px", background: logininput }}
                      required
                      fullWidth
                      name="password"
                      label="Ingresa tu contraseña"

                      type="password"
                      id="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      autoComplete="current-password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                    />
                    {/* <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Recuerdame"
                    /> */}

                    <Button
                      type="submit"
                      fullWidth
                      variant='outlined'
                      sx={{ color: loginFont, fontSize: "12px", fontWeight: "600", marginTop: "8px", marginBottom: "24px", background: logininput, textTransform: "none" }}
                    >
                      Crear cuenta
                    </Button>
                    {/*                           google auth  */}
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}