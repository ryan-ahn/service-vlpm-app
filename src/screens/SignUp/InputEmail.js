/**
 * Author : Ryan
 * Date : 2022-07-31
 * Desc : 1-FirstStep
 */

import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import { useSignUpStore } from '@libs/zustand';
import StackTitle from '@components/Common/Title/StackTitle';

export default function InputEmail() {
  // Root State
  const { email, setEmail } = useSignUpStore();
  // State
  const [focusedItem, setFocusedItem] = useState(false);

  return (
    <Wrapper>
      <TitleBox>
        <StackTitle title={'회원가입을 위해\n이메일 주소를 입력해 주세요'} />
      </TitleBox>
      <InputBox>
        <LabelText>이메일</LabelText>
        <Input
          attrFocus={focusedItem}
          keyboardType={'email-address'}
          placeholder={'예: joshua@vlpm.io'}
          onFocus={() => setFocusedItem(true)}
          onBlur={() => setFocusedItem(false)}
          onChangeText={text => setEmail(text)}
        ></Input>
      </InputBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const TitleBox = styled(View)`
  height: 100px;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const InputBox = styled(View)`
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'column')};
  padding: 25px;
  margin-top: 70px;
`;

const LabelText = styled(Text)`
  color: #333333;
  ${({ theme }) => theme.fontSet(13, 100, 20)};
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  border-bottom-width: 2px;
  border-bottom-color: #eee;
  padding: 5px 0;
  ${({ theme }) => theme.fontSet(16, 400, 25)};
  ${props =>
    props.attrFocus &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #6690ed;
    `}
`;
