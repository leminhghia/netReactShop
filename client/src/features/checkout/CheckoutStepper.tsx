import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import {
  useFetchAddressQuery,
  useUpdateUserAddressMutation,
} from "../Account/accountApi";
import { IAddress } from "../../app/models/user";
import {
  ConfirmationToken,
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import { useBasket } from "../../lib/hooks/useBasket";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Address", "Payment", "Review"];
  const { data: { name, ...restAddress } = {} as IAddress, isLoading } =
    useFetchAddressQuery();
  const { basket,clearBasket } = useBasket();
  const [updateAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const stripe = useStripe();
  const [submiting, setSubmiting] = useState(false);
  const navigate = useNavigate();
  const [confirmationToken, setConfirmationToken] =
    useState<ConfirmationToken | null>(null);
  const { total } = useBasket();

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }

    if (activeStep === 1) {
      if (!elements || !stripe) return;

      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }

    if (activeStep === 2) {
      await confirmPayment();
    }

   if (activeStep < 2) {
    setActiveStep((step) => step + 1);
   } 
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressComplete(event.complete);
  };
  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentComplete(event.complete);
  };

  const confirmPayment = async () => {
    setSubmiting(true);
    try {
      if (!confirmPayment || !basket?.clientSecret)
        throw new Error("Unable to process payment");
      const paymentResult = await stripe?.confirmPayment({
        clientSecret: basket.clientSecret,
        redirect: "if_required",
        confirmParams: {
          confirmation_token: confirmationToken?.id,
        },
      });
      if (paymentResult?.paymentIntent?.status === "succeeded") {
        clearBasket();
        navigate("/checkout/success");
      } else if (paymentResult?.error) {
        throw new Error(paymentResult.error.message);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setActiveStep((step) => step - 1);
    } finally {
      setSubmiting(false);
    }
  };

  const getStripeAddress = async () => {
    const AddressElement = elements?.getElement("address");
    if (!AddressElement) return null;
    const {
      value: { name, address },
    } = await AddressElement.getValue();
    if (name && address) return { ...address, name };

    return null;
  };
  if (isLoading)
    return <Typography variant="h6">Loading checkout ...</Typography>;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <AddressElement
            options={{
              mode: "shipping",
              defaultValues: {
                name: name,
                address: restAddress,
              },
            }}
            onChange={handleAddressChange}
          />
          <FormControlLabel
            sx={{ display: "flex", justifyContent: "end" }}
            control={
              <Checkbox
                checked={saveAddressChecked}
                onChange={(e) => setSaveAddressChecked(e.target.checked)}
              />
            }
            label={"Save as default"}
          />
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement onChange={handlePaymentChange} options={{
            wallets:{
              applePay:'never',
              googlePay:"never"
            }
          }}/>
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review confirmationToken={confirmationToken} />
        </Box>
      </Box>
      <Box display="flex" pt={2} justifyContent="space-between">
        <Button onClick={handleBack}>Back</Button>
        <Button
          onClick={handleNext}
          disabled={
            (activeStep === 0 && !addressComplete) ||
            (activeStep === 1 && !paymentComplete) ||
            submiting
          }
          loading={submiting}
        >
          {activeStep === steps.length - 1
            ? `Pay ${currencyFormat(total)}`
            : "Next"}
        </Button>
      </Box>
    </Paper>
  );
};
export default CheckoutStepper;

