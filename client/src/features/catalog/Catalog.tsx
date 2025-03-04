import { Grid2, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

// type Props = {
//   product: IProduct[]
// };

// const Catalog = (props: Props) => {
// const Catalog = ({ product }: Props) => {
const Catalog = () => {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams);
  const { data: filtersData, isLoading: filterLoading } = useFetchFiltersQuery();

  const dispatch = useAppDispatch();
  if (isLoading || !data || filterLoading|| !filtersData) return <div>Loading ...</div>;

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
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filtersData = {filtersData} />
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList product={data.items} />
            <AppPagination
              metadata={data.pagination}
              onPageChange={(page: number) =>
                dispatch(
                  setPageNumber(page),
                  window.scroll({ top: 0, behavior: "smooth" })
                )
              }
            />
          </>
        ) : (
          <Typography variant="h5">
            {" "}
            there are no result for this filter
          </Typography>
        )}
      </Grid2>
    </Grid2>
  );
};
export default Catalog;
