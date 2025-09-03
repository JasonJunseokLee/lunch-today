
import React from 'react';
import { Recommendation } from '../types';
import RecommendationCard from './RecommendationCard';
import RestartIcon from './icons/RestartIcon';

interface ResultScreenProps {
  recommendations: Recommendation[];
  error: string | null;
  onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ recommendations, error, onReset }) => {
  return (
    <div className="w-full text-center p-4 sm:p-8 animate-fade-in">
       <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
        오늘의 점심 추천!
      </h2>
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">이런! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.name} recommendation={rec} />
          ))}
        </div>
      )}
      <button
        onClick={onReset}
        className="group inline-flex items-center justify-center mt-4 px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 font-bold text-lg rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        <RestartIcon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:-rotate-90" />
        다시 추천받기
      </button>
    </div>
  );
};

export default ResultScreen;
