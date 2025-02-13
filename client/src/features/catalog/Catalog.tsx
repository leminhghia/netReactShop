import { IProduct } from "../../app/models/product";
import ProductList from "./ProductList";

type Props = {
  product: IProduct[]
};

// const Catalog = (props: Props) => {
const Catalog = ({ product }: Props) => {
  return (
    <div>
      <ProductList product={product} />
    </div>
  );
};
export default Catalog;
