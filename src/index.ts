#!/usr/bin/env node

import { execSync } from "child_process";
import { COMMIT_TYPE, IS_LIST, MODEL, NUM_COMMITS, PROVIDER } from "./config";
import { checkGitRepository, filterLockFiles } from "./helpers";
import { getProvider } from "./providers";

const generateCommit = async () => {
  const isGitRepository = checkGitRepository();

  if (!isGitRepository) {
    console.error("Oops! It looks like you're not inside a git repository.");
    process.exit(1);
  }

  let diff = execSync("git diff --staged").toString();

  diff = filterLockFiles(diff);

  if (!diff.trim()) {
    console.error("No changes to commit.");
    process.exit(1);
  }

  const provider = getProvider();

  let prompt;
  if (IS_LIST) {
    prompt = provider.getMultiplePrompt(diff, {
      commitType: COMMIT_TYPE,
      numCommits: NUM_COMMITS,
    });
  } else {
    prompt = provider.getSinglePrompt(diff, { commitType: COMMIT_TYPE });
  }

  const message = await provider.getCommitMessage(prompt, { model: MODEL });

  console.log("✨  " + message);
};

generateCommit();
