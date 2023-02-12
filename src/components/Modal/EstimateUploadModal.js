/**
 * Author : Ryan
 * Date : 2022-06-10
 * Desc : EstimateUpload
 */

import React, { useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styled from 'styled-components/native';
import { useModalStore, useCallStore } from '@libs/zustand';

export default function EstimateUploadModal() {
  // Root State
  const { isOpen, modalType, closeModal } = useModalStore();
  const { uploadImage, setUploadImage, previewImage, setPreviewImage, fetchUploadImage } =
    useCallStore();

  const onPressImagePicker = useCallback(
    async type => {
      switch (type) {
        case 'album':
          await launchImageLibrary({ includeBase64: true }, response => {
            if (response.didCancel) {
              return;
            } else if (response.assets && response.assets.length !== 0) {
              const file = response.assets[0];
              const formdata = new FormData();
              formdata.append('file', file.uri);
              fetchUploadImage(data);
              // setUploadImage(file.fileName);
              setPreviewImage(file.uri);
            }
          }).catch(e => console.log('error', e));
          closeModal();
          break;
        case 'camera':
          await launchCamera({ includeBase64: true }, response => {
            if (response.didCancel) {
              return;
            } else if (response.assets && response.assets.length !== 0) {
              const file = response.assets[0];
              const formdata = new FormData();
              formdata.append('file', file.uri);
              fetchUploadImage(formdata);
              // setUploadImage(file.fileName);
              setPreviewImage(file.uri);
            }
          }).catch(e => console.log(e));
          closeModal();
          break;
      }
    },
    [uploadImage, previewImage],
  );

  return (
    <Wrapper>
      <Modal
        animationType="fade"
        statusBarTranslucent={true}
        transparent={true}
        visible={isOpen && modalType === 'ESTIMATE_UPLOAD'}
      >
        <ModalView onTouchEnd={() => closeModal()}>
          <ContentBlock>
            <TitleTextBox>
              <TitleBoldText>{'어떻게 업로드 할까요? 📂'}</TitleBoldText>
            </TitleTextBox>
            <AlbumButtonBox onPress={() => onPressImagePicker('album')}>
              <AlbumButtonText>사진첩에서 가져오기</AlbumButtonText>
            </AlbumButtonBox>
            <CameraButtonBox onPress={() => onPressImagePicker('camera')}>
              <CameraButtonText>사진 촬영하기</CameraButtonText>
            </CameraButtonBox>
          </ContentBlock>
        </ModalView>
      </Modal>
    </Wrapper>
  );
}

const Wrapper = styled(View)``;

const ModalView = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-end', 'row')};
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ContentBlock = styled(View)`
  width: 100%;
  height: 240px;
  padding: 30px 25px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const TitleTextBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'flex-start', 'column')};
  margin-bottom: 20px;
`;

const TitleBoldText = styled(Text)`
  ${({ theme }) => theme.fontSet(22, 700, 33)};
`;

const AlbumButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  margin-bottom: 10px;
  border-radius: 14px;
  background-color: #557fe6;
`;

const AlbumButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;

const CameraButtonBox = styled(TouchableOpacity)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 100%;
  height: 55px;
  border: 1px solid #557fe6;
  border-radius: 14px;
  background-color: white;
`;

const CameraButtonText = styled(Text)`
  color: #557fe6;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;
