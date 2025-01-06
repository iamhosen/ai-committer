import * as dotenv from "dotenv";
import { getArgs } from "./helpers";
import { TCommitTypes } from "./types/providers";

dotenv.config();

export const args = getArgs();

export const PROVIDER = args.provider || process.env.AI_PROVIDER || "ollama";

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

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;