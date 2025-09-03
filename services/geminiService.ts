import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  return process.env.API_KEY || process.env.GEMINI_API_KEY || '';
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getLunchRecommendations = async (answers: string[]): Promise<{name: string, description: string, price: string}[]> => {
  try {
    if (!ai) {
      throw new Error("API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.");
    }

    const prompt = `
      사용자의 답변을 바탕으로 점심 메뉴를 추천해주세요:
      
      1. 기분/상황: ${answers[0] || '정보 없음'}
      2. 최근 식사: ${answers[1] || '정보 없음'}
      3. 예산: ${answers[2] || '정보 없음'}
      4. 함께 먹을 사람: ${answers[3] || '정보 없음'}
      5. 선호 스타일: ${answers[4] || '정보 없음'}
      6. 식사 장소: ${answers[5] || '정보 없음'}

      위 정보를 종합하여 한국에서 점심으로 먹기 좋은 메뉴를 5가지 추천해주세요.
      각 메뉴는 서로 다른 스타일이어야 하고, 사용자의 답변과 잘 맞아야 합니다.
      최근 먹은 음식과는 다른 종류로 추천해주세요.
      
      다양한 장르를 포함해주세요: 한식, 일식, 중식, 양식, 분식, 아시안 푸드 등
      각 메뉴마다 간단한 설명과 대략적인 가격대를 포함해주세요.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              description: "추천 점심 메뉴 5가지",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "메뉴 이름"
                  },
                  description: {
                    type: Type.STRING,
                    description: "메뉴 설명 및 추천 이유"
                  },
                  price: {
                    type: Type.STRING,
                    description: "대략적인 가격대"
                  }
                },
                required: ["name", "description", "price"]
              }
            }
          }
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result && Array.isArray(result.recommendations)) {
      return result.recommendations.slice(0, 5);
    }
    
    return [];

  } catch (error) {
    console.error("Error getting lunch recommendations:", error);
    throw new Error("점심 메뉴 추천을 받는 데 실패했습니다.");
  }
};
