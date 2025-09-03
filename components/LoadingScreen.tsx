
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  '최고의 메뉴를 고르는 중...',
  '맛있는 냄새가 나는군요...',
  '주방장님과 상의하고 있어요...',
  '완벽한 조합을 찾고 있습니다!',
  '거의 다 됐어요!',
];

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
      <div className="flex justify-center items-center mb-6">
        <svg className="animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        AI가 당신의 점심을 요리하는 중...
      </h2>
      <p className="text-lg text-gray-600 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;
