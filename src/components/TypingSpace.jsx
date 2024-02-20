// TypingSpace.jsx
import React, { useState, useEffect } from "react";
import paragraphsData from "../assets/paragraphs.json";

const TypingSpace = ({ activeMode }) => {
  const [randomParagraph, setRandomParagraph] = useState(null);

  useEffect(() => {
    // Function to select a random paragraph ID based on the active mode
    const getRandomParagraphId = () => {
      let minId = 1;
      let maxId = paragraphsData.paragraphs.length;
      console.log("max id is : ", maxId);
      if (activeMode === 0) {
        console.log("inside if");
        // Easy mode
        maxId = 6; // Only select IDs from 1 to 6
      } else if (activeMode === 1) {
        // Punctuation mode
        console.log("inside else if");
        minId = 7; // Start from the 7th paragraph
      }
      const randomIndex =
        Math.floor(Math.random() * (maxId - minId + 1)) + minId;
      console.log("random index is : ", randomIndex - 1);
      return paragraphsData.paragraphs[randomIndex - 1].id; // Subtract 1 to get the correct index
    };

    // Get a random paragraph ID when the component mounts or active mode changes
    const randomId = getRandomParagraphId();
    setRandomParagraph(randomId);
  }, [activeMode]); // Update when active mode changes

  // Find the selected paragraph based on the random ID
  const selectedParagraph = paragraphsData.paragraphs.find(
    (paragraph) => paragraph.id === randomParagraph
  );

  return (
    <div className="text-white font-mono p-8 m-8 border rounded-lg text-xl font-extralight">
      <p>{selectedParagraph ? selectedParagraph.text : "Loading..."}</p>
    </div>
  );
};

export default TypingSpace;
