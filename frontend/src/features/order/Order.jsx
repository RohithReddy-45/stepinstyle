import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiProducts';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state == 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  const { id, priority, priorityPrice, orderPrice, estimatedDelivery, cart } =
    order[0];

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order {id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {deliveryIn < 1 ? 'Delivered' : 'Preparing'} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-secondary px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 1
            ? `Only ${calcMinutesLeft(
                estimatedDelivery,
              )} minutes left to deliver`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-gray-400">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-secondary border-b border-t border-secondary">
        {cart?.map((item) => (
          <OrderItem key={item.productId} item={item} />
        ))}
      </ul>

      <div className="space-y-2 bg-secondary px-6 py-5">
        <p className="text-sm font-medium text-gray-400">
          Price: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-gray-400">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && deliveryIn >= 1 && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const { order } = await getOrder(params.orderId);

  return order;
}

export default Order;
