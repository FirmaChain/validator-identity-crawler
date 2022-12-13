import { exec } from "child_process";

export const executeCommand = (cmd: string, callback: (isSuccess: boolean) => void) => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      callback(false);
    }

    console.log(stdout);

    callback(true);
  });
}