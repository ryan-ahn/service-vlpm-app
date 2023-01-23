/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : Estimate Type Screen
 */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { STACK_TITLE } from '@asset/data';
import StackHeader from '@components/Common/Header/StackHeader';
import StackTitle from '@components/Common/Title/StackTitle';
import EstimateTypeContainer from '@components/Common/Container/EstimateTypeContainer';
import NewEstimateTypeModal from '@components/Modal/NewEstimateTypeModal';
import EstimateToContinueModal from '@components/Modal/EstimateToContinueModal';

export default function EstimateTypeScreen({ navigation, route }) {
  return (
    <Wrapper>
      <EstimateToContinueModal navigation={navigation} />
      <NewEstimateTypeModal navigation={navigation} />
      <HeaderBlock>
        <StackHeader type={'stack'} navigation={navigation} route={route} />
      </HeaderBlock>
      <StackTitle
        title={STACK_TITLE.estimateType.title}
        description={STACK_TITLE.estimateType.description}
      />
      <ContentsBlock>
        <EstimateTypeContainer
          navigation={navigation}
          type={'selectBrand'}
          title={'브랜드로 추천받기'}
          description={'동일 브랜드로 구매하면 저렴해요!'}
        />
        <EstimateTypeContainer
          navigation={navigation}
          type={'selectBudget'}
          title={'예산으로 추천받기'}
          description={'예산에 맞게 추천해 드려요!'}
        />
        <EstimateTypeContainer
          navigation={navigation}
          type={'selectModel'}
          title={'모델명으로 추천받기'}
          description={'동원하는 모델을 포함해서 추천받아요!'}
        />
      </ContentsBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ContentsBlock = styled(View)`
  padding: 25px;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;
