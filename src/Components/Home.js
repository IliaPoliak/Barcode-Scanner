import { Link } from "react-router-dom";
import { ReactComponent as BarcodeIcon } from "./barcode_icon.svg";

const Home = () => {
  return (
    <div className="fixed inset-0 flex items-end justify-center">
      <div className="absolute top-[20vh] flex items-center justify-center flex-col">
        <div className="text-3xl font-bold text-center">Scan the Barcode</div>
        <BarcodeIcon />
      </div>

      <Link
        className="relative text-white bg-green-600 px-5 pt-3 pb-4 m-[5vh] rounded-3xl font-bold  hover:bg-green-700  active:shadow-2xl"
        to="/scan"
      >
        Start Scanning
      </Link>
    </div>
  );
};
export default Home;
