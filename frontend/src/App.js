import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { UserProvider } from "./contexts/UserContext";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import Charts from "./components/Charts";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/chart" exact element={
            <RequireAuth>
              <Charts />
            </RequireAuth>
          } />
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
        <Route
          path="/update-profile"
          exact
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;