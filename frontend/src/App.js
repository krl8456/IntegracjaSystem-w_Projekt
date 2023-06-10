import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route
          path="/dashboard"
          exact
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
