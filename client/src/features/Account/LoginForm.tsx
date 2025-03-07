import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";
const LoginForm = () => {
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const [fetchUSerInfo] = useLazyUserInfoQuery();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: loginSchema) => {
    await login(data);
    await fetchUSerInfo();
    navigate(location.state?.form || "/catalog");
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="8"
      >
        <LockOutlined sx={{ mt: 3, color: "secondary.main", fontSize: 48 }} />
        <Typography variant="h5"> Sign in</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          flexDirection="column"
          gap={3}
          marginY={3}
        >
          <TextField
            fullWidth
            label="Email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            sx={{ my: 3 }}
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button disabled={isLoading} variant="contained" type="submit">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account ?
            <Typography
              sx={{ ml: 2 }}
              component={Link}
              to="/register"
              color="primary"
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginForm;
