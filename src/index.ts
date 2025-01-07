#!/usr/bin/env node

import { execSync } from "child_process";
import { COMMIT_TYPE, IS_LIST, MODEL, NUM_COMMITS } from "./config";
import { checkGitRepository, commit, filterLockFiles } from "./helpers";
import { getProvider } from "./providers";
import { input, confirm } from "@inquirer/prompts";

const generateCommit = async () => {
  const isGitRepository = checkGitRepository();

  if (!isGitRepository) {
    console.error("Oops! It looks like you're not inside a git repository.");
    process.exit(1);
  }

  let diff = execSync("git diff --staged").toString();

  diff = filterLockFiles(diff);

  if (!diff.trim()) {
    console.error(
      "❌  No changes to commit. Staging changes before running this script."
    );
    process.exit();
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

  let commitMessage = "";
  try {
    commitMessage = await provider.getCommitMessage(prompt, { model: MODEL });
    console.log("\n==================");
    console.log("✨  " + commitMessage);
    console.log("==================\n");
  } catch (error) {
    console.log("\n🚨  Generating commit message failed!");
    process.exit();
  }

  if (IS_LIST) {
    process.exit();
  }

  try {
    const confirmCommit = await confirm({
      message: "Do you confirm the commit message?",
    });

    if (confirmCommit) {
      commit(commitMessage);

      process.exit(0);
    }

    const confirmEdit = await confirm({
      message: "Do you want to edit the commit message?",
    });

    if (confirmEdit) {
      const editedMessage = await input({
        message: "Edit the commit message:",
        default: commitMessage,
      });

      commit(editedMessage);
    }
  } catch (error) {
    console.log("\n🚨  Commit Failed!");
  }

  process.exit(0);
};

generateCommit();
