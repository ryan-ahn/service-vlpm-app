/**
 * Author : Ryan
 * Date : 2022-08-01
 * Desc : index
 */

import React, { useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { css } from 'styled-components';
import StackHeader from '@components/Common/Header/StackHeader';
import Icons from '@components/Common/Icons';

export default function CreatePostScreen({ navigation, route }) {
  // State
  const [privatePost, setPrivatePost] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Value
  const screenHeight = Dimensions.get('window').height;

  const addPost = async () => {
    // TODO: 게시글 API 추가
    navigation.goBack();
  };

  return (
    <Wrapper style={{ height: screenHeight }}>
      <HeaderBlock>
        <StackHeader type={'popup'} title={'글쓰기'} navigation={navigation} route={route} />
      </HeaderBlock>
      <ContentBlock>
        <TitleInput
          placeholder={'제목을 입력하세요 (30자 제한)'}
          onChangeText={text => setTitle(text)}
        />
        <ContentInput
          placeholder={'내용을 입력하세요 (300자 제한)'}
          onChangeText={text => setContent(text)}
        />
      </ContentBlock>
      <ButtonBlock>
        <TouchableOpacity onPress={addPost}>
          <PostText>등록</PostText>
        </TouchableOpacity>
        <PrivateBox>
          <PrivateText>익명</PrivateText>
          <CheckBox attrCheck={privatePost} onPress={() => setPrivatePost(!privatePost)}>
            {privatePost ? <Icons icon={'checkBoxWhite'} width={14} height={8.6} /> : null}
          </CheckBox>
        </PrivateBox>
      </ButtonBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
`;

const ContentBlock = styled(View)``;

const TitleInput = styled(TextInput)`
  padding: 25px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  ${({ theme }) => theme.fontSet(16, 400, 25)};
`;
const ContentInput = styled(TextInput)`
  padding: 25px;
  ${({ theme }) => theme.fontSet(16, 400, 25)};
`;

const ButtonBlock = styled(View)`
  position: absolute;
  bottom: 0;
  ${({ theme }) => theme.flexSet('space-between', 'flex-start', 'row')};
  width: 100%;
  height: 100px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #f2f4f6;
`;

const PostText = styled(Text)`
  margin-left: 10px;
  padding: 20px;
  ${({ theme }) => theme.fontSet(17, 700, 23)};
`;

const PrivateBox = styled(View)`
  padding: 20px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
`;

const PrivateText = styled(Text)`
  margin-right: 7px;
  color: #939494;
  ${({ theme }) => theme.fontSet(16, 300, 20)};
`;

const CheckBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 23px;
  height: 23px;
  border: 1px solid #d9d9d9;
  border-radius: 12.5px;
  background-color: white;
  ${props =>
    props.attrCheck &&
    css`
      border: 1px solid #557fe6;
      background-color: #557fe6;
    `}
`;
