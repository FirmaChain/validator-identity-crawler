import {
  gitPushProcess,
  InitGitConfig
} from "./utils/gitUtil";
import {
  getNewValidatorProfileHash,
  getOldValidatorProfileHash,
  getValidatorProfileInfos,
  isDifferentHash,
  saveProfileInfos
} from "./utils/crawlerUtil";
import { ErrorLog, InfoLog } from "./utils/logger";

class CrawlerScheduler {
  constructor() {
    InitGitConfig();

    this.Start();
  }

  private async Start() {
    InfoLog("[START] crawling validator identity image");

    try {
      const profileInfos = await getValidatorProfileInfos();

      const newHash = await getNewValidatorProfileHash(profileInfos);
      const oldHash = getOldValidatorProfileHash();

      const isNeedUpdate = isDifferentHash(newHash, oldHash);

      if (isNeedUpdate) {
        const isSaved = saveProfileInfos(profileInfos);

        if (isSaved) {
          InfoLog("File saved successfully.");

          gitPushProcess((comment) => {
            InfoLog(`[END] ${comment}`);
          });
        }
      } else {
        InfoLog("[START] No identity image changes.");
      }
    } catch (e) {
      ErrorLog(e);
      return ;
    }
  }
}

new CrawlerScheduler();