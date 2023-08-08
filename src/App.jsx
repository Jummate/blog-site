import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}

export default App;
