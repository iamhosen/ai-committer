import { OPENAI_API_KEY } from "../config";
import { IProvider } from "../types/providers";

const openai: IProvider = {
  name: "openai",

  endpoint: "https://api.openai.com/v1/chat/completions",

  defaultModel: "gpt-4o-mini",

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
    if (!OPENAI_API_KEY) {
      throw new Error("Please set the OPENAI_API_KEY environment variable.");
    }

    const messages = [{ role: "user", content: prompt }];
    const model = payload?.model || this.defaultModel;
    const requestBody = { model, messages, stream: false };

    const result = fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => data.choices[0].message.content)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to get commit message from ollama");
      });

    return result;
  },
};

export default openai;
