import { getIdentityFile, writeIdentityFile } from "./utils/file";
import { IdentityFileInfo } from "./interfaces/common";
import {
  gitPushProcess,
  InitGitConfig
} from "./utils/gitUtil";
import {
  compareIdentityInfo,
  getImageUrlByIdentityInfos,
  getValidatorList,
  organizeIdentity
} from "./utils/crawlerUtil";

class CrawlerScheduler {
  constructor() {
    InitGitConfig();

    this.Start();
  }

  private async Start() {
    console.log("Start Crawler");
    const validatorList = await getValidatorList();
    if (validatorList.length === 0) {
      console.log("validatorList length is zero");
      this.Scheduler();
    }

    const identityInfos = organizeIdentity(validatorList);
    if (identityInfos.length === 0) {
      console.log("identityInfos length is zero");
      this.Scheduler();
    }

    const imageUrlByIdentityInfos = await getImageUrlByIdentityInfos(identityInfos);
    const newProfileJsonString = JSON.stringify(imageUrlByIdentityInfos);

    const oldIdentityJsonString = getIdentityFile();
    let oldProfileJsonString = "";

    if (oldIdentityJsonString !== "") {
      const oldProfileInfo: IdentityFileInfo = JSON.parse(oldIdentityJsonString);
      oldProfileJsonString = JSON.stringify(oldProfileInfo.profileInfos);
    }

    const compareResult = compareIdentityInfo(newProfileJsonString, oldProfileJsonString);

    console.log("End crawler");

    if (!compareResult) {
      const dateTime = new Date().getTime();
      const fileInfo: IdentityFileInfo = {
        profileInfos: imageUrlByIdentityInfos,
        lastUpdatedTime: dateTime
      };

      writeIdentityFile(JSON.stringify(fileInfo));

      gitPushProcess((isSuccess, comment) => {
        console.log(comment);
        this.Scheduler();
      });
    } else {
      this.Scheduler();
    }
  }

  private async Scheduler() {
    setTimeout(async () => {
      await this.Start();
    }, 5000);
  }
}

new CrawlerScheduler();