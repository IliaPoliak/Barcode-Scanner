import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="fixed inset-0 flex items-end justify-center">
      <Link
        className="text-white bg-green-600 px-5 pt-3 pb-4 m-[5vh] rounded-3xl font-bold  hover:bg-green-700  active:shadow-2xl"
        to="/scan"
      >
        Start Scanning
      </Link>
    </div>
  );
};
export default Home;
