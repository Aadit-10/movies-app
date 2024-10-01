import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";

const App: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("All");

  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
};

export default App;
