import { IProvider } from "../types/providers";

const ollama: IProvider = {
  name: "ollama",

  endpoint: "http://127.0.0.1:11434/api/chat",

  models: ["llama3.2", "llama3.3"],

  getSinglePrompt: (gitDiff, payload): string => {
    const commitType = payload?.commitType;

    return (
      `Write a professional git commit message based on the a diff below in english` +
      (commitType ? ` with commit type '${commitType}'. ` : ". ") +
      "Do not preface the commit with anything, use the present tense, return the full sentence, and use the conventional commits specification (<type in lowercase>: <subject>): " +
      "\n\n" +
      gitDiff
    );
  },

  getMultiplePrompt: (gitDiff, payload) => {
    const commitType = payload?.commitType;
    const numCommits = payload?.numCommits || 5;

    return (
      `Please write a professional commit message for me to push to github based on this git diff: ${gitDiff}. Message should be in english ` +
      (commitType ? ` with commit type '${commitType}.', ` : ", ") +
      `and make ${numCommits} options that are separated by ";".` +
      "For each option, use the present tense, return the full sentence, and use the conventional commits specification (<type in lowercase>: <subject>):"
    );
  },

  async getCommitMessage(prompt, payload) {
    const messages = [{ role: "user", content: prompt }];
    const model = payload?.model || "llama3.2";
    const requestBody = { model, messages, stream: false };

    try {
      const response = await fetch(ollama.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      const result = data?.message?.content;

      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get commit message from ollama");
    }
  },
};

export default ollama;
