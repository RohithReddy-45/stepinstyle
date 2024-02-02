import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiProducts';
import MenuItem from './MenuItem';

function Menu() {
  const { products } = useLoaderData();
  return (
    <ul className="my-4 grid grid-cols-1 gap-4 px-10 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
      {products.map((product) => (
        <MenuItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
