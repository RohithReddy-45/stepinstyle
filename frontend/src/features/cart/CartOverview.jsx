import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartQuantity, getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-secondary px-4 py-4 text-sm uppercase text-white sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-white sm:space-x-6">
        <span>{totalCartQuantity} items</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart" className="tracking-widest">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
