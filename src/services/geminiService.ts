
import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapData, UserProfile, ATSAnalysis } from "../../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const generateDynamicRoadmap = async (
  role: string
): Promise<RoadmapData> => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-001",
    contents: `You are an expert curriculum architect. Generate a complete skill roadmap for the job role: "${role}", inspired by roadmap.sh.

    This roadmap must:
    - Match industry expectations
    - Be beginner-friendly but complete
    - Follow clear learning progression
    - Be structured as a visual roadmap / mind map
    
    OUTPUT FORMAT (STRICT — JSON ONLY):
    {
      "role": "${role}",
      "roadmap_style": "roadmap.sh",
      "sections": [
        {
          "section_name": "Internet",
          "learning_stage": "Early",
          "nodes": [
            {
              "id": "internet_basics",
              "label": "How the Internet Works",
              "order": 1,
              "mandatory": true,
              "description": "Short reasoning why this matters."
            }
          ]
        }
      ],
      "dependencies": [
        { "from": "node_id", "to": "node_id" }
      ],
      "learning_notes": {
        "order_not_strict": true,
        "beginner_friendly": true
      }
    }
    
    Ensure you include mandatory sections like Foundations, Core Languages, Frameworks, Tooling, Deployment, etc. appropriate for the role.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          roadmap_style: { type: Type.STRING },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                section_name: { type: Type.STRING },
                learning_stage: { type: Type.STRING },
                nodes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      order: { type: Type.NUMBER },
                      mandatory: { type: Type.BOOLEAN },
                      description: { type: Type.STRING }
                    },
                    required: ["id", "label", "order", "mandatory"]
                  }
                }
              },
              required: ["section_name", "learning_stage", "nodes"]
            }
          },
          dependencies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                from: { type: Type.STRING },
                to: { type: Type.STRING }
              },
              required: ["from", "to"]
            }
          },
          learning_notes: {
            type: Type.OBJECT,
            properties: {
              order_not_strict: { type: Type.BOOLEAN },
              beginner_friendly: { type: Type.BOOLEAN }
            },
            required: ["order_not_strict", "beginner_friendly"]
          }
        },
        required: ["role", "roadmap_style", "sections", "dependencies", "learning_notes"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getCareerAdvice = async (history: { role: string; content: string }[], profile: UserProfile) => {
  const chat = ai.chats.create({
    model: 'gemini-1.5-flash-001',
    config: {
      systemInstruction: `You are PathPilot AI, a personalized career advisor. Help the student with placement strategies.`,
    }
  });
  const lastMessage = history[history.length - 1].content;
  const result = await chat.sendMessage({ message: lastMessage });
  return result.text;
};

export const generatePrepPlan = async (targetRole: string, days: number, currentLevel: string): Promise<any> => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-001",
    contents: `Generate a ${days}-day gamified quest for "${targetRole}" (${currentLevel} level).

Return JSON with: questName, mainObjective, dailyQuests (5-7 tasks with id, title, xp, bonus), bossBattle (name, requirements, rewards), debuffs (title, desc, fix).`,
    config: {
      responseMimeType: "application/json"
    }
  });
  return JSON.parse(response.text || '{}');
};

export const generateDailyQuests = async (targetRole: string, dayNumber: number, currentLevel: string): Promise<any[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-001",
    contents: `Generate 5 daily quests for Day ${dayNumber} of ${targetRole} prep (${currentLevel} level).

Return JSON array with: id, title, xp, bonus.`,
    config: {
      responseMimeType: "application/json"
    }
  });
  return JSON.parse(response.text || '[]');
};

export const analyzeResumeATS = async (resumeData: any, targetRole: string, jobDescription?: string, currentLevel?: string, industry?: string, fileData?: any): Promise<ATSAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-001",
    contents: `Analyze this resume for ${targetRole}. ${JSON.stringify(resumeData)}`,
    config: {
      responseMimeType: "application/json"
    }
  });
  return JSON.parse(response.text || '{}');
};

export const chatWithResume = async (chatHistory: any[], analysis: ATSAnalysis, userMessage: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-1.5-flash-001',
    config: {
      systemInstruction: `You are a Resume Assistant. The user has received an ATS analysis. Help them improve their resume based on the analysis. Be specific and actionable.`,
    }
  });

  const result = await chat.sendMessage({
    message: `User Query: ${userMessage}\n\nATS Score: ${analysis.ats_score.total}%\n\nProvide a helpful, specific answer.`
  });

  return result.text;
};

