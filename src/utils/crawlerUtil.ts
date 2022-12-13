import { FirmaConfig, FirmaSDK, FirmaUtil, ValidatorDataType } from "@firmachain/firma-js";
import { ShortDescription, ValidatorProfileInfo } from "../interfaces/common";
import { getAxios } from "./axios";

export const getValidatorList = async () => {
  try {
    const firma = new FirmaSDK(FirmaConfig.MainNetConfig);
    const validatorList = await firma.Staking.getValidatorList();

    let dataList: ValidatorDataType[] = validatorList.dataList;
    let nextKey: string = validatorList.pagination.next_key;

    while (nextKey !== null) {
      const nextValidatorList = await firma.Staking.getValidatorList(nextKey);
      const nextDataList = nextValidatorList.dataList;
      nextKey = nextValidatorList.pagination.next_key;

      dataList.push(...nextDataList);
    }

    return dataList;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export const organizeIdentity = (validatorList: ValidatorDataType[]) => {
  let IdentityInfos: ShortDescription[] = [];

  for (let i = 0; i < validatorList.length; i++) {
    const currentValidator = validatorList[i];

    try {
      const valOperAddr = currentValidator.operator_address;
      const identity = currentValidator.description.identity;

      if (identity !== "") {
        IdentityInfos.push({ operatorAddress: valOperAddr, identity: identity });
      }
    } catch (e) {
      console.log(e);
      console.log(`${currentValidator.operator_address} - Abnormalities in value <- Identity ->.`);
    }
  }

  return IdentityInfos;
}

export const getImageUrlByIdentityInfos = async (identityInfos: ShortDescription[]) => {
  let validatorProfileInfos: ValidatorProfileInfo[] = [];

  for (let i = 0; i < identityInfos.length; i++) {
    const currentInfo = identityInfos[i];
    const imageUrl = await getAxios(currentInfo.identity, currentInfo.operatorAddress);
    
    validatorProfileInfos.push({
      operatorAddress: currentInfo.operatorAddress,
      url: imageUrl
    })
  }
  
  return validatorProfileInfos;
}

export const compareIdentityInfo = (newString: string, oldString: string) => {
  const newFileHash = FirmaUtil.getHashFromString(newString);
  const oldFileHash = FirmaUtil.getHashFromString(oldString);
  
  if (newFileHash === oldFileHash) {
    return true;
  }

  return false;
}