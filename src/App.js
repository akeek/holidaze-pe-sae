import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/global/Layout";
import Home from "./pages/home/home";
import LogIn from "./pages/login/login";
import Register from "./pages/register/register";
import Venues from "./pages/venues/venues";
import Profile from "./pages/profile/profile";
import RouteNotFound from "./pages/notfound/notfound";
import Venue from "./pages/specificVenue/specificVenue";
import NewVenue from "./pages/newVenue/newVenue";
import UpdateVenue from "./pages/updateVenue/updateVenue";
import NotLoggedIn from './pages/error';



function App() {

  const user = localStorage.getItem("profile");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/error" element={user ? <Navigate replace to={"/profile"} /> : <NotLoggedIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/newVenue" element={user ? <NewVenue /> : <Navigate replace to={"/error"} />} />
        <Route path="/updateVenue/:id" element={user ? <UpdateVenue /> : <Navigate replace to={"/error"} />} />
        <Route path="/specific/:id" element={<Venue />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate replace to={"/error"} />} />
        <Route path="*" element={<RouteNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
