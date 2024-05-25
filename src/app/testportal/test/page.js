'use client';
import React, { useState, useEffect } from 'react';
import { webdevelopment, mobileDevelopment, informationSecurity, textileQuestions, bankingQuestions } from './data.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('webdevelopment');

  const topics = [
    { value: 'webdevelopment', label: 'Web Development', color: '#ff6347' },
    { value: 'appDevelopment', label: 'Mobile Development', color: '#1e90ff' },
    { value: 'infoSecurity', label: 'Information Security', color: '#32cd32' },
    { value: 'textileEngineering', label: 'Textile Engineering', color: '#ff69b4' },
    { value: 'Bank', label: 'Bank', color: '#ffd700' },
  ];

  useEffect(() => {
    let questions = [];
    switch (selectedTopic) {
      case 'webdevelopment':
        questions = [...webdevelopment.questions];
        break;
      case 'appDevelopment':
        questions = [...mobileDevelopment.questions];
        break;
      case 'infoSecurity':
        questions = [...informationSecurity.questions];
        break;
      case 'textileEngineering':
        questions = [...textileQuestions.questions];
        break;
      case 'Bank':
        questions = [...bankingQuestions.questions];
        break;
      default:
        questions = [...webdevelopment.questions];
        break;
    }
    const shuffled = questions.sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setActiveQuestion(0);
    setSelectedAnswerIndex(null);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  }, [selectedTopic]);

  const nextQuestion = () => {
    const { question, answers, correctAnswer } = shuffledQuestions[activeQuestion];
    const isCorrect = answers[selectedAnswerIndex] === correctAnswer;
    setResult((prev) => ({
      score: prev.score + (isCorrect ? 15 : 0),
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
    }));

    if (activeQuestion !== shuffledQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswerIndex(null); // Reset selected answer for the next question
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswerIndex(null);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    // Shuffle questions again
    setShuffledQuestions((prevQuestions) => prevQuestions.sort(() => Math.random() - 0.5));
  };

  const handleTopicChange = (value) => {
    setSelectedTopic(value);
  };

  if (shuffledQuestions.length === 0 || activeQuestion >= shuffledQuestions.length) {
    return <div>Loading...</div>;
  }

  const { question, answers } = shuffledQuestions[activeQuestion];

  const onAnswerSelected = (idx) => {
    setSelectedAnswerIndex(idx);
  };

  return (
    <div className="container mt-5 mb-4" style={{ backgroundColor: '#f8f9fa', fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-left" style={{ color: '#4b0082' }}>Let's Start Quiz</h1>
      <div className="form-group">
        <h2 htmlFor="topicSelect" style={{ color: '#4b0082' }}>Select Topic:</h2>
        <div className="topic-bubbles">
          {topics.map((topic) => (
            <button
              key={topic.value}
              className={`topic-bubble ${selectedTopic === topic.value ? 'selected' : ''}`}
              style={{ backgroundColor: topic.color }}
              onClick={() => handleTopicChange(topic.value)}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>
      <br />
      {!showResult ? (
        <div
          className="card p-4"
          style={{
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          <h2 className="mb-3" style={{ color: '#4b0082' }}>
            Question: {activeQuestion + 1}/{shuffledQuestions.length}
          </h2>
          <h3 style={{ color: '#4b0082' }}>{question}</h3>
          <ul className="list-group">
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(idx)}
                className={`list-group-item ${selectedAnswerIndex === idx ? 'active disabled' : ''}`}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedAnswerIndex === idx ? '#d8b4f2' : '#fff',
                  color: selectedAnswerIndex === idx ? '#000' : '#4b0082',
                  borderColor: '#4b0082',
                }}
              >
                {answer}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-primary mt-3"
            onClick={nextQuestion}
            disabled={selectedAnswerIndex === null}
            style={{
              backgroundColor: '#4b0082',
              borderColor: '#4b0082',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            {activeQuestion === shuffledQuestions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <div
        className="card p-4 "
        style={{
          maxWidth: '600px',
          fontWeight: 'bold',
          margin: 'auto',
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease-in-out',
        }}
      >
          <h3 className="mb-3" style={{ color: '#4b0082' }}>Results</h3>
          <h3 style={{ color: '#4b0082'  }}>Overall {((result.score / (shuffledQuestions.length * 15)) * 100).toFixed(2)}%</h3>
          <p style={{ color: '#4b0082' }}>Total Questions: <span>{shuffledQuestions.length}</span></p>
          <p style={{ color: '#4b0082' }}>Correct Answers: <span>{result.correctAnswers}</span></p>
          <p style={{ color: '#4b0082' }}>Wrong Answers: <span>{result.wrongAnswers}</span></p>
          <button
            className="btn btn-primary mt-3"
            onClick={restartQuiz}
            style={{
              backgroundColor: '#4b0082',
              borderColor: '#4b0082',
              transition: 'background-color 0.3s ease-in-out',
            }}
          >
            Restart
          </button>
        </div>
      )}
      <br />
      <style jsx>{`
        .topic-bubbles {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 10px;
        }
        .topic-bubble {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 50%;
          padding: 20px;
          width: 100px;
          height: 100px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .topic-bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        }
        .topic-bubble.selected {
          border: 3px solid #4b0082;
        }
      `}</style>
    </div>
  );
};

export default Page;
