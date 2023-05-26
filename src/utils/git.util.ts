import simpleGit from "simple-git";
import path from "path";

import { COMMIT_MESSAGE, IDENTITY_FILE_NAME, PUBLIC_PATH } from "../config";
import { InfoLog } from "./logger";

const repoPath = path.resolve(__dirname, '../');
const git = simpleGit(repoPath);

export const GitUtil = () => {
  const pull = async () => {
    try {
      const pullResult = await git.pull();

      if (pullResult.summary.changes !== 0) {
        InfoLog("        Received a new pull");
      }
    } catch (e) {
      throw { func: "GitUtil", error: e };
    }
  }

  const commitAndPush = async () => {
    try {
      await git.add(`${PUBLIC_PATH}/${IDENTITY_FILE_NAME}`);
      await git.commit(COMMIT_MESSAGE);
      await git.push();

      InfoLog("        Succeeded in committing and pushing on github.");
    } catch (e) {
      throw { func: "commitAndPush", error: e };
    }
  }

  return {
    pull,
    commitAndPush
  }
}