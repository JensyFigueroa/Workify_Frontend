import { CreateService } from "./components/views/CreateService/CreateService";
import { Detail } from "./components/views/Detail/Detail";
import Home from "./components/views/Home/Home";
import Navbar from "./components/navbar/Navbar";  
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/landing/LandingPage";
import Footer from "./components/views/footer/footer";
// import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="/createService" element={<CreateService />}/>
        {/* <Route path="/login" element={<Login/>}/> */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
