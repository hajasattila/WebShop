import { Timestamp } from "firebase/firestore";

export interface Order {
    id?: string;
    person: string;
    productName: string;
    quantity: number;
    timestamp: string;
    totalPrice: number;
}