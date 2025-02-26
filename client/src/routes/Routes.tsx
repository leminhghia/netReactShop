import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import AboutPage from "../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import ServerErros from "../app/errors/ServerErros";
import NotFound from "../app/errors/NotFound";
import Basket from "../features/home/basket/Basket";
import CheckoutPage from "../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {path:'',element:<HomePage/>},
            {path:'/catalog',element:<Catalog/>},
            {path:'/catalog/:id',element:<ProductDetails/>},
            {path:'/about',element:<AboutPage/>},
            {path:'/contact',element:<ContactPage/>},
            {path:'/basket',element:<Basket/>},
            {path:'/checkout',element:<CheckoutPage/>},
            {path:'/server-error',element:<ServerErros/>},
            {path:'/not-found',element:<NotFound/>},
            {path:'*',element:<Navigate replace to='/not-found'/>},

        ]
    }
])