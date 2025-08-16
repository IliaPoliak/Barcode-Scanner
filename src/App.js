import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanner from "./Components/Scanner";
import Item from "./Components/Item";
import Home from "./Components/Home";

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
