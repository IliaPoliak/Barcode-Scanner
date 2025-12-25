import { Link } from "react-router-dom";
import { ReactComponent as BarcodeIcon } from "./barcode_icon.svg";

const Home = () => {
  return (
    <div className="flex justify-center">
      <div className="h-[70vh] flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold text-center">Scan the Barcode</h1>
        <BarcodeIcon />
      </div>

      <Link className="green-btn" to="/scan">
        Start Scanning
      </Link>
    </div>
  );
};

export default Home;
