import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

// type Props = {
//   product: IProduct[]
// };

// const Catalog = (props: Props) => {
// const Catalog = ({ product }: Props) => {
  const Catalog = () => {
    const{data, isLoading} = useFetchProductsQuery();

    if (isLoading || !data) return <div>Loading ...</div>
    
  // const [products, setProducts] = useState<IProduct[]>([]);
  
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get("https://localhost:5001/api/products");
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, []);



  return (
    <div>
      <ProductList product={data} />
    </div>
  );
};
export default Catalog;
