import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import { memo } from 'react';

function MenuItem({ product }) {
  const dispatch = useDispatch();
  const { id, title, price, soldOut, company, imageUrl, reviews, stars } =
    product;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      productId: id,
      title,
      quantity: 1,
      price,
      company,
      totalPrice: price * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex flex-col gap-4 rounded-lg bg-secondary px-5 py-3">
      <img
        src={imageUrl}
        loading="lazy"
        alt={title}
        className={`h-44 rounded-md ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col gap-4 pt-2">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <p className="text-sm capitalize italic text-gray-300">{company}</p>
        </div>
        <div className="mt-auto flex flex-col gap-4">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(price)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-gray-400">
              Sold out
            </p>
          )}

          <div className="flex items-center gap-2 divide-x-2 divide-gray-500 text-gray-400">
            {stars}
            <img src="/star.svg" alt="star" className="h-5 w-5" />
            <span className="pl-2">{reviews} (reviews)</span>
          </div>

          {isInCart && (
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <UpdateItemQuantity
                productId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem productId={id} />{' '}
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default memo(MenuItem);
