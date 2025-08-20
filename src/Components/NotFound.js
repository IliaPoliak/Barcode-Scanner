import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex items-end justify-center">
      <div className="absolute top-[30vh] flex items-center justify-center flex-col">
        <h1 className="pb-0.5 text-2xl font-bold">404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>

      <Link
        className="relative text-white bg-red-600 px-5 py-3 m-[5vh] rounded-3xl font-bold  hover:bg-red-700  active:shadow-2xl"
        to="/"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
