import React from 'react'

const Test = () => {
  return (
    <div className=" flex items-center justify-center" >
      <div className="bg-gray-100 shadow-lg rounded-lg p-8 w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6">Test Portal</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-500 text-white rounded-lg p-4 flex items-center justify-center">
            <span className="text-l font-bold">Web Development</span>
          </div>
          <div className="bg-blue-500 text-white rounded-lg p-4 flex items-center justify-center">
            <span className="text-l font-bold">Mobile Development</span>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-4 flex items-center justify-center">
            <span className="text-l font-bold">Information Security</span>
          </div>
          <div className="bg-pink-500 text-white rounded-lg p-4 flex items-center justify-center">
            <span className="text-l font-bold">Textile Engineering</span>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-4 flex items-center justify-center">
            <span className="text-l font-bold">Bank</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test