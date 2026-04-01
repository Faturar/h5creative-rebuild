declare module "midtrans-client" {
  export interface TransactionDetails {
    order_id: string
    gross_amount: number
  }

  export interface CustomerDetails {
    first_name: string
    email: string
    phone?: string
  }

  export interface ItemDetails {
    id: string
    price: number
    quantity: number
    name: string
  }

  export interface CallbackUrls {
    finish: string
    error: string
    pending: string
  }

  export interface TransactionOptions {
    transaction_details: TransactionDetails
    customer_details: CustomerDetails
    item_details: ItemDetails[]
    callbacks?: CallbackUrls
  }

  export interface TransactionResponse {
    token: string
    redirect_url: string
  }

  export class Snap {
    constructor(options: {
      isProduction: boolean
      serverKey: string
      clientKey: string
    })
    createTransaction(options: TransactionOptions): Promise<TransactionResponse>
    transactionNotification(notification: unknown): Promise<unknown>
  }

  export class CoreApi {
    constructor(options: {
      isProduction: boolean
      serverKey: string
      clientKey: string
    })
  }

  const midtransClient: {
    Snap: typeof Snap
    CoreApi: typeof CoreApi
  }

  export default midtransClient
}
