import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { CreateOrder, IOrder } from "../../app/models/order";

export const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery:baseQueryWithErrorHandling,
    endpoints:(builder) => ({
        fetchOrders: builder.query<IOrder[],void>({
            query:() => 'orders'
        }),
        fetchOrderDetailed: builder.query<IOrder,number> ({
            query:(id) =>({

        url:`/orders/${id}`
            })
        }),
        createOrder: builder.mutation<IOrder,CreateOrder>({
            query:(order) => ({
                url:'orders',
                method:'POST',
                body:order
            })
        })
    })
})

export const {useFetchOrdersQuery,useFetchOrderDetailedQuery,useCreateOrderMutation} = orderApi