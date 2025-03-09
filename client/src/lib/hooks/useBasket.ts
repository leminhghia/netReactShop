import { IItem } from "../../app/models/basket";
import { useClearBaksetMutation, useFetchBasketQuery } from "../../features/home/basket/basketApi";

export const useBasket = () =>{
    const {data: basket} = useFetchBasketQuery();
    const [clearBasket] = useClearBaksetMutation();

    const subtotal = basket?.items.reduce((sum: number, item:IItem) => sum + item.quantity * item.price, 0)?? 0;
    const deliveryFee = subtotal > 1000 ? 0 : 500;
    const total = subtotal + deliveryFee;
    return {basket,subtotal,deliveryFee,total,clearBasket}
}

