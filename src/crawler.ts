import { ErrorLog, InfoLog } from "./utils/logger.util";
import { CrawlerUtil } from "./utils/crawler.utils";
import { FileUtil } from "./utils/file.utils";
import { GitUtil } from "./utils/git.util";

const crawlerUtil = CrawlerUtil();
const fileUtil = FileUtil();
const gitUtil = GitUtil();

const startCrawler = async () => {
  InfoLog("[START] Initiate identity image lookup for validators.");

  try {
    // Get repo config file
    await gitUtil.pull();

    // Get validator infos
    const profileInfos = await crawlerUtil.getProfileInfos();

    // compare file hash
    const newHashData = crawlerUtil.getHash(JSON.stringify(profileInfos));
    const oldHashData = fileUtil.getLocalFileHash();

    if (newHashData !== oldHashData) {
      // Save file
      fileUtil.saveFileData(profileInfos);

      // Proceed with github process
      await gitUtil.commitAndPush();
    } else {
      // not save
      InfoLog("        No images have been changed and will not be saved.");
    }
  } catch (e) {
    ErrorLog(e);
  } finally {
    InfoLog("[STOP] Ends image lookup for validators.");
  }
}

startCrawler();