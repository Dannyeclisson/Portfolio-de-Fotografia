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
        <Routes>
          <Route path="/" element={
            <>
              <div id="home">
                <Navbar />
              </div>
              <div id="about">
                <About />
              </div>
              <div id="portfolio">
                <Portfolio />
              </div>
              <div id="blog">
                <Blog />
              </div>
              <div id="contact">
                <Contact />
              </div>
            </>
          } />
          <Route path="/portfolio/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
