import { CreateService } from "./components/views/CreateService/CreateService";
import { Detail } from "./components/views/Detail/Detail";
import Home from "./components/views/Home/Home";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Home />

      <Routes>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/createService" element={<CreateService />}></Route>
      </Routes>
    </>
  );
}

export default App;
