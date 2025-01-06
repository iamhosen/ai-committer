export type TProviders = "ollama" | "openai";

export type TCommitTypes =
  | "feat"
  | "fix"
  | "docs"
  | "style"
  | "refactor"
  | "perf"
  | "test"
  | "chore";

export interface IRequestPayload {
  model?: string;
}

export interface ISinglePromptPayload {
  commitType?: TCommitTypes;
}

export interface IMultiplePromptPayload {
  commitType?: TCommitTypes;
  numCommits?: number;
}

export interface IProvider {
  name: TProviders;
  endpoint: string;
  defaultModel: string;
  getCommitMessage: (
    prompt: string,
    payload?: IRequestPayload
  ) => Promise<string>;
  getSinglePrompt: (gitDiff: string, payload?: ISinglePromptPayload) => string;
  getMultiplePrompt: (
    gitDiff: string,
    payload?: IMultiplePromptPayload
  ) => string;
}
