import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header";
import Home from "../src/components/Home";
import Coins from "../src/components/Coins";
import CoinDetails from "../src/components/CoinDetails";
import Exchanges from "../src/components/Exchanges";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/coins"} element={<Coins />} />
        <Route path={"/exchanges"} element={<Exchanges />} />
        <Route path={"/coin/:id"} element={<CoinDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
