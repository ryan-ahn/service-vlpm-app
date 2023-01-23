/**
 * Author : Ryan
 * Date : 2022-05-22
 * Desc : SmallBanner
 */

import React from 'react';
import { AppRegistry, Image, View } from 'react-native';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import mainBanner4 from '@asset/dummy/dummy4.jpg';

export default function SmallBanner() {
  return (
    <Swiper
      autoplay={true}
      autoplayTimeout={7}
      showsPagination={true}
      paginationStyle={{ bottom: 5 }}
      dotColor={'#999'}
      dotStyle={{ width: 5, height: 5 }}
      activeDotColor={'white'}
      activeDotStyle={{ width: 5, height: 5 }}
    >
      <SwiperImageBox>
        <SwiperImage source={mainBanner4} />
      </SwiperImageBox>
      {/* <SwiperImageBox>
        <SwiperImage source={mainBanner1} />
      </SwiperImageBox>
      <SwiperImageBox>
        <SwiperImage source={mainBanner1} />
      </SwiperImageBox> */}
    </Swiper>
  );
}

const SwiperImageBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 100px;
  background-color: #3a66bf;
`;
const SwiperImage = styled(Image)`
  width: 356px;
  height: 96%;
  border-radius: 20px;
`;
