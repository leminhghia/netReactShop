
export interface IOrder {
  id: number
  buyerEmail: string
  shippingAddress: IShippingAddress
  orderDate: string
  orderItems: IOrderItem[]
  subTotal: number
  deliveryFee: number
  discount: number
  total: number
  orderStatus: string
  paymentSummary: IPaymentSummary
}

export interface IShippingAddress {
  name: string
  line1: string
  line2?: string | null
  city: string
  state: string
  postal_code: string
  country: string
}

export interface IOrderItem {
  productId: number
  name: string
  pictureUrl: string
  price: number
  quantity: number
}

export interface IPaymentSummary {
  last4: number | string
  brand: string
  exp_month: number
  exp_year: number
}

export interface CreateOrder{
    shippingAddress: IShippingAddress,
    paymentSummary: IPaymentSummary
}