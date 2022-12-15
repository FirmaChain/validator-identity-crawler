import async from "async";
import { executeCommand } from "./bashCmd";
import {
  GIT_ADD_FILE_NAME,
  GIT_COMMIT_FILE_NAME,
  GIT_CONFIG_FILE_NAME,
  GIT_PULL_FILE_NAME,
  GIT_PUSH_FILE_NAME
} from "../config";

export const InitGitConfig = () => {
  executeCommand(GIT_CONFIG_FILE_NAME, (isSuccess) => {
    if (isSuccess) {
      console.log('[SUCCESS] GIT CONFIG SET UP');
    }
    return isSuccess;
  });
};

export const gitPushProcess = (callback: (comment: string) => void) => {
  try {
    async.waterfall([
      gitPullExecute,
      gitAddExecute,
      gitCommitExecute,
      gitPushExecute
    ], function () {
      callback("Uploaded it to Github as the latest file.");
    });
  } catch (e) {
    throw e;
  }
};

const gitPullExecute = (callback: () => void) => {
  executeCommand(GIT_PULL_FILE_NAME, (isSuccess, errorMsg) => {
    if (isSuccess) {
      callback();
    } else {
      throw `<GIT PULL> ${errorMsg}`;
    }
  });
};

const gitAddExecute = (callback: () => void) => {
  executeCommand(GIT_ADD_FILE_NAME, (isSuccess, errorMsg) => {
    if (isSuccess) {
      callback();
    } else {
      throw `<GIT ADD> ${errorMsg}`;
    }
  });
};

const gitCommitExecute = (callback: () => void) => {
  executeCommand(GIT_COMMIT_FILE_NAME, (isSuccess, errorMsg) => {
    if (isSuccess) {
      callback();
    } else {
      throw `<GIT COMMIT> ${errorMsg}`;
    }
  });
};

const gitPushExecute = (callback: () => void) => {
  executeCommand(GIT_PUSH_FILE_NAME, (isSuccess, errorMsg) => {
    if (isSuccess) {
      callback();
    } else {
      throw `<GIT PUSH> ${errorMsg}`;
    }
  });
}