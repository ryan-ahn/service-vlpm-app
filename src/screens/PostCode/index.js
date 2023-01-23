/**
 * Author : Ryan
 * Date : 2022-08-30
 * Desc : index
 */

import React, { useCallback } from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import Postcode from '@actbase/react-daum-postcode';
import { useSignUpStore } from '@libs/zustand';
import StackHeader from '@components/Common/Header/StackHeader';

export default function PostCodeSreen({ navigation, route }) {
  // Root State
  const { setAddress } = useSignUpStore();
  // value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onSelectedAddress = useCallback(address => {
    setAddress(address.address);
    navigation.goBack();
  }, []);

  return (
    <Wrapper>
      <HeaderBlock>
        <StackHeader type="popup" title="주소 검색" navigation={navigation} route={route} />
      </HeaderBlock>
      <Postcode
        style={{ width: screenWidth, height: screenHeight }}
        onSelected={data => onSelectedAddress(data)}
        onError={error => console.log(error)}
        on
      />
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;
