'use client';
import React, { useState, useEffect } from 'react';
import { webdevelopment, mobileDevelopment, informationSecurity, textileQuestions, bankingQuestions } from './data.js';

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
<div className="container mx-auto mt-5 mb-4 p-4 bg-gray-100 font-sans">
  <h1 className="text-center text-4xl font-bold cursor-default">Let's Start Quiz</h1>
  <div className="form-group">
    <h2 className="text-2xl text-center font-semibold cursor-default">Select Topic:</h2>
    <div className="flex justify-center flex-wrap gap-4 mt-4">
      {topics.map((topic) => (
        <button
          key={topic.value}
          className={`flex items-center justify-center rounded-full p-4 w-24 h-24 text-white text-center text-sm font-semibold transition-transform transform hover:scale-110 hover:shadow-lg ${
            selectedTopic === topic.value ? 'border-4 border-black' : ''
          }`}
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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg transition-colors duration-300">
      <h2 className="cursor-default text-2xl font-semibold mb-3 text-purple-800">
        Question: {activeQuestion + 1}/{shuffledQuestions.length}
      </h2>
      <h3 className="cursor-default text-xl mb-3 text-purple-800">{question}</h3>
      <ul className="space-y-3">
        {answers.map((answer, idx) => (
          <li
            key={idx}
            onClick={() => onAnswerSelected(idx)}
            className={`p-3 rounded-lg cursor-pointer transition-colors duration-300 ${
              selectedAnswerIndex === idx
                ? 'bg-purple-300 text-black'
                : 'bg-white text-purple-800 border border-purple-800'
            }`}
          >
            {answer}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-5">
        <button
          className="px-6 py-2 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-900 transition duration-300"
          onClick={nextQuestion}
          disabled={selectedAnswerIndex === null}
        >
          {activeQuestion === shuffledQuestions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  ) : (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg transition-colors duration-300">
      <h3 className="text-2xl font-semibold mb-3 text-purple-800">Results</h3>
      <h3 className="text-xl mb-3 text-purple-800">
        Overall {((result.score / (shuffledQuestions.length * 15)) * 100).toFixed(2)}%
      </h3>
      <p className="text-lg text-purple-800">Total Questions: <span className="font-bold">{shuffledQuestions.length}</span></p>
      <p className="text-lg text-purple-800">Correct Answers: <span className="font-bold">{result.correctAnswers}</span></p>
      <p className="text-lg text-purple-800">Wrong Answers: <span className="font-bold">{result.wrongAnswers}</span></p>
      <div className='flex justify-content mt-5'>
      <button
        className="px-6 py-2 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-900 transition duration-300"
        onClick={restartQuiz}
      >
        Restart
      </button>
      </div>
    </div>
  )}
  <br />
</div>
  );
};

export default Page;