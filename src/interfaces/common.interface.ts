export interface ExtractData {
  operatorAddress: string,
  identity: string
};

export interface ProfileInfo {
  operatorAddress: string,
  url: string
};

export interface FileData {
  profileInfos: ProfileInfo[],
  lastUpdatedTime: number
};