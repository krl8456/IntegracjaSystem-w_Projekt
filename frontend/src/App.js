import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
    </Routes>
  </>
  );
}

export default App;
