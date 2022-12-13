import {
  GIT_ADD_FILE_NAME, GIT_COMMIT_FILE_NAME, GIT_CONFIG_FILE_NAME, GIT_PULL_FILE_NAME, GIT_PUSH_FILE_NAME
} from "../config";
import { executeCommand } from "./bashCmd";

export const InitGitConfig = () => {
  executeCommand(GIT_CONFIG_FILE_NAME, (isSuccess) => {
    if (isSuccess) {
      console.log('[SUCCESS] GIT CONFIG SET UP');
    }
    return isSuccess;
  });
};

export const gitPushProcess = (callback: (isSuccess: boolean, comment: string) => void) => {
  executeCommand(GIT_PULL_FILE_NAME, (pullResult) => {
    if (pullResult) {
      console.log('[SUCCESS] GIT PULL');

      executeCommand(GIT_ADD_FILE_NAME, (addResult) => {
        if (addResult) {
          console.log('[SUCCESS] GIT ADD FILE');

          executeCommand(GIT_COMMIT_FILE_NAME, (commitResult) => {
            if (commitResult) {
              console.log('[SUCCESS] GIT COMMIT');

              executeCommand(GIT_PUSH_FILE_NAME, (pushResult) => {
                if (pushResult) {
                  console.log('[SUCCESS] GIT PUSH');
                  callback(pushResult, "process completed");
                } else {
                  console.log('[FAILED] GIT PUSH');
                  callback(pushResult, "process failed");
                }
              });
            } else {
              console.log('[FAILED] GIT COMMIT');
              callback(commitResult, "process failed");
            }
          });
        } else {
          console.log('[FAILED] GIT ADD FILE');
          callback(addResult, "process failed");
        }
      });
    } else {
      console.log('[FAILED] GIT PULL');
      callback(pullResult, "process failed");
    }
  });
};