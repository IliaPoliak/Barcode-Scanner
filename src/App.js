import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanner from "./Scanner";
import Item from "./Item";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scanner />} />
        <Route path="/item/:isbn" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
