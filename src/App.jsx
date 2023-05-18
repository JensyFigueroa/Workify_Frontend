import Navbar from "./components/navbar/Navbar";
import LandingPage from "./components/views/landing/Landing";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={< LandingPage/>}/>
      </Routes>
    </>
  );
}

export default App;
