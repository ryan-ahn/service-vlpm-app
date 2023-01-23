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

export default function InputPassword() {
  // Root State
  const { password, setPassword, repassword, setRePassword } = useSignUpStore();
  // State
  const [focusedItem, setFocusedItem] = useState(null);
  const [checkPassword, setCheckPassword] = useState(false);

  return (
    <Wrapper>
      <TitleBox>
        <StackTitle title={'비밀번호를\n입력해 주세요'} />
      </TitleBox>
      <InputBox>
        <LabelText>비밀번호</LabelText>
        <Input
          attrFocus={focusedItem === 0}
          secureTextEntry={true}
          placeholder={'영문 + 숫자 조합, 8글자 이상'}
          onFocus={() => setFocusedItem(0)}
          onBlur={() => setFocusedItem(null)}
          onChangeText={text => setPassword(text)}
        ></Input>
        <Input
          attrFocus={focusedItem === 1}
          secureTextEntry={true}
          placeholder={'비밀번호를 다시 입력해 주세요'}
          onFocus={() => setFocusedItem(1)}
          onBlur={() => setFocusedItem(null)}
          onChangeText={text => setRePassword(text)}
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
  padding: 5px 0px;
  margin-bottom: 15px;
  border-bottom-width: 2px;
  border-bottom-color: #eee;
  ${({ theme }) => theme.fontSet(16, 400, 25)};
  ${props =>
    props.attrFocus &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #6690ed;
    `}
`;
