import { createApi } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { IProductParams } from "../../app/models/productParams";
import { filterEmptyValue } from "../../lib/util";
import { IPagination } from "../../app/models/pagination";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        // fetchProducts:builder.query<IProduct[],void>({
        // fetchProducts: builder.query<IProduct[], IProductParams>({
        fetchProducts: builder.query<{items:IProduct[], pagination: IPagination}, IProductParams>({

            query: (productParams) => {
                return {
                    url: 'products',
                    params: filterEmptyValue(productParams)
                }
            },
            transformResponse:(items: IProduct[], meta) =>{
                const paginationHeader = meta?.response?.headers.get('Pagination')
                const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
                return {items,pagination}
            }
        }),
        fetchProductDetails: builder.query<IProduct, number>({
            query: (productId) => `products/${productId}`
        }),
        fetchFilters: builder.query<{ brands: string[], types: string[] }, void>({
            query: () => 'products/filters'
        })
    })
})

export const { useFetchProductsQuery, useFetchProductDetailsQuery, useFetchFiltersQuery } = catalogApi;