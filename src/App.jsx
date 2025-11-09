import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import EmptyLayout from "./layouts/EmptyLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Map from "./pages/Map.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import "./i18n.js";
import "leaflet/dist/leaflet.css";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="flex min-h-screen items-center">Loading...</div>;

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/map"
          element={user ? <Map /> : <Navigate to="/login" replace />}
        />
      </Route>
      <Route element={<EmptyLayout />}>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
}

export default App;
