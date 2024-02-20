import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Preference from "./components/Preference";
import TypingSpace from "./components/TypingSpace";
import "../src/styles/Navbar.css";

function App() {
  const [timer, setTimer] = useState(null); // Timer state
  const [timerRunning, setTimerRunning] = useState(false); // Flag to track if the timer is running

  // Function to start the timer
  const startTimer = () => {
    setTimer(30); // Set initial timer value
    setTimerRunning(true); // Set timer running flag
  };

  // Function to stop the timer
  const stopTimer = () => {
    setTimer(null); // Reset timer value
    setTimerRunning(false); // Reset timer running flag
  };

  // Effect to run the timer
  useEffect(() => {
    let intervalId;
    if (timerRunning && timer !== null) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => {
          // Decrease timer by 1 second
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalId); // Clear interval when timer reaches 0
            setTimerRunning(false); // Reset timer running flag
            return null;
          }
        });
      }, 1000);
    }

    // Cleanup function to clear interval when component unmounts or when timer is stopped
    return () => {
      clearInterval(intervalId);
    };
  }, [timerRunning, timer]);

  return (
    <div className="App bg-[#111111] h-screen w-full flex flex-col items-center overflow-hidden">
      <Navbar />
      <Preference />
      <TypingSpace  />
      <div>
        {!timerRunning ? (
          <button
            type="start"
            className="text-white border-2 border-gray-400 p-2 rounded-full text-md hover:border-pink-400 hover:text-pink-400"
            onClick={startTimer}
          >
            Start Typing
          </button>
        ) : (
          <button
            type="stop"
            className="text-white border-2 border-gray-400 p-2 rounded-full text-md hover:border-pink-400 hover:text-pink-400"
            onClick={stopTimer}
          >
            Stop Typing
          </button>
        )}
        {timer !== null && (
          <span className="text-white ml-2">
            Timer: {timer}s
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
