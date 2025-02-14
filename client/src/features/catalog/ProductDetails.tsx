import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../app/models/product";
import axios from "axios";
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
import { Details } from "@mui/icons-material";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://localhost:5001/api/products/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  if (!product) return <div> Loading...</div>;

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
                  <TableCell sx={{ fontWeight: "bold" }}>  {/* td */}
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
              defaultValue={1}
            />
          </Grid>
          <Grid size={6}>
            <Button sx={{height:'55px'}} color="primary" size="large" variant="contained" fullWidth>
              Add to Basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProductDetails;
