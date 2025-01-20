import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Portfolio from './components/Portfolio';
import Blog from "./components/Blog";
import Contact from "./components/Contact";

function App() {
  return (
    <div>
      <Navbar />
      <About />
      <Portfolio />
      <Blog />
      <Contact/>
    </div>
  );
}

export default App;
