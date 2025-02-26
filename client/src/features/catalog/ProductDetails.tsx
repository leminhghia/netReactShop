import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid2";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../home/basket/basketApi";
import { ChangeEvent, useEffect, useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const { data: product, isLoading } = useFetchProductDetailsQuery(
    id ? +id : 0
  );
  const item = basket?.items.find((x) => x.productId === +id!); //3
  const [quantity, setQuantity] = useState(0); // 5

  useEffect(() => {
    if (item) return setQuantity(item.quantity);
  }, [item]);

  if (!product || isLoading) return <div> Loading...</div>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) addBasketItem({ product, quantity:updatedQuantity });
    else removeBasketItem({productId: product.id, quantity: updatedQuantity})
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    if (value >= 0) setQuantity(value);
  };

  const productDetails = [
    { Label: "Name", value: product.name },
    { Label: "Description", value: product.description },
    { Label: "Type", value: product.type },
    { Label: "Brand", value: product.brand },
    { Label: "Quantity in stock", value: product.quanityInStock },
  ];

  return (
    <Grid container spacing={6} maxHeight="lg" sx={{ mx: "auto" }}>
      <Grid size={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              "& td": { fontSize: "1rem" },
            }}
          >
            <TableBody>
              {productDetails.map((details, index) => (
                // tr
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {" "}
                    {/* td */}
                    {details.Label}
                  </TableCell>
                  <TableCell>{details.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={6}>
            <Button
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateBasket}
              disabled={
                quantity === item?.quantity || (!item && quantity === 0)
              }
            >
            {item ? 'Update Quantity': 'Add to basket'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProductDetails;
