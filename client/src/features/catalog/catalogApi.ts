import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const catalogApi = createApi({
    reducerPath:'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints:(builder)=>({
        fetchProducts:builder.query<IProduct[],void>({
            query: () => ({url:'products'})
        }),
        fetchProductDetails:builder.query<IProduct, number>({
            query:(productId) => `products/${productId}`
        })
    })
})

export const {useFetchProductsQuery,useFetchProductDetailsQuery} = catalogApi;