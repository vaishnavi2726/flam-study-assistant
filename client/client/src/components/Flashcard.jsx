import { useState } from "react";
import "./Flashcard.css";


function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <h3>
        {flipped ? "Answer" : "Question"}
      </h3>

      <p>
        {flipped ? card.answer : card.question}
      </p>

      <small>Click card to flip</small>
    </div>
  );
}

export default Flashcard;
