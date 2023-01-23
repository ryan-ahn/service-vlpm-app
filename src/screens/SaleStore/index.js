/**
 * Author : Ryan
 * Date : 2022-08-06
 * Desc : index
 */

import React, { useCallback } from 'react';
import { Dimensions, View, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import StackHeader from '@components/Common/Header/StackHeader';
import SmallBanner from '@components/Common/Banner/SmallBanner';
import ListFilter from '@components/Common/Filter/ListFilter';
import MainVerticalContainer from '@components/Common/Container/MainVerticalContainer';

export default function SaleStoreScreen({ navigation, route }) {
  // Value
  const screenHeight = Dimensions.get('window').height;

  return (
    <Wrapper style={{ height: screenHeight }}>
      <ScrollView>
        <HeaderBlock>
          <StackHeader
            type={'step'}
            title={'전국 할인 지점 찾기'}
            navigation={navigation}
            route={route}
          />
        </HeaderBlock>
        {/* <ContentBlock>
          <BannerBox>
            <SmallBanner />
          </BannerBox>
        </ContentBlock> */}
        {/* <ListBlock>
          <ListFilter />
        </ListBlock> */}
        <ContentBox>
          <MainVerticalContainer navigation={navigation} type={'searchStore'} count={999} />
        </ContentBox>
      </ScrollView>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  background-color: #f2f3f4;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
  background-color: white;
`;

const ContentBlock = styled(View)`
  padding: 20px;
`;

const BannerBox = styled(TouchableOpacity)`
  width: 100%;
  height: 100px;
  margin-bottom: 7px;
  border-radius: 7px;
  overflow: hidden;
`;

const ListBlock = styled(View)`
  padding: 0 30px;
`;

const ContentBox = styled(View)`
  width: 100%;
  padding: 20px;
  height: auto;
`;
