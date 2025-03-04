import {  Grid2 } from "@mui/material";
import { IProduct } from "../../app/models/product";
import ProductCard from "./ProductCard";

type Props = {
  product: IProduct[];
};

const ProductList = ({ product }: Props) => {
  return (
    <div>
      <Grid2 container spacing={3}>
        {/* dung {} la phai return */}
        {/* props.rpodcuts.map... */}
        {product.map((product) => (
          <Grid2 size={3} display='flex' key={product.id}>
            <ProductCard  product={product} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};
export default ProductList;
