import { GoogleGenAI, Type, Modality } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLunchRecommendations = async (answers: string[]): Promise<string[]> => {
  try {
    const prompt = `
      사용자의 다음 답변을 바탕으로 점심 메뉴 3가지를 추천해주세요:
      1. 오늘의 기분/상황: ${answers[0]}
      2. 어제 먹은 점심: ${answers[1] || '없음'}. ${answers[1] ? `어제 먹은 메뉴와 비슷하거나 중복되는 메뉴는 제외해주세요.` : ''}

      추천 메뉴는 한국 직장인이 점심으로 먹기에 적합해야 합니다. 다양하게 3가지를 추천해주세요. 동료들과 함께 먹는 상황을 가정해주세요.
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
              description: "추천 점심 메뉴 3가지",
              items: {
                type: Type.STRING
              }
            }
          }
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result && Array.isArray(result.recommendations)) {
      return result.recommendations.slice(0, 3);
    }
    
    return [];

  } catch (error) {
    console.error("Error getting lunch recommendations:", error);
    throw new Error("점심 메뉴 추천을 받는 데 실패했습니다.");
  }
};

export const generateFoodImage = async (foodName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: { 
        parts: [
          { text: `A delicious, mouth-watering, high-quality photo of Korean dish: ${foodName}` }
        ] 
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    // Fallback if no image is generated
    return `https://picsum.photos/seed/${foodName}/500/300`;

  } catch (error) {
    console.error(`Error generating image for ${foodName}:`, error);
    // Return a placeholder image on error
    return `https://picsum.photos/seed/${foodName}/500/300`;
  }
};
