import { Product } from "./product";

export interface orderItems {
    _id:string,
    item_quantity:number,
    item_price:number,
    order_id:string,
    product_id:String
    createdAt:Date,
    updatedAt:Date,
}

export interface Order {
    _id:string,
    order_total_amount:number,
    order_delivery_cost:number,
    order_status:string,
    mb_id:string,
    createdAt:Date,
    updatedAt:Date,
    /*from aggregations */
    order_items:orderItems[],
    product_data:Product[]
}



