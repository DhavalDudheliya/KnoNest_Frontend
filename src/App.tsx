import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";

// components
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BlogPage from "./pages/BlogPage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";

import { BlogProvider } from "./contexts/BlogContext";
import { UserProvider } from "./contexts/UserContext";

import * as myContants from "../myConstant";
// axios setup
axios.defaults.baseURL = myContants.BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
      <BlogProvider>
        <Routes>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
          </Route>
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BlogProvider>
    </UserProvider>
  );
}

export default App;
