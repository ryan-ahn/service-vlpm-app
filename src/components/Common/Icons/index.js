/**
 * Author : Ryan
 * Date : 2022-05-17
 * Desc : index
 */

import React from 'react';
import logoSymbolGray from '@asset/icons/common/logo-symbol-gray.svg';
import homeActive from '@asset/icons/navigation/home-active.svg';
import homeDeactive from '@asset/icons/navigation/home-deactive.svg';
import communityActive from '@asset/icons/navigation/community-active.svg';
import communityDeactive from '@asset/icons/navigation/community-deactive.svg';
import estimateActive from '@asset/icons/navigation/estimate-active.svg';
import estimateDeactive from '@asset/icons/navigation/estimate-deactive.svg';
import mypageActive from '@asset/icons/navigation/mypage-active.svg';
import mypageDeactive from '@asset/icons/navigation/mypage-deactive.svg';
import rightArrowGray from '@asset/icons/common/right-arrow-gray.svg';
import rightArrowWhite from '@asset/icons/common/right-arrow-white.svg';
import rightArrow55 from '@asset/icons/common/right-arrow-55.svg';
import upArrow55 from '@asset/icons/common/up-arrow-55.svg';
import downArrow55 from '@asset/icons/common/down-arrow-55.svg';
import HeaderHomeAlert from '@asset/icons/common/header-home-alert.svg';
import headerSetting from '@asset/icons/common/header-setting.svg';
import HeadercommunitySearch from '@asset/icons/common/header-community-search.svg';
import leftArrowBlack from '@asset/icons/common/left-arrow-black.svg';
import closeXBlack from '@asset/icons/common/close-x-black.svg';
import checkBoxWhite from '@asset/icons/common/checkbox-white.svg';
import checkWhite from '@asset/icons/common/check-white.svg';
import successInfoCheck from '@asset/icons/common/success-info-check.svg';
import successInfoPercent from '@asset/icons/common/success-info-percent.svg';
import starRate from '@asset/icons/common/star-rate.svg';
import uploadImage from '@asset/icons/common/upload-image.svg';
import gooddealThumbnail from '@asset/icons/main/gooddeal-thumbnail.svg';
import storeSS from '@asset/icons/main/store-ss.svg';
import storeLG from '@asset/icons/main/store-lg.svg';
import storeEL from '@asset/icons/main/store-el.svg';
import storeHM from '@asset/icons/main/store-hm.svg';
import samsung from '@asset/icons/main/store-ss.svg';
import lg from '@asset/icons/main/store-lg.svg';
import electronic from '@asset/icons/main/store-el.svg';
import himart from '@asset/icons/main/store-hm.svg';
import estimateTypeBrand from '@asset/icons/stack/estimatetype-brand.svg';
import estimateTypeCard from '@asset/icons/stack/estimatetype-card.svg';
import estimateTypeModel from '@asset/icons/stack/estimatetype-model.svg';
import budgetThumb from '@asset/icons/stack/createcall-budget-thumb.svg';
import estimateUpload from '@asset/icons/stack/createcall-estimate-upload.svg';
import createCallComplete from '@asset/icons/stack/createcall-complete.svg';
import communityView from '@asset/icons/community/community-view.svg';
import communityHeart from '@asset/icons/community/community-heart.svg';
import communityComment from '@asset/icons/community/community-comment.svg';
import communityPost from '@asset/icons/community/community-post.svg';
import permissionCamera from '@asset/icons/intro/permission-camera.svg';
import permissionGallery from '@asset/icons/intro/permission-gallery.svg';

const icons = {
  // 네비게이션 아이콘
  homeActive: homeActive,
  homeDeactive: homeDeactive,
  estimateActive: estimateActive,
  estimateDeactive: estimateDeactive,
  communityActive: communityActive,
  communityDeactive: communityDeactive,
  mypageActive: mypageActive,
  mypageDeactive: mypageDeactive,
  // 공용 아이콘
  logoSymbolGray: logoSymbolGray,
  rightArrowWhite: rightArrowWhite,
  rightArrowGray: rightArrowGray,
  rightArrow55: rightArrow55,
  leftArrowBlack: leftArrowBlack,
  upArrow55: upArrow55,
  downArrow55: downArrow55,
  checkBoxWhite: checkBoxWhite,
  closeXBlack: closeXBlack,
  checkWhite: checkWhite,
  uploadImage: uploadImage,
  headerSetting: headerSetting,
  permissionCamera: permissionCamera,
  permissionGallery: permissionGallery,
  // 메인 페이지
  HeaderHomeAlert: HeaderHomeAlert,
  HeadercommunitySearch: HeadercommunitySearch,
  gooddealThumbnail: gooddealThumbnail,
  storeSS: storeSS,
  storeLG: storeLG,
  storeEL: storeEL,
  storeHM: storeHM,
  samsung: samsung,
  lg: lg,
  electronic: electronic,
  himart: himart,
  communityView: communityView,
  communityHeart: communityHeart,
  communityComment: communityComment,
  communityPost: communityPost,
  // 스택
  estimateTypeBrand: estimateTypeBrand,
  estimateTypeCard: estimateTypeCard,
  estimateTypeModel: estimateTypeModel,
  budgetThumb: budgetThumb,
  estimateUpload: estimateUpload,
  createCallComplete: createCallComplete,
  successInfoCheck: successInfoCheck,
  successInfoPercent: successInfoPercent,
  starRate: starRate,
};

export default function Icons({ icon, size, width, height, style, stroke }) {
  const Icon = icons[icon];
  if (Icon) {
    return <Icon width={width || size} height={height || size} style={style} stroke={stroke} />;
  }
  return null;
}
