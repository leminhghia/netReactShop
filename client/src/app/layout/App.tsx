import axios from "axios";
import { useEffect, useState } from "react";
import { IProduct } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const toggleDarkMode = () =>{
    setDarkMode(!darkMode)
  }

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

  // const addProduct = () =>{
  //   setProducts([...products, {name:'product4',price:300.0}])
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
 
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "radial-gradient(circle, #1e3aBa,#111B27)"
            : "radial-gradient(circle, #bacef9,#f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog product={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
