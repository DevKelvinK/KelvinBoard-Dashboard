import { OrderStatus } from '../../core/models/orders/order.model';

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PAID: 'Pago',
  PENDING: 'Pendente',
  CANCELED: 'Cancelado',
  REFUNDED: 'Reembolsado',
};