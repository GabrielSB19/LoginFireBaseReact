import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import SignUp from "../components/signUp/SignUp";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

const MyRoutes = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
      } else {
        setUser("");
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home name={user} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
