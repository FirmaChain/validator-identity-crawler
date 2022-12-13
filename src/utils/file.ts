
import { IDENTITY_FILE_NAME, PUBLIC_PATH } from '../config';
import * as fs from 'fs';

export const writeIdentityFile = (jsonString: string) => {
  try {
    fs.writeFileSync(PUBLIC_PATH + IDENTITY_FILE_NAME, jsonString, 'utf-8');
    console.log('[COMPLETED] write file');
  } catch (e) {
    console.log('[FAILED] write file');
  }
}

export const getIdentityFile = () => {
  try {
    const identityInfo = fs.readFileSync(PUBLIC_PATH + IDENTITY_FILE_NAME, 'utf-8');
    return identityInfo;
  } catch (e) {
    return "";
  }
}