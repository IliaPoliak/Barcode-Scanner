import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanner from "./Components/Scanner";
import Item from "./Components/Item";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/item/:isbn" element={<Item />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
