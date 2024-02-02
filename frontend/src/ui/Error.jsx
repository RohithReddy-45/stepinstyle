import LinkButton from './LinkButton';

function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold">Something went wrong 😢</h1>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
