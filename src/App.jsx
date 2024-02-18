import React from "react";
import Navbar from "./components/Navbar";
import Preference from "./components/Preference";

function App() {
  return (
    <div className="App bg-[#111111] h-screen w-full flex flex-col items-center ">
      <Navbar />
      <Preference/>
    </div>
  );
}

export default App;
