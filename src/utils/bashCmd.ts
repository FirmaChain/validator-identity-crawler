import { exec } from "child_process";

export const executeCommand = (cmd: string, callback: (isSuccess: boolean, errorMsg: string) => void) => {
  try {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        callback(false, stderr);
      }
  
      callback(true, "");
    });
  } catch (e) {
    callback(false, "failed to execute");
  }
}