
import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionScreenProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ question, onAnswer }) => {
  const [textValue, setTextValue] = useState('');

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(textValue || '없음');
  };

  return (
    <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl animate-fade-in-up w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        {question.text}
      </h2>
      {question.type === 'mcq' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options?.map((option) => (
            <button
              key={option}
              onClick={() => onAnswer(option)}
              className="w-full p-4 text-left font-semibold text-gray-700 bg-white rounded-lg border-2 border-gray-200 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transform hover:scale-105"
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <form onSubmit={handleTextSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="예: 김치찌개"
            className="flex-grow p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            다음
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionScreen;
