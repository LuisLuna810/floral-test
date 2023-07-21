import { Typography } from "@mui/material";
import { ProductMetaWrapper, ProductPrice, ProductName } from "../../styles/product";


export default function ProductMeta({ product, matches, selectedPrice }) {
  return (
    <ProductMetaWrapper>
      <ProductName>
        {product.name}
      </ProductName>
      <ProductPrice>
        ${selectedPrice ? selectedPrice.price : product?.prices[0]?.price}
      </ProductPrice>
    </ProductMetaWrapper>
  );
}

/*
    <ProductData>
      <ProductName>
        {product.name}
        </ProductName>
      <ProductPrice>
        ${selectedPrice ? selectedPrice.price : product?.prices[0]?.price}
      </ProductPrice>
    </ProductData>
*/
