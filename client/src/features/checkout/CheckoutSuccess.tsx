import { Box, Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { IOrder } from "../../app/models/order";
import { currencyFormat } from "../../lib/util";

const CheckoutSuccess = () => {
  const { state } = useLocation();
  const order = state.data as IOrder;

  if (!order) return <Typography> Prblem access the order</Typography>;

  const addressString = () => {
    const address = order.shippingAddress;
    return `${address?.name}, ${address?.line1}, ${address?.state}, ${address?.postal_code}, ${address?.country}`;
  };

  const paymentString = () => {
    const card = order.paymentSummary;
    return `${card?.brand?.toLocaleUpperCase()}, **** **** **** ${
      card.last4
    }, Exp: ${card?.exp_month}/${card?.exp_year}`;
  };

  return (
    <Container>
      <>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Thanks for you fake order
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Your Order <strong>#{order.id}</strong> will never be processed as
          this is a fake shop
        </Typography>
        <Paper
          elevation={1}
          sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              orderdate
            </Typography>
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              {order.orderDate}
            </Typography>
          </Box>
          <Divider />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              payment method
            </Typography>
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              {paymentString()}
            </Typography>
          </Box>
          <Divider />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              shipping address
            </Typography>
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              {addressString()}
            </Typography>
          </Box>
          <Divider />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              Amount
            </Typography>
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              {currencyFormat(order.total)}
            </Typography>
          </Box>
        </Paper>

        <Box display='flex' justifyContent='flex-start' gap={2}>
    
    <Button variant="contained" color="primary" component={Link} to={`/orders/${order.id}`}>
    View your order
    </Button>

    <Button component={Link} to='/catalog' variant="outlined" color="primary">
    Continue Shop
    </Button>
        </Box>
      </>
    </Container>
  );
};
export default CheckoutSuccess;
