export type OrderStatus = 'PAID' | 'PENDING' | 'CANCELED' | 'REFUNDED';

export interface Order {
  id: number;
  date: Date;
  client: string;
  avatar: string;
  value: number;
  status: OrderStatus;
}