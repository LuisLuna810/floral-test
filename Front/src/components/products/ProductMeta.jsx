
import { Typography } from "@mui/material";
import { ProductMetaWrapper } from "../../styles/product";
export default function ProductMeta({ product, matches, selectedPrice }) {
    return (
      <ProductMetaWrapper>
        <Typography variant={matches ? "h6" : "h5"} lineHeight={2}>
          {product.name}
        </Typography>
        <Typography sx={{fontWeight:"600"}} variant={matches ? "caption" : "body1"}>
          ${selectedPrice?selectedPrice.price:product?.prices[0]?.price} 
        </Typography>
      </ProductMetaWrapper>
    );
}