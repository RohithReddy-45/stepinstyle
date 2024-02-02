import { formatCurrency } from '../../utils/helpers';
function OrderItem({ item }) {
  const { quantity, title, totalPrice, company } = item;

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {title}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">{company}</p>
    </li>
  );
}

export default OrderItem;
