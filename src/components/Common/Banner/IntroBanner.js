/**
 * Author : Ryan
 * Date : 2022-05-22
 * Desc : SmallBanner
 */

import React from 'react';
import { Image, View, Text } from 'react-native';
import styled from 'styled-components';
import Swiper from 'react-native-swiper';
import contentImage1 from '@asset/icons/intro/intro-content1.png';
import contentImage2 from '@asset/icons/intro/intro-content2.png';

export default function IntroBanner() {
  return (
    <Swiper
      autoplay={true}
      autoplayTimeout={5}
      showsPagination={true}
      paginationStyle={{ bottom: 5 }}
      dotColor={'#999'}
      dotStyle={{ width: 5, height: 5 }}
      activeDotColor={'white'}
      activeDotStyle={{ width: 5, height: 5 }}
    >
      <SlideBox>
        <FirstImage source={contentImage1} resizeMode={'contain'} />
        <BrandCopy>거래 수수료 0원!</BrandCopy>
        <BrandDescription>가전 준비를 한번에!</BrandDescription>
      </SlideBox>
      <SlideBox>
        <SecondImage source={contentImage2} resizeMode={'contain'} />
        <BrandCopy>같은 상품, 다른 가격?</BrandCopy>
        <BrandDescription>발품은 더 이상 그만!</BrandDescription>
      </SlideBox>
    </Swiper>
  );
}

const SlideBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  width: 100%;
  height: 100%;
`;

const FirstImage = styled(Image)`
  width: 100px;
  height: 100px;
`;
const SecondImage = styled(Image)`
  width: 150px;
  height: 200px;
`;

const BrandCopy = styled(Text)`
  ${({ theme }) => theme.fontSet(32, 700, 45)};
  text-align: center;
`;

const BrandDescription = styled(Text)`
  ${({ theme }) => theme.fontSet(32, 100, 45)};
  text-align: center;
`;
