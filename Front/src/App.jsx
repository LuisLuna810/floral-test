import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import theme from '../src/styles/theme/index';
import { UIProvider } from './context/ui';


// Pages
import { Home } from './Pages/Home';
import { Productos } from './Pages/Products'
import { Servicios } from './Pages/Servicios'
import { SnackCalculator } from './Pages/SnackCart';
import { Cart } from './Pages/Cart';
import { Account } from './Pages/Account';
import { LogInForm } from './Pages/Login'
import { RegisterForm } from './Pages/Register';
import { FormFinal } from './Pages/FormFinal';
import { Orden } from './Pages/Orden'

// Pages Admin

import { ProductForm } from './PagesAdmin/createProduct';
import { ColorPickerComponent } from './PagesAdmin/createColor';
import { AdminNavbar } from './PagesAdmin/panel';
import { CategoryComponent } from './PagesAdmin/createCategory';
import { CreateSnack } from './PagesAdmin/createSnack';
import Ordenes from './PagesAdmin/Ordenes';
import ProductDelete from './PagesAdmin/ProductDelete';
import SnackDelete from './PagesAdmin/SnackDelete';
import CategoryDelete from './PagesAdmin/CategoryDelete';


// Components
import Appbar from './components/appbar';
import SearchBox from './components/search';
import AppDrawer from './components/drawer';


import './App.css';

function App() {


  const userData = localStorage.getItem('userData');
  const token = userData ? JSON.parse(userData).user : null;
  const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const decodedToken = decoded?.user
  //console.log(decodedToken);



  return (
    <div className='App'>

      <ThemeProvider theme={theme} >
        <CssBaseline />
        <UIProvider><Appbar /><SearchBox /><AppDrawer /> </UIProvider>    {/* NavBar + Search + MobileNav */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/snackcart' element={<SnackCalculator />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/realizarpedido' element={<FormFinal decodedToken={decodedToken} />} />
          <Route path='/success' element={<Orden />} />

          {decodedToken && decodedToken.username ?
            (<>
              <Route path='/account' element={<Account decodedToken={decodedToken} />} /></>)
            :
            (<>
              <Route path='/account' element={<LogInForm />} />
              <Route path='/login' element={<LogInForm />} />
              <Route path='/register' element={<RegisterForm />} />
            </>
            )}

          {decodedToken && decodedToken.admin ?
            (<>
              <Route path='/admin/createproduct' element={<ProductForm />} />
              <Route path='/admin/createcolor' element={<ColorPickerComponent />} />
              <Route path='/admin/createcategoria' element={<CategoryComponent />} />
              <Route path='/admin' element={<AdminNavbar />} />
              <Route path='/admin/ordenes' element={<Ordenes />} />
              <Route path='/admin/createsnack' element={<CreateSnack />} />
              <Route path='/admin/deleteproduct' element={<ProductDelete />} />
              <Route path='/admin/deletesnack' element={<SnackDelete />} />
              <Route path='/admin/deletecategory' element={<CategoryDelete />} />
            </>) : (<></>)}

        </Routes>
      </ThemeProvider>

    </div>
  );
}

export default App;
