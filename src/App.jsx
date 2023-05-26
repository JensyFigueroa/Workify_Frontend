import { CreateService } from "./components/views/CreateService/CreateService";
import { Detail } from "./components/views/Detail/Detail";
import Home from "./components/views/Home/Home";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/landing/LandingPage";
<<<<<<< HEAD
import Footer from "./components/views/footer/footer";
=======
import Footer from "./components/views/footer/Footer";
import Error404 from "./components/views/Error404/Error404";
import Cart from "./cart/Cart";
>>>>>>> 72519415ba97b9c6e5497f7cc5646d574e213507

//
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/createService" element={<CreateService />}></Route>
<<<<<<< HEAD
=======
        <Route path={"*"} element={<Error404 />} />
        <Route path={"/cart"} element={<Cart />} />
>>>>>>> 72519415ba97b9c6e5497f7cc5646d574e213507
      </Routes>
      <Footer />
    </>
  );
}

export default App;
