import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import About from "./components/About";
import Portfolio from './components/Portfolio';
import ProjectDetails from './components/ProjectDetails';
import Blog from "./components/Blog";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <About />
              <Portfolio />
              <Blog />
              <Contact />
            </>
          } />
          <Route path="/portfolio/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
