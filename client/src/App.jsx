import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import PostPage from "./pages/post/PostPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import CreatePost from "./pages/create/Create";

function App() {
  const Layout = () => (
    <>
      <Header />
      <Outlet />
      <Footer />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
