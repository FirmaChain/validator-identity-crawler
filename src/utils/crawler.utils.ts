import { FirmaSDK, FirmaUtil, ValidatorDataType } from "@firmachain/firma-js";
import { StakingValidatorStatus } from "@firmachain/firma-js/dist/sdk/FirmaStakingService";

import { FIRMACHAIN_CONFIG } from "../config";
import { ExtractData, ProfileInfo } from "../interfaces/common.interface";
import { keybaseFetchData } from "./keybase.util";
import { InfoLog } from "./logger.util";

export const CrawlerUtil = () => {
  const firmaSDK = new FirmaSDK(FIRMACHAIN_CONFIG);

  const getProfileInfos = async () => {
    try {
      const validatorList = await getValidatorList();
      const extractDatas = getExtractDatas(validatorList);
      const urlDatas = await getUrlByIdentity(extractDatas);

      InfoLog("        Successful identity image lookup by validators.");
      
      return urlDatas;
    } catch (e) {
      throw e;
    }
  }

  const getValidatorList = async () => {
    try {
      const validators = await firmaSDK.Staking.getValidatorList();

      let dataList = validators.dataList;
      let nextKey = validators.pagination.next_key;

      while (nextKey !== null) {
        const nextValidators = await firmaSDK.Staking.getValidatorList(StakingValidatorStatus.ALL, nextKey);
        
        nextKey = nextValidators.pagination.next_key;
        dataList.push(...nextValidators.dataList);
      }

      return dataList;
    } catch (e) {
      throw { func: "getValidatorList", error: e };
    }
  }

  const getExtractDatas = (validatorDatas: ValidatorDataType[]) => {
    const extractDatas = validatorDatas.filter(target => target.description !== undefined && target.description.identity !== "")
    .map(target => ({
      operatorAddress: target.operator_address,
      identity: target.description.identity
    }));

    return extractDatas;
  }

  const getUrlByIdentity = async (extractDatas: ExtractData[]) => {
    try {
      const profileInfos: ProfileInfo[] = [];
      for (let i = 0; i < extractDatas.length; i++) {
        const current = extractDatas[i];
        const url = await keybaseFetchData(current.identity);
        profileInfos.push({
          operatorAddress: current.operatorAddress,
          url: url
        });
      }
      
      return profileInfos;
    } catch (e) {
      throw { func: "getUrlByIdentity", error: e };
    }
  }

  const getHash = (jsonString: string) => {
    return FirmaUtil.getHashFromString(jsonString);
  }

  return {
    getProfileInfos,
    getHash,
  }
}