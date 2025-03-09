import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { IBasket } from "../../app/models/basket";
import { basketApi } from "../home/basket/basketApi";

export const checkoutApi = createApi({
    reducerPath: 'checkoutapi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        createPaymentIntent: builder.mutation<IBasket, void>({
            query: () => {
                return {
                    url: 'payments',
                    method: 'POST',

                }
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        basketApi.util.updateQueryData('fetchBasket',undefined,(draft)=>{
                            draft.clientSecret = data.clientSecret
                        })
                    )
                } catch (error) {
                    console.log('payment intent creation failed', error);

                }
            }
        }),

    })
})
export const {useCreatePaymentIntentMutation} = checkoutApi