import { useEffect, useState } from "react";
import { IProduct } from "../../app/models/product";
import ProductList from "./ProductList";
import axios from "axios";

// type Props = {
//   product: IProduct[]
// };

// const Catalog = (props: Props) => {
// const Catalog = ({ product }: Props) => {
  const Catalog = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("https://localhost:5001/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <ProductList product={products} />
    </div>
  );
};
export default Catalog;
