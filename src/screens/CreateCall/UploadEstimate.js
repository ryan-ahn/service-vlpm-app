/**
 * Author : Ryan
 * Date : 2022-05-31
 * Desc : LastStep
 */

import React, { useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { STACK_TITLE } from '@asset/data';
import { useModalStore, useCallStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';
import EstimateUploadModal from '@components/Modal/EstimateUploadModal';
import StackTitle from '@components/Common/Title/StackTitle';

export default function UploadEstimate() {
  // Root State
  const { openModal } = useModalStore();
  const { memo, setMemo, previewImage } = useCallStore();

  const onPressImageUpload = useCallback(() => {
    openModal('ESTIMATE_UPLOAD');
  }, []);

  const onChangeMessage = useCallback(
    e => {
      setMemo(e);
    },
    [memo],
  );

  const renderPreviewImage = useCallback(() => {
    if (previewImage) {
      return (
        <>
          <PreviewImage
            source={{
              uri: previewImage,
            }}
          />
        </>
      );
    }
  }, [previewImage]);

  return (
    <Wrapper>
      <EstimateUploadModal />
      <StackTitle
        title={STACK_TITLE.selectEstimate.title}
        description={STACK_TITLE.selectEstimate.description}
        option={true}
      />
      <ImageBlock>
        <IconBox onPress={onPressImageUpload}>
          <Icons icon={'estimateUpload'} size={58} />
        </IconBox>
        {renderPreviewImage()}
      </ImageBlock>
      <StackTitle
        title={STACK_TITLE.leaveMessage.title}
        description={STACK_TITLE.leaveMessage.description}
        option={true}
      />
      <MessageBox>
        <MessagePaddingBox>
          <MessageInput
            maxLength={500}
            multiline={true}
            placeholder={'탭해서 작성하기'}
            onChangeText={e => onChangeMessage(e)}
          />
        </MessagePaddingBox>
        <MaxLength>{memo.length + '/500자'}</MaxLength>
      </MessageBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ImageBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  padding: 10px 20px 50px 20px;
`;

const IconBox = styled(TouchableOpacity)`
  margin-right: 10px;
`;

const PreviewImage = styled(Image)`
  width: 58px;
  height: 58px;
  margin-right: 10px;
  border-radius: 10px;
`;

const MessageBox = styled(View)`
  width: 100%;
  height: 230px;
  margin-top: 10px;
  padding: 0 25px;
`;

const MessagePaddingBox = styled(View)`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 15px;
`;

const MessageInput = styled(TextInput)`
  padding: 20px;
  ${({ theme }) => theme.fontSet(15, 400, 25)};
`;

const MaxLength = styled(Text)`
  position: absolute;
  bottom: 10px;
  right: 37px;
  color: #dbdbdb;
  ${({ theme }) => theme.fontSet(15, 400, 22)};
  text-align: right;
`;
