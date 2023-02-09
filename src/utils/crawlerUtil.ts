import * as fs from 'fs';
import { FirmaConfig, FirmaSDK, FirmaUtil, ValidatorDataType } from "@firmachain/firma-js";
import { IdentityFileInfo, ValidatorExtractData, ValidatorProfileInfo } from "../interfaces/common";
import { getAxios } from "./axios";
import { IDENTITY_FILE_NAME, PUBLIC_PATH } from '../config';
import { StakingValidatorStatus } from '@firmachain/firma-js/dist/sdk/FirmaStakingService';

export const getValidatorProfileInfos = async () => {
  try {
    const validatorList = await _getValidatorList();
    const validatorExtractDatas = _getValidatorExtractDatas(validatorList);
    const validatorImageUrlDatas = await _getValidatorProfileInfos(validatorExtractDatas);
  
    return validatorImageUrlDatas;
  } catch (e) {
    throw e;
  }
}

const _getValidatorList = async () => {
  try {
    const firma = new FirmaSDK(FirmaConfig.MainNetConfig);
    const validatorList = await firma.Staking.getValidatorList();

    let dataList = validatorList.dataList;
    let nextKey = validatorList.pagination.next_key;

    while (nextKey !== null) {
      const nextValidatorList = await firma.Staking.getValidatorList(StakingValidatorStatus.ALL, nextKey);
      const nextDataList = nextValidatorList.dataList;
      nextKey = nextValidatorList.pagination.next_key;

      dataList.push(...nextDataList);
    }

    return dataList;
  } catch (e) {
    throw "Unable to get Validator list.";
  }
}

const _getValidatorExtractDatas = (validatorList: ValidatorDataType[]) => {
  let validatorExtractDatas: ValidatorExtractData[] = [];

  for (let i = 0; i < validatorList.length; i++) {
    const current = validatorList[i];

    try {
      const operatorAddress = current.operator_address;
      const identity = current.description.identity;

      if (current.description !== undefined && current.description.identity !== "") {
        validatorExtractDatas.push({ operatorAddress, identity });
      }
    } catch (e) {
      throw `${current.operator_address} - Do not have an identity.`;
    }
  }

  return validatorExtractDatas;
}

const _getValidatorProfileInfos = async (validatorExtractDatas: ValidatorExtractData[]) => {
  let validatorImageUrlDatas: ValidatorProfileInfo[] = [];

  for (let i = 0; i < validatorExtractDatas.length; i++) {
    const current = validatorExtractDatas[i];

    try {
      const operatorAddress = current.operatorAddress;
      const url = await getAxios(current.identity);

      validatorImageUrlDatas.push({operatorAddress, url});

    } catch (e) {
      throw `${current.operatorAddress} - Unable to get URL link.`;
    }
  }

  return validatorImageUrlDatas;
}

export const getNewValidatorProfileHash = async (validatorProfileInfos: ValidatorProfileInfo[]) => {
  const hashData: string = FirmaUtil.getHashFromString(JSON.stringify(validatorProfileInfos));

  return hashData;
}

export const getOldValidatorProfileHash = () => {
  try {
    const identityInfoString = fs.readFileSync(PUBLIC_PATH + IDENTITY_FILE_NAME, 'utf-8');
    const identityFileInfo: IdentityFileInfo = JSON.parse(identityInfoString);
    const validatorImageUrlDatas = identityFileInfo.profileInfos;
    const hashData = FirmaUtil.getHashFromString(JSON.stringify(validatorImageUrlDatas));

    return hashData;
  } catch (e) {
    throw "Unable to get historical profile data.";
  }
};

export const saveProfileInfos = (validatorExtractDatas: ValidatorProfileInfo[]) => {
  const dateTime = new Date().getTime();
  const identiTyFileInfo: IdentityFileInfo = {
    profileInfos: validatorExtractDatas,
    lastUpdatedTime: dateTime
  };

  try {
    const profileInfosJsonString = JSON.stringify(identiTyFileInfo);
    fs.writeFileSync(PUBLIC_PATH + IDENTITY_FILE_NAME, profileInfosJsonString, 'utf-8');

    return true;
  } catch (e) {
    return false;
  }
}