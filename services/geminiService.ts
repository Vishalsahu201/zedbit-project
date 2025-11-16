import { GoogleGenAI, GenerateContentResponse, Chat, Modality } from "@google/genai";

// Fix: Moved AIStudio interface out of `declare global` to prevent potential global namespace conflicts.
// This makes it a module-scoped type used to augment the global Window interface.
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    aistudio: AIStudio;
  }
}

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Helper Functions ---
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

// --- API Functions ---

export const generateCode = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Generate a complete, single-file, production-ready code for the following request. The code should be fully functional. Assume all necessary libraries are available. Request: "${prompt}"`,
        config: {
            systemInstruction: "You are a world-class senior full-stack engineer. Generate clean, efficient, and complete code based on the user's prompt. Your output should only be the raw code, with no explanations or markdown formatting.",
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating code:", error);
    return `// Error: Failed to generate code. Please check the console for details.`;
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
        throw new Error("No image generated");
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
};

export const editImage = async (prompt: string, imageBase64: string, mimeType: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: imageBase64, mimeType: mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("No edited image returned");
    } catch (error) {
        console.error("Error editing image:", error);
        throw error;
    }
};


export const generateVideo = async (prompt: string, onStatusUpdate: (message: string) => void): Promise<string> => {
    try {
        onStatusUpdate("Initializing video engine...");
        const ai = getAiClient();
        
        onStatusUpdate("Sending request to Veo-3.1 model...");
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        onStatusUpdate("Video generation in progress... this may take a few minutes.");
        let pollCount = 0;
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            pollCount++;
            onStatusUpdate(`Checking status (Attempt ${pollCount})... Still processing.`);
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        onStatusUpdate("Video processing complete! Fetching download link...");
        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) {
            throw new Error("Video URI not found in response.");
        }

        onStatusUpdate("Downloading video data...");
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to download video: ${videoResponse.statusText}`);
        }
        const videoBlob = await videoResponse.blob();
        onStatusUpdate("Video ready!");
        return URL.createObjectURL(videoBlob);

    } catch (error) {
        console.error("Error generating video:", error);
        onStatusUpdate(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
        throw error;
    }
};


let chatInstance: Chat | null = null;

export const startChat = (): Chat => {
    if (!chatInstance) {
        const ai = getAiClient();
        chatInstance = ai.chats.create({
            model: 'gemini-2.5-pro',
            config: {
                systemInstruction: "You are MAI's core AI, a hyper-intelligent assistant. You can control all of MAI's tools. Be concise, helpful, and adopt a slightly futuristic, highly capable persona.",
            },
        });
    }
    return chatInstance;
};

export const sendMessage = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending chat message:", error);
        return "I seem to be having trouble connecting to my core processors. Please try again later.";
    }
};