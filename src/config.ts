import * as dotenv from "dotenv";
import { getArgs } from "./helpers";
import { TCommitTypes, TProviders } from "./types/providers";

dotenv.config();

export const args = getArgs();

/**
 * The provider to use for the AI model.
 * e.g. "ollama", "openai"
 *
 * @type {TProviders}
 */
export const PROVIDER = args.provider || process.env.AI_PROVIDER || "ollama";

/**
 * The model to use for the AI provider.
 * e.g. "gpt-4o", "gpt-3.5-turbo"
 *
 * @type {string | undefined}
 */
export const MODEL: string | undefined =
  typeof args.model === "string" ? args.model : undefined;

/**
 * The commit type to use for the AI model.
 * e.g. "feat", "fix", "chore"
 *
 * @type {TCommitTypes | undefined}
 */
export const COMMIT_TYPE: TCommitTypes | undefined =
  typeof args.commitType === "string"
    ? (args.commitType as TCommitTypes)
    : undefined;

/**
 * The number of commits to generate.
 *
 * @default 5
 * @type {number}
 */
const DEFAULT_NUM_COMMITS = 5;
export const NUM_COMMITS: number =
  typeof args.numCommits === "string"
    ? parseInt(args.numCommits)
    : DEFAULT_NUM_COMMITS;

/**
 * Generate a list of commits.
 *
 * @default false
 * @type {boolean}
 */
export const IS_LIST = !!args.list;

/**
 * The OpenAI API key.
 *
 * Required for the "openai" provider
 *
 * @type {string | undefined}
 */
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
