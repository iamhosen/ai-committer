import { IProvider } from "../types/providers";

const ollama: IProvider = {
  name: "ollama",

  endpoint: "http://127.0.0.1:11434/api/chat",

  defaultModel: "llama3.2",

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
    const numCommits = payload?.numCommits;

    return (
      `Please write a professional commit message for me to push to github based on this git diff: ${gitDiff}. Message should be in english ` +
      (commitType ? ` with commit type '${commitType}.', ` : ", ") +
      `and make ${numCommits} options that are separated by ";".` +
      "For each option, use the present tense, return the full sentence, and use the conventional commits specification (<type in lowercase>: <subject>):"
    );
  },

  getCommitMessage(prompt, payload) {
    const messages = [{ role: "user", content: prompt }];
    const model = payload?.model || this.defaultModel;
    const requestBody = { model, messages, stream: false };

    const result = fetch(ollama.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => data?.message?.content)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to get commit message from ollama");
      });

    return result;
  },
};

export default ollama;
