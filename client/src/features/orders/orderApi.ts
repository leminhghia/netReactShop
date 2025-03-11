import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { CreateOrder, IOrder } from "../../app/models/order";

export const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery:baseQueryWithErrorHandling,
    tagTypes:['Orders'],
    endpoints:(builder) => ({
        fetchOrders: builder.query<IOrder[],void>({
            query:() => 'orders',
            providesTags:['Orders']
            
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
            }),
            onQueryStarted:async (_,{dispatch,queryFulfilled}) =>{
                await queryFulfilled;
                dispatch(orderApi.util.invalidateTags(['Orders']))
            }
        })
    })
})

export const {useFetchOrdersQuery,useFetchOrderDetailedQuery,useCreateOrderMutation} = orderApi