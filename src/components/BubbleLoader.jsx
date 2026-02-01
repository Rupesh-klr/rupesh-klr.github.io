import React from 'react';

const BubbleLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-[800px]">
      {/* Container for the bubbles */}
      {/* <div>loading...</div> */}
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-6 h-6 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-6 h-6 bg-purple-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default BubbleLoader;