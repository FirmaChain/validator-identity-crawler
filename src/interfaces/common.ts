export interface ValidatorExtractData {
  operatorAddress: string,
  identity: string
};

export interface ValidatorProfileInfo {
  operatorAddress: string,
  url: string
};

export interface IdentityFileInfo {
  profileInfos: ValidatorProfileInfo[],
  lastUpdatedTime: number
};