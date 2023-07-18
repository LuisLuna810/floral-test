import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import  { useState,useEffect } from "react";
import { AdminNavbar } from './panel';
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from '../state/actions/createProduct';
import { deleteProduct } from '../state/actions/createProduct';



export default function ProductDelete() {

  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products);



  useEffect(()=>{
    dispatch(getAllProduct())
    
  },[dispatch])

console.log(products.products)

 

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Nombre', width: 500 },
    
    
    
    {
      field: 'preferenceId',
      headerName: 'Detalles',
      
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => {
            
           
            dispatch(deleteProduct(params.id))
            
          }}
          style={{background:"red", borderRadius:"1px solid black", color:"white"}}
        >
          Eliminar
        </button>
      ),
    },
    { field: 'updatedAt', headerName: 'Fecha y hora', width: 200 , color:"green"},
  ];

  return (
    <div>
      <AdminNavbar/>
      
      <Box sx={{display:"flex", justifyContent:"center"}}>
      <Box sx={{display:"flex", width:"90%"}}>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={products.products?products.products:[]}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick // Deshabilita la selección de filas al hacer clic
        />
      </Box>
      </Box>
      </Box>
    </div>
  );
}