// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import SignIn from "./Pages/SignIn";
// import SignUp from "./Pages/Signup";
// import Herosection from "./components/Herosection";
// import Navbar from "./components/Navbar";
// import ProfilePage from "./components/ProfilePage";
// import About from "./components/About";
// import Post from "./components/Post";
// import Addpost from "./components/Addpost";

// export default function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // ✅ Test API call via Vite proxy
//     fetch("/api/auth/test") // goes to http://localhost:8080/api/auth/test
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message))
//       .catch((err) => console.error("API error:", err));
//   }, []);

//   return (
//     <BrowserRouter>
//       <Navbar />
//       <p className="text-center text-blue-600 font-bold">
//         {message || "Connecting to backend..."}
//       </p>
//       <Routes>
//         <Route path="/" element={<Herosection />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/ProfilePage" element={<ProfilePage />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/post" element={<Post />} />
//         <Route path="/Addpost" element={<Addpost />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/auth/authSlice";

import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Herosection from "./components/Herosection";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";
import About from "./components/About";
import Post from "./components/Post";
import Addpost from "./components/Addpost";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app start
    dispatch(loadUser());

    // Test API call via Vite proxy
    fetch("/api/auth/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("API error:", err));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <p className="text-center text-blue-600 font-bold">
        {message || "Connecting to backend..."}
      </p>
      <Routes>
        <Route path="/" element={<Herosection />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/post" element={<Post />} />
        <Route path="/Addpost" element={<Addpost />} />
      </Routes>
    </BrowserRouter>
  );
}