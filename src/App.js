import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/global/Layout";
import Home from "./pages/home/home";
import LogIn from "./pages/login";
import Register from "./pages/register";
import Venues from "./pages/venues"
import Profile from "./pages/profile";
import Venue from "./pages/specificVenue"
import NewVenue from "./pages/newVenue";
import UpdateVenue from "./pages/updateVenue";
import NotLoggedIn from "./pages/error";
import RouteNotFound from "./pages/notfound";



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
