import { Detail } from "./components/Detail/Detail";
import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Home/>

      <Routes>
        <Route path= "/detail/:id" element = {<Detail />}></Route>    
      </Routes>
    </>
  );
}

export default App;
