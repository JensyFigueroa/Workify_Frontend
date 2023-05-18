import { CreateService } from "./components/views/CreateService/CreateService";
import { Detail } from "./components/views/Detail/Detail";
import Home from "./components/views/Home/Home";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/views/landing/Landing";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <CreateService/>
      <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/createService" element={<CreateService />}></Route>
      </Routes>
    </>
  );
}

export default App;
