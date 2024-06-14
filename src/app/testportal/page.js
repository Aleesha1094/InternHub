"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import quiz from './../../../public/quiz.jpg';
import Link from 'next/link';

const Test = () => {
  const [error, setError] = useState("");
  const [tests, setTests] = useState([]); 
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await fetch('/api/test');
        if (response.ok) {
          const data = await response.json();
          setTests(data.Internship_Tests);
        } else {
          setError('Error: ' + response.statusText);
        }
      } catch (error) {
        console.error(error);
        setError('Error Fetching Tests!');
      }
    }
    fetchTests();
  }, []);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="container flex flex-col justify-center items-center min-h-screen py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto p-8 bg-purple-100 rounded-3xl shadow-md" data-aos="fade-up">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold my-4">Select Topic</h3>
            {tests.map((test) => (
              <ul key={test._id} className="list-disc">          
                <li 
                  onClick={() => handleTopicSelect(test.test)} 
                  className={`p-2 m-4 font-semibold cursor-pointer text-black rounded-md py-2 ${selectedTopic === test.test ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-100 hover:text-purple-600'}`}
                  >{test.test}
                </li>
            </ul>
              ))}
          </div>
          <div className="col-span-2 bg-white p-4 rounded-2xl shadow-md">
            <div className="w-200 h-80 overflow-hidden flex justify-center">
              <Image src={quiz} className="rounded-xl opacity-90" alt="Welcome Back to Quiz Spring!" />
            </div>
            <div className="mt-5 flex justify-center">
            <Link href={{
                  pathname: '/testportal/test',
                  query: {selectedTopic}
                }}>
                <button disabled={!selectedTopic} className={`bg-purple-600 ${selectedTopic ? 'hover:bg-purple-700 hover:shadow-lg hover:-translate-y-1 hover:scale-105 animate-bounce' : 'opacity-50 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded`}>
                  Start Test
                </button>
            </Link>
            </div>
            <br/>
            <div className="bg-gray-200 p-4 mt-4 rounded-lg shadow-md">
              <p className="text-lg font-bold text-center">
                &ldquo;Practice isn’t the thing you do once you are good.
                Its the thing you do that makes you good.&rdquo;
              </p>
              <p className="text-gray-600 text-center mt-4">- Malcolm Gladwell</p>
            </div>
          </div>
        </div>       
      </div>
    </div>
  )
}

export default Test;