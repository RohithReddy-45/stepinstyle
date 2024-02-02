import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold text-accent2 md:text-3xl">
        Discover trendy, comfy shoes at
        <span className="text-white"> StepInStyle</span> with our fastest
        delivery for a stylish and swift fashion journey.
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering,{username}
        </Button>
      )}
    </div>
  );
}

export default Home;
