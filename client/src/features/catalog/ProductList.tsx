import { Box } from "@mui/material";
import { IProduct } from "../../app/models/product";
import ProductCard from "./ProductCard";

type Props = {
  product: IProduct[];
};


const ProductList = ({ product }: Props) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {/* dung {} la phai return */}
        {/* props.rpodcuts.map... */}
        {
            product.map(product =>(
                <ProductCard key={product.id} product={product} />

            ))
        }
      </Box>
    </div>
  );
};
export default ProductList;
