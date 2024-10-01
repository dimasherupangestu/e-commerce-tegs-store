export interface DeliveryDetail {
    service: string;
    description: string;
    cost: {
      value: number;
      etd: string;
      note: string;
    }[];
}
export interface ProductItem {
    id: string;
    product_name: string;
    quantity: number;
    price: number;
    productId: number;
    createad_at: string;
    updated_at: string;
}
  
export interface OrderStatus {
    id: string;
    transaction_id: string;
    customer_name: string;
    customer_email: string;
    delivery_details: string;
    product: ProductItem[];
    payment_method: string;
    service_fee: number;
    snap_redirect_url: string;
    snap_token: string;
    status: string;
    total: number;
    createad_at: string;
    updated_at: string;
}
  