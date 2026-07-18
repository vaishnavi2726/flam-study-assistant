import "./App.css";
import { useState } from "react";
import axios from "axios";
import Flashcard from "./components/Flashcard";

function App() {
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [cards, setCards] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mode, setMode] = useState("flashcards");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const generateStudyMaterial = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/generate",
        { topic }
      );

      setSummary(response.data.summary || "");
      setCards(response.data.flashcards || []);
      setQuiz(response.data.quiz || []);

      setMode("flashcards");
      setCurrentQuestion(0);
      setSelectedOption("");
      setScore(0);
      setQuizFinished(false);
    } catch (err) {
      console.error(err);
      setError("Failed to generate study material.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = () => {
    const currentQuiz = quiz[currentQuestion];

    if (!currentQuiz) return;

    if (selectedOption === currentQuiz.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion === quiz.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }

    setSelectedOption("");
  };

  return (
    <div className="app-container">
      <h1 className="title">📚 AI Study Assistant</h1>

      <p className="subtitle">
        Generate summaries, flashcards and quizzes using AI
      </p>

      <input
        className="input-box"
        type="text"
        placeholder="Enter a topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        className="generate-btn"
        onClick={generateStudyMaterial}
      >
        {loading
          ? "Generating..."
          : "Generate Study Material"}
      </button>

      {error && (
        <p className="error">{error}</p>
      )}

      {summary && (
        <div className="summary-box">
          <h2>📖 Topic Overview</h2>
          <p>{summary}</p>
        </div>
      )}

      {cards.length > 0 && (
        <>
          <div className="mode-buttons">
            <button
              className="generate-btn"
              onClick={() =>
                setMode("flashcards")
              }
            >
              Flashcards
            </button>

            <button
              className="generate-btn"
              onClick={() =>
                setMode("quiz")
              }
            >
              Quiz
            </button>
          </div>

          <div className="stats">
            <div className="stat-card">
              <h3>📝 Flashcards</h3>
              <p>{cards.length}</p>
            </div>

            <div className="stat-card">
              <h3>🏆 Score</h3>
              <p>{score}</p>
            </div>
          </div>
        </>
      )}

      {mode === "flashcards" && (
        <div className="cards-container">
          {cards.map((card, index) => (
            <Flashcard
              key={index}
              card={card}
            />
          ))}
        </div>
      )}

      {mode === "quiz" &&
        quiz.length > 0 &&
        !quizFinished && (
          <div className="quiz-box">
            <h2>
              Question {currentQuestion + 1}
              {" / "}
              {quiz.length}
            </h2>

            <p className="quiz-question">
              {quiz[currentQuestion].question}
            </p>

            <div className="options-container">
              {quiz[currentQuestion].options.map(
                (option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${
                      selectedOption === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedOption(option)
                    }
                  >
                    {option}
                  </button>
                )
              )}
            </div>

            <button
              className="generate-btn"
              onClick={submitAnswer}
              disabled={!selectedOption}
            >
              Submit Answer
            </button>
          </div>
        )}

      {quizFinished && (
        <div className="summary-box">
          <h2>🎉 Quiz Complete</h2>

          <p>
            Score: {score} / {quiz.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
