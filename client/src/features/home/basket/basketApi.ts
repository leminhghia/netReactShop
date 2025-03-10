import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../../app/api/baseApi";
import { IBasket, IItem } from "../../../app/models/basket";
import { IProduct } from "../../../app/models/product";
import Cookies from 'js-cookie'
function isBasketItem(product: IProduct | IItem): product is IItem {
    return (product as IItem).quantity !== undefined;

}

export const basketApi = createApi({
    reducerPath: 'basketApi',
    tagTypes: ['Basket'],
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchBasket: builder.query<IBasket, void>({
            query: () => 'basket',
            providesTags: ['Basket']
        }),
        addBasketItem: builder.mutation<IBasket, { product: IProduct | IItem, quantity: number }>({
            query: ({ product, quantity }) => {
                const productId = isBasketItem(product) ? product.productId : product.id;

                return {
                    url: `basket?productId=${productId}&quantity=${quantity}`,
                    method: 'POST'
                }

            },
            onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
                let isNewBasket = false;
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        const productId = isBasketItem(product) ? product.productId : product.id;

                        if (!draft.basketId) isNewBasket = true;
                        if (!isNewBasket) {
                            const existingItem = draft.items.find(item => item.productId === productId)
                            if (existingItem) existingItem.quantity += quantity;
                            else draft.items.push(isBasketItem(product) ? product : { ...product, productId: product.id, quantity });
                        }


                    })
                )

                try {
                    await queryFulfilled;
                    dispatch(basketApi.util.invalidateTags(['Basket']));
                } catch (error) {
                    console.log(error)
                    patchResult.undo();
                }
            }
        }),
        removeBasketItem: builder.mutation<void, { productId: number, quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `basket?productId=${productId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({ productId, quantity }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        const itemIndex = draft.items.findIndex(item => item.productId === productId)
                        if (itemIndex >= 0) {
                            draft.items[itemIndex].quantity -= quantity;
                            if (draft.items[itemIndex].quantity <= 0) {
                                draft.items.splice(itemIndex, 1);
                            }
                        }
                    })
                )
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error);
                    patchResult.undo();

                }
            }
        }),
        //parameter, return
        //mutaion <void,void>
        clearBakset: builder.mutation<void, void>({
            queryFn: () => ({ data: undefined }),
            onQueryStarted: async (_, { dispatch }) => {
                dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        draft.items = [];
                        draft.basketId = '';
                    })
                );
                Cookies.remove('basketId');
            }
        })
    })
});

export const { useFetchBasketQuery, useAddBasketItemMutation, useRemoveBasketItemMutation, useClearBaksetMutation } = basketApi;