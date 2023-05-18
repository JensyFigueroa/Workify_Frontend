import { CreateService } from "./components/views/CreateService/CreateService";
import { Detail } from "./components/views/Detail/Detail";
import Home from "./components/views/Home/Home";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./components/views/landing/Landing";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/views/landing/Landing";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Routes>
        <Route path={"/"} element={< LandingPage/>}/>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/createService" element={<CreateService />}></Route>
      </Routes>
    </>
  );
}

export default App;
