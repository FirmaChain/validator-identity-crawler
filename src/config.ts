import { FirmaConfig } from "@firmachain/firma-js";

export const FIRMACHAIN_CONFIG = FirmaConfig.MainNetConfig;
export const KEYBASE_URL = "https://keybase.io/_/api/1.0/user";
export const KEYBASE_PATH = "/lookup.json?fields=pictures&key_suffix=";
export const PUBLIC_PATH = `${__dirname}/../public`;
export const IDENTITY_FILE_NAME = "identity.json";
export const COMMIT_MESSAGE = "update: identity.json file has been updated";