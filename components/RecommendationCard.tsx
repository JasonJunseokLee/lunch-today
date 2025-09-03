
import React from 'react';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{recommendation.name}</h3>
        <span className="text-lg font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {recommendation.price}
        </span>
      </div>
      <p className="text-gray-600 leading-relaxed flex-grow">
        {recommendation.description}
      </p>
    </div>
  );
};

export default RecommendationCard;
