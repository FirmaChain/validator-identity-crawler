import { FirmaConfig } from "@firmachain/firma-js";

export const FIRMACHAIN_CONFIG = FirmaConfig.MainNetConfig;
export const CRAWLER_CYCLE = 60 * 60 * 24;
export const KEYBASE_URL = "https://keybase.io/_/api/1.0/user";
export const KEYBASE_PATH = "/lookup.json?fields=pictures&key_suffix=";
export const PUBLIC_PATH = `${__dirname}/../public/`;
export const IDENTITY_FILE_NAME = "identity.json";
export const GIT_CONFIG_FILE_NAME = "bash shellScripts/gitConfig.sh";
export const GIT_PULL_FILE_NAME = "bash shellScripts/gitPull.sh";
export const GIT_ADD_FILE_NAME = "bash shellScripts/gitAdd.sh";
export const GIT_COMMIT_FILE_NAME = "bash shellScripts/gitCommit.sh";
export const GIT_PUSH_FILE_NAME = "bash shellScripts/gitPush.sh";