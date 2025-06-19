import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Posts from "./pages/Posts.js";
import Profile from "./pages/Profile.js";
import Register from "./pages/Register.js";
import "./styles/navbar.css";
import UpdatePosts from "./pages/UpdatePosts.js";
import Users from "./pages/Users.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<UpdatePosts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
