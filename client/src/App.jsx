import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage";
import { AuthProvider } from "./contexts/AuthProvider";
import { TimerProvider } from "./contexts/TimerProvider";
import CreatePost from "./pages/Create";
import Login from "./pages/Login";
import EditPost from "./pages/Edit";
import EditProfile from "./pages/EditProfile";
import ResetPassword from "./pages/ResetPassword";
import ChangeStatus from "./pages/ChangeStatus";

function App() {
  const Layout = () => (
    <>
      <AuthProvider>
        <TimerProvider>
          <ToastContainer />
          <Header />
          <Outlet />
          <Footer />
        </TimerProvider>
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
          <Route
            path="/edit-profile/:id"
            element={<EditProfile />}
          />
          <Route
            path="/reset-password/:id"
            element={<ResetPassword />}
          />
          <Route
            path="/change-status"
            element={<ChangeStatus />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
