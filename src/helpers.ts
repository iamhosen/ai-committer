import { execSync } from "child_process";

const getArgs = (): { [key: string]: string | boolean } => {
  const args = process.argv.slice(2);
  const result: { [key: string]: string | boolean } = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.includes("=")) {
      const [key, value] = arg.split("=");
      result[key.replace(/^--/, "")] = value;
    } else {
      const key = arg.replace(/^--/, "");
      const nextArg = args[i + 1];

      if (/^--/.test(nextArg) || nextArg === undefined) {
        result[key] = true;
      } else {
        result[key] = nextArg;
        i++;
      }
    }
  }
  return result;
};

const checkGitRepository = () => {
  try {
    const output = execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf-8",
    });
    return output.trim() === "true";
  } catch (err) {
    return false;
  }
};

export { getArgs, checkGitRepository };
