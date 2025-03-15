import {
  createProductSchema,
  CreateProductSchema,
} from "../../lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

const ProductForm = () => {
  const { control, handleSubmit } = useForm<CreateProductSchema>({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
    defaultValues:{
      name:''
    }
  });

  const onSubmit = (data: CreateProductSchema) => {
    console.log(data);
  };
  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: "lg", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Product details
      </Typography>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <Controller
              render={({ field }) => (
                <TextField {...field} fullWidth label="name" />
              )}
              name="name"
              control={control}
            />
          </Grid2>
          <Box
            display="flex"
            
            sx={{   minWidth: '100%' }}
            justifyContent="space-between"
          > 
            <Button variant="contained" color="inherit">
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </Box>
        </Grid2>
      </form>
    </Box>
  );
};
export default ProductForm;
