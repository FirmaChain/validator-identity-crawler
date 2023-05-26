import { FirmaUtil } from '@firmachain/firma-js';
import { readFileSync, writeFileSync } from 'fs';

import { IDENTITY_FILE_NAME, PUBLIC_PATH } from "../config";
import { FileData, ProfileInfo } from '../interfaces/common.interface';
import { InfoLog } from './logger.util';

export const FileUtil = () => {
  const getLocalFileHash = () => {
    const readData = readFileSync(`${PUBLIC_PATH}/${IDENTITY_FILE_NAME}`, 'utf8');
    const fileData: FileData = JSON.parse(readData);
  
    return FirmaUtil.getHashFromString(JSON.stringify(fileData.profileInfos));
  }

  const saveFileData = (profileInfos: ProfileInfo[]) => {
    const fileData: FileData = {
      profileInfos: profileInfos,
      lastUpdatedTime: new Date().getTime()
    }

    writeFileSync(`${PUBLIC_PATH}/${IDENTITY_FILE_NAME}`, JSON.stringify(fileData), { flag: 'w', encoding: 'utf8'});
    
    InfoLog("        The file was saved because there was a changed validator.");
  }

  return {
    getLocalFileHash,
    saveFileData,
  }
}