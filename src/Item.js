import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Item = () => {
  const { isbn } = useParams();
  return (
    <div className="flex items-center justify-center flex-col">
      <Link
        className="text-white bg-black px-5 py-3 m-5 rounded-3xl font-bold  hover:bg-[#222]  active:shadow-2xl"
        to="/"
      >
        Scan Another Item
      </Link>

      <div>Item: {isbn}</div>
    </div>
  );
};
export default Item;
