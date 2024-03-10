import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Preference from "./components/Preference";
import "../src/styles/Navbar.css";

function App() {
 
  return (
    <div className="App bg-[#111111] h-screen w-full flex flex-col items-center overflow-hidden">
      <Navbar />
      {/* <StartStop /> */}
      <Preference />
    </div>
  );
}

export default App;
