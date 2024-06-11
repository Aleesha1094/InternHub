"use client"
import React, { useState } from 'react';

function Privacypolicy(){

  const [expandedSection, setExpandedSection] = useState(null);
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="container mx-auto p-4 m-9">
      <h1 className="text-4xl text-center font-bold text-purple-800">Privacy Policy for Future Interns</h1>
      <div className='m-10'>
      <p className="mt-4 text-justify"> 
        Certainly, here's the text with the provided changes:
        At Futureinterns.pk, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Pakistan's Virtual Internship Platform and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they share and collect at Futureinterns.pk. This policy is not applicable to any information collected offline or via channels other than this website.
      </p>
      <h2 className="text-3xl font-bold mt-6">Consent</h2>
      <p className="mt-2">
        By using our website, you hereby consent to our Privacy Policy and agree to its terms:
      </p>
      <div className="mt-4">
        {[
          { title: "Information we collect", detail: "We collect information that you provide to us directly." },
          { title: "How we use your information", detail: "We use the information we collect in various ways, including to improve our website." },
          { title: "Log Files", detail: "Pakistan's Virtual Internship Platform follows a standard procedure of using log files." },
          { title: "Cookies and Web Beacons", detail: "Like any other website, Pakistan's Virtual Internship Platform uses 'cookies'." },
          { title: "Google DoubleClick DART Cookie", detail: "Google is one of a third-party vendor on our site." },
          { title: "Our Advertising Partners", detail: "Some of advertisers on our site may use cookies and web beacons." }
        ].map((section, index) => (
          <div key={index} className="mt-2">
            <div
              className="flex items-center justify-between bg-gray-100 p-3 rounded-md cursor-pointer"
              onClick={() => toggleSection(index)}
            >
              <h3 className="text-lg font-medium">{section.title}</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={expandedSection === index ? "M7 11l5-5m0 0l5 5m-5-5v12" : "M13 5l7 7-7 7M5 12v7.5a2.5 2.5 0 001.3 2.2H9.7a2.5 2.5 0 002.2-1.3V12m1.6 0l1.6 1.6m-1.6 0l-1.6-1.6"} />
              </svg>
            </div>
            {expandedSection === index && (
              <p className="mt-2 pl-5">{section.detail}</p>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Privacypolicy;