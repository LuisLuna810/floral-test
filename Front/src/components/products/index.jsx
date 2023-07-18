import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
//import { products } from "../../data";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";
import { getAllProduct } from "../../state/actions/createProduct";

export default function Products() {

  const dispatch = useDispatch()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const { products } = useSelector((state)=>state.products)

  console.log(products, "xd")
  const categories = [
    { id: 1, name: "Flores" },
    { id: 2, name: "Rosas" },
    { id: 3, name: "Girasoles" },
    
  ];

  useEffect(()=>{
    dispatch(getAllProduct())
  },[])

  const filterProducts = () => {
    //let filtered = products?.products?products.products:[]
    let filtered = products && products.products ? JSON.parse(JSON.stringify(products.products)) : [];

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.categories.some((cat) => cat.name === selectedCategory)
      );
    }

    if (selectedPrice === "menor") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "mayor") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleCategoryChange = (event) => {
    setCurrentPage(1)
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleSearchChange = (event) => {
    setCurrentPage(1)
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderProducts = () => {
    const filteredProducts = filterProducts();
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

    return currentProducts.map((product) => (
      <Grid
        item
        key={product.id}
        xs={2}
        sm={4}
        md={4}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        {matches ? (
          <SingleProduct product={product} matches={matches} />
        ) : (
          <SingleProductDesktop product={product} matches={matches} />
        )}
      </Grid>
    ));
  };

  const pageCount = Math.ceil(filterProducts().length / productsPerPage);

  const renderPagination = () => {
    const paginationButtons = [];
    for (let i = 1; i <= pageCount; i++) {
      paginationButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? "contained" : "outlined"}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return paginationButtons;
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between"  }}>
      <Box sx={{ marginBottom: "16px", width:"70%" }}>
        <TextField
          label="Buscar producto"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "100%" }}
        />
      </Box>
      <Box sx={{ marginBottom: "16px", display:"flex", flexWrap:"wrap"}}>
        <FormControl sx={{ marginRight: "16px", width:"120px" }}>
          <InputLabel id="category-label">Categoría:</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl sx={{width:"90px"}}>
          <InputLabel id="price-label" >Precio:</InputLabel>
          <Select
            labelId="price-label"
            id="price"
            value={selectedPrice}
            onChange={handlePriceChange}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="menor">Menor</MenuItem>
            <MenuItem value="mayor">Mayor</MenuItem>
          </Select>
        </FormControl> */}
      </Box>

      
    </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px`, minHeight:"600px" }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts()}
      </Grid>

      <Box sx={{ textAlign: "center" }}>{renderPagination()}</Box>
    </Container>
  );
}

