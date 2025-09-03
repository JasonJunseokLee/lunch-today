
import React, { useState, useCallback } from 'react';
import { getLunchRecommendations, generateFoodImage } from './services/geminiService';
import { Recommendation, Step } from './types';
import { QUESTIONS } from './constants';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>('start');
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setStep('questioning');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('loading');
      fetchRecommendations(newAnswers);
    }
  };

  const fetchRecommendations = useCallback(async (finalAnswers: string[]) => {
    setError(null);
    try {
      const foodNames = await getLunchRecommendations(finalAnswers);
      if (foodNames.length === 0) {
        throw new Error("추천 메뉴를 생성하지 못했습니다.");
      }
      
      const imagePromises = foodNames.map(name => generateFoodImage(name));
      const imageUrls = await Promise.all(imagePromises);

      const finalRecommendations = foodNames.map((name, index) => ({
        name,
        imageUrl: imageUrls[index],
      }));
      
      setRecommendations(finalRecommendations);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      setStep('result'); // Show error on result screen
    }
  }, []);

  const handleReset = () => {
    setStep('start');
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setRecommendations([]);
    setError(null);
  };

  const renderContent = () => {
    switch (step) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'questioning':
        return <QuestionScreen question={QUESTIONS[currentQuestionIndex]} onAnswer={handleAnswer} />;
      case 'loading':
        return <LoadingScreen />;
      case 'result':
        return <ResultScreen recommendations={recommendations} error={error} onReset={handleReset} />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
