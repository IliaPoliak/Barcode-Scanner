import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center">
      <div className="h-[70vh] flex items-center justify-center flex-col">
        <h1 className="pb-0.5 text-2xl font-bold">404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>

      <Link className="red-btn" to="/">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
