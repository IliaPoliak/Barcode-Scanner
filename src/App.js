import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanner from "./Scanner";
import Item from "./Item";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/item/:isbn" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
