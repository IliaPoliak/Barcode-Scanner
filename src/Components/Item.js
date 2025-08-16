import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Item = () => {
  const { isbn } = useParams();
  return (
    <div className="flex items-center justify-center flex-col">
      <Link
        className="text-white bg-green-600 px-5 py-3 m-5 rounded-3xl font-bold  hover:bg-green-700  active:shadow-2xl"
        to="/scan"
      >
        Scan Another Item
      </Link>

      <div>Item: {isbn}</div>
    </div>
  );
};
export default Item;
