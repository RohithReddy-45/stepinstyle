import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="bg-accent2 border-secondary flex items-center justify-between border-b px-4 py-3 text-lg sm:px-6">
      <Link to="/">stepinstyle</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
