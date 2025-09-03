
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
        오늘 점심 뭐 먹지?
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        몇 가지 질문에 답하고 완벽한 점심 메뉴를 추천받으세요!
      </p>
      <button
        onClick={onStart}
        className="group inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        <SparklesIcon className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-12" />
        추천 시작하기
      </button>
    </div>
  );
};

export default StartScreen;
