import React, { useState, useEffect, useRef } from "react";
import paragraphsData from "../assets/paragraphs.json";

const TypingSpace = ({ activeMode }) => {
  const [randomParagraph, setRandomParagraph] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const paragraphRef = useRef();

  useEffect(() => {
    const getRandomParagraphId = () => {
      let minId = 1;
      let maxId = paragraphsData.paragraphs.length;
      if (activeMode === 0) {
        maxId = 6;
      } else if (activeMode === 1) {
        minId = 7;
      }
      const randomIndex = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
      return paragraphsData.paragraphs[randomIndex - 1].id;
    };

    const randomId = getRandomParagraphId();
    setRandomParagraph(randomId);
    setTypedText("");
    setTypedIndex(0);
    setCursorPosition(0);
    setStartTime(Date.now());
    setTimerExpired(false);
    setTypingSpeed(0);
    setAccuracy(100);

    const timer = setTimeout(() => {
      setTimerExpired(true);
      calculateTypingSpeed();
    }, 30000); // 30 seconds timer

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [activeMode]);

  const calculateTypingSpeed = () => {
    const endTime = Date.now();
    const elapsedTimeInSeconds = (endTime - startTime) / 1000;
    const typedWords = typedText.trim().split(/\s+/).length;
    const wordsPerMinute = Math.round((typedWords / elapsedTimeInSeconds) * 60);
    setTypingSpeed(wordsPerMinute);
  };
  const calculateAccuracy = () => {
    const typedWords = typedText.trim().split(/\s+/);
    const originalWords = selectedParagraph.text.trim().split(/\s+/);
    let correctWords = 0;
    typedWords.forEach((word, index) => {
      if (word === originalWords[index]) {
        correctWords++;
      }
    });
    const accuracyPercentage = Math.round((correctWords / originalWords.length) * 100);
    setAccuracy(accuracyPercentage);
  };
  
  

  const handleKeyPress = (event) => {
    const { key } = event;
    if (!timerExpired) {
      if (key === "Backspace") {
        if (typedIndex > 0) {
          setTypedText(typedText.slice(0, typedText.length - 1));
          setTypedIndex(typedIndex - 1);
          setCursorPosition(cursorPosition - 1);
        }
      } else {
        const currentChar = selectedParagraph.text.charAt(typedIndex);
        if (key === currentChar) {
          setTypedText(typedText + key);
          setTypedIndex(typedIndex + 1);
          setCursorPosition(cursorPosition + 1);
        } else {
          setCursorPosition(typedIndex);
        }
      }
    }
  };

  const selectedParagraph = paragraphsData.paragraphs.find(
    (paragraph) => paragraph.id === randomParagraph
  );

  return (
    <div className="relative">
      <div className="text-white font-mono p-12 m-8 rounded-lg text-3xl font-extralight space-x-7 tracking-wide leading-snug relative" ref={paragraphRef} onKeyDown={handleKeyPress} tabIndex={0}>
        <p>
          {selectedParagraph &&
            <>
              {selectedParagraph.text.split("").map((char, index) => {
                let charColor = "inherit";
                let underline = false;
                if (index === cursorPosition) {
                  underline = true;
                } else if (index < typedIndex) {
                  charColor = typedText[index] === char ? "darkgrey" : "red";
                }
                return (
                  <span
                    key={index}
                    style={{
                      color: charColor,
                      textDecoration: underline ? "underline" : "none"
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </>
          }
        </p>
      </div>
      {timerExpired && 
        <div className="absolute top-0 left-0 text-white p-4 bg-gray-800 rounded">
          <p>Typing speed: {typingSpeed} words per minute</p>
          <p>Accuracy: {accuracy}%</p>
        </div>
      }
    </div>
  );
};

export default TypingSpace;
