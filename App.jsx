import React, { useState } from 'react';
import { questions } from './questions';
import './App.css';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswerClick = (index) => {
    setSelectedOption(index);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <div className="app-container">
      <div className="quiz-card">
        <h1>Quiz App 🚀</h1>

        {showScore ? (
          <div>
            <h2>Το παιχνίδι τελείωσε! 🎉</h2>
            <p>Βρήκες <strong>{score}</strong> από τις <strong>{questions.length}</strong> ερωτήσεις.</p>
            <button className="restart-btn" onClick={restartQuiz}>
              Παίξε Ξανά
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Ερώτηση {currentQuestion + 1} από {questions.length}
            </div>
            
            <h3>{questions[currentQuestion].question}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '20px' }}>
              {questions[currentQuestion].options.map((option, index) => {
                let btnClass = "option-btn";

                if (selectedOption !== null) {
                  if (index === questions[currentQuestion].correct) {
                    btnClass += " correct";
                  } else if (index === selectedOption) {
                    btnClass += " wrong";
                  }
                }

                return (
                  <button
                    key={index}
                    className={btnClass}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}