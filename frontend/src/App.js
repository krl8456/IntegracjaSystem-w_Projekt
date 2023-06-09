import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
    </Routes>
  );
}

export default App;
