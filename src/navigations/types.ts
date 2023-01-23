/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : types
 */

import { StackNavigationProp } from '@react-navigation/stack';

// 과거의 유산
export enum ERootScreens {
  home = 'home',
  intro = 'intro',
  estimateType = 'estimateType',
  selectBrand = 'selectBrand',
  selectProduct = 'selectProduct',
  selectModel = 'selectModel',
}

export type TRootScreensParams = {
  home: THomeScreensParams;
  intro: undefined;
  estimateType: undefined;
  selectBrand: undefined;
  selectProduct: undefined;
  selectModel: undefined;
};

export enum EHomeScreens {
  homeTab = '홈',
  estimateTab = '견적상담',
  communityTab = '커뮤니티',
  mypageTab = '마이페이지',
}

export type THomeScreensParams = {
  홈: undefined;
  견적상담: undefined;
  커뮤니티: undefined;
  마이페이지: undefined;
};

type THomeNavigationProps = StackNavigationProp<TRootScreensParams, ERootScreens.home>;

interface THomeTabProps {
  navigation: THomeNavigationProps;
}
