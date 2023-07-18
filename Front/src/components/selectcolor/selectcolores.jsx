import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
//import { products } from '../../data';

const ColorSelect = ({ product, selectedColor, setSelectedColor, handleColorChange }) => {


  return (
    <FormControl fullWidth >
      <InputLabel sx={{ color: 'white', background: "white", borderRadius: "50%", maxWidth: "20px", maxHeight: "20px" }} id="color-select-label">

      </InputLabel>
      <Select
        labelId="color-select-label"
        id="color-select"
        value={selectedColor}
        onChange={handleColorChange}
        autoWidth

        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        renderValue={() => (
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: "1px solid black",
              backgroundColor: selectedColor.CodigoColor,
              display: 'inline-block',
              marginRight: '5px',
            }}
          />
        )}
      >
        {product?.Stocks?.map((color) => (
          <MenuItem key={color.name} value={color}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: color.CodigoColor, border: "1px solid black" }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColorSelect;
