import axios from "axios";
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;
// const model = "gpt-3.5-turbo"; // You can use other models like "text-davinci-003" as well
const models = {
  chat: "gpt-3.5-turbo",
  completion: "code-davinci-002",
};

const axiosInstance = axios.create({
  baseURL: "https://api.openai.com/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export interface Message {
  role: string;
  content: string;
}

export async function generateChat(messages: Message[]): Promise<string> {
  if (messages.length === 0) {
    throw new Error("[] is too short - 'messages'");
  }

  try {
    const response = await axiosInstance.post("/chat/completions", {
      model: models.chat,
      messages,
      temperature: 0,
    });

    const generatedText = response.data.choices[0].message.content;
    return generatedText.trim();
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error.message);
    throw error;
  }
}
