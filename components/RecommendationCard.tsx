
import React from 'react';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl flex flex-col">
      <div className="w-full h-48 sm:h-56 bg-gray-200">
        <img 
          src={recommendation.imageUrl} 
          alt={recommendation.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex-grow flex items-center justify-center">
        <h3 className="text-2xl font-bold text-gray-800 text-center">{recommendation.name}</h3>
      </div>
    </div>
  );
};

export default RecommendationCard;
