import { getArgs } from "./helpers";
import { TCommitTypes } from "./types/providers";

export const args = getArgs();

export const PROVIDER = args.provider || "ollama";

export const MODEL: string | undefined =
  typeof args.model === "string" ? args.model : undefined;

export const COMMIT_TYPE: TCommitTypes | undefined =
  typeof args.commitType === "string"
    ? (args.commitType as TCommitTypes)
    : undefined;

const DEFAULT_NUM_COMMITS = 5;
export const NUM_COMMITS: number =
  typeof args.numCommits === "string"
    ? parseInt(args.numCommits)
    : DEFAULT_NUM_COMMITS;

export const IS_LIST = !!args.list;
