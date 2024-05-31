'use client';
import React, { useState, useEffect } from 'react';
import { webdevelopment, mobileDevelopment, informationSecurity, textileQuestions, bankingQuestions } from './data.js';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link.js';

const TestPortal = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  // const [error, setError] = useState("");
  // const [tests, setTests] = useState([]); 

  const searchParams = useSearchParams()
  const selectedTopic = searchParams.get('selectedTopic')

 useEffect(() => {
    let questions = [];
    switch (selectedTopic) {
      case 'Web Development':
        questions = [...webdevelopment.questions];
        break;
      case 'Mobile Development':
        questions = [...mobileDevelopment.questions];
        break;
      case 'Information Security':
        questions = [...informationSecurity.questions];
        break;
      case 'Textile Engineering':
        questions = [...textileQuestions.questions];
        break;
      case 'Banking':
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
    setQuizStarted(true); 

    const { question, answers, correctAnswer } = shuffledQuestions[activeQuestion];
    const isCorrect = answers[selectedAnswerIndex] === correctAnswer;
    setResult((prev) => ({
      score: prev.score + (isCorrect ? 15 : 0),
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
    }));

    if (activeQuestion !== shuffledQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setSelectedAnswerIndex(null); 
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

    setShuffledQuestions((prevQuestions) => prevQuestions.sort(() => Math.random() - 0.5));
    setQuizStarted(false); 
  };

  // const handleTopicChange = (value) => {
  //   if (!quizStarted) {
  //     setSelectedTopic(value);
  //   }
  // };

  if (shuffledQuestions.length === 0 || activeQuestion >= shuffledQuestions.length) {
    return <div className='text-2xl text-center font-bold text-gray-600 py-9'>Loading...</div>;
  }

  const { question, answers } = shuffledQuestions[activeQuestion];

  const onAnswerSelected = (idx) => {
    setSelectedAnswerIndex(idx);
  };

  return (
    <div className="container mx-auto p-9 bg-gray-100 font-sans">
      <h1 className="text-center text-5xl my-7 font-bold cursor-default">Let's Start Quiz</h1>
      {/* <div className="form-group"> */}
        {/* <h2 className="text-2xl text-center font-semibold cursor-default">Select Topic:</h2> */}
        {/* <div className="flex justify-center flex-wrap gap-4 mt-4">
          {topics.map((topic) => (
            <button
              key={topic.value}
              className={`flex items-center justify-center rounded-full p-4 w-24 h-24 text-white text-center text-sm font-semibold transition-transform transform hover:scale-110 hover:shadow-lg ${
                selectedTopic === topic.value ? 'border-4 border-black' : ''
              }`}
              style={{ backgroundColor: topic.color }}
              onClick={() => handleTopicChange(topic.value)}
              disabled={quizStarted && selectedTopic !== topic.value}
            >
              {topic.label}
            </button>
          ))}
        </div> */}
      {/* </div> */}
      {/* <br /> */}
      {!showResult ? (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg transition-colors duration-300">
          <h2 className="cursor-default text-center text-2xl font-bold mb-3">
            Question: {activeQuestion + 1}/{shuffledQuestions.length}
          </h2>
          <h3 className="cursor-default text-center text-xl mb-3">{question}</h3>
          <ul className="space-y-3 p-4">
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(idx)}
                className={`p-3 pl-5 rounded-lg cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:scale-102 hover:font-semibold ${
                  selectedAnswerIndex === idx
                    ? 'bg-purple-300 text-black font-semibold'
                    : 'bg-white border border-purple-700'
                }`}
              >
                » {answer}
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-5">
            <button
              className="px-9 py-2 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-900 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
              onClick={nextQuestion}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === shuffledQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg transition-colors duration-300">
          <h3 className="text-3xl font-bold text-center mb-3 text-purple-800">Results</h3>
          <h3 className="text-xl my-4 text-purple-800">
            Overall Percentage : <span className='text-black font-bold px-3 text-md'>{((result.score / (shuffledQuestions.length * 15)) * 100).toFixed(2)}%</span>
          </h3>
          <p className="text-lg text-purple-800">Total Questions : <span className="font-bold text-black px-3">{shuffledQuestions.length}</span></p>
          <p className="text-lg text-purple-800">Correct Answers : <span className="font-bold text-black px-3">{result.correctAnswers}</span></p>
          <p className="text-lg text-purple-800">Wrong Answers : <span className="font-bold text-black px-3">{result.wrongAnswers}</span></p>
          <div className='flex justify-center mt-5'>
            <button
              className="px-6 py-2 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-900 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
              onClick={restartQuiz}
            >
              Restart
            </button>
            <Link href="/internships"
                className="px-6 py-2 ml-5 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-900 hover:shadow-lg hover:-translate-y-1 hover:scale-105"
            >Cancel</Link>
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default TestPortal;