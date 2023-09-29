import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage";
import { AuthProvider } from "./contexts/AuthProvider";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import CreatePost from "./pages/Create";
import Login from "./pages/Login";
import EditPost from "./pages/Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Layout = () => (
    <>
      <AuthProvider>
        <ToastContainer />
        <Header />
        <Outlet />
        <Footer />
      </AuthProvider>
    </>
  );
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />
          <Route
            path="/post/:id"
            element={<PostPage />}
          />
          <Route
            path="/create"
            element={<CreatePost />}
          />
          <Route
            path="/edit/:id"
            element={<EditPost />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
