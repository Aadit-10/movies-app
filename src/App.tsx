import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import ExpandedMovieCard from "./Pages/Movie Info Page/MovieInfoPage";

const App: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("All");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-info-page/:id" element={<ExpandedMovieCard />} />
      </Routes>
    </Router>
  );
};

export default App;
