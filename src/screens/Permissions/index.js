/**
 * Author : Ryan
 * Date : 2023-01-10
 * Desc : index
 */

import React, { useCallback } from 'react';
import { Dimensions, Platform, View, Text, TouchableOpacity } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import styled from 'styled-components/native';
import { useUserStore } from '@libs/zustand';
import Icons from '@components/Common/Icons';

export default function PermissionsSreen({ navigation }) {
  // Root State
  const { setUserPermissions } = useUserStore();
  // value
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPressRequestPermissions = () => {
    if (Platform.OS === 'android') {
      requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]).then(
        response => {
          setUserPermissions(true);
        },
      );
    }
  };

  return (
    <Wrapper
      style={{
        height: Platform.OS === 'ios' ? screenHeight : screenHeight,
      }}
    >
      <HeaderBlock>
        <HeaderText>앱 사용을 위한 접근권한</HeaderText>
      </HeaderBlock>
      <ContentBlock>
        <PermissionBox>
          <FlexRowBox>
            <IconBox>
              <Icons icon={'permissionCamera'} width={16} height={16} />
            </IconBox>
            <FlexColumnBox>
              <TitleText>카메라(선택)</TitleText>
              <DescriptionText>견적서 등 사진 등록 시 사진 업로드</DescriptionText>
            </FlexColumnBox>
          </FlexRowBox>
          <FlexRowBox>
            <IconBox>
              <Icons icon={'permissionGallery'} width={17} height={17} />
            </IconBox>
            <FlexColumnBox>
              <TitleText>저장공간(선택)</TitleText>
              <DescriptionText>견적서 등 사진 등록 시 사진 업로드</DescriptionText>
            </FlexColumnBox>
          </FlexRowBox>
        </PermissionBox>
        <NotiveBox>
          <FlexRowBox2>
            <DotText>∙</DotText>
            <FirstText>
              {'휴대폰 > 설정 > 발품노노 > 권한에서 설정을 변경할 수 있습니다.'}
            </FirstText>
          </FlexRowBox2>
          <FlexRowBox2>
            <DotText>∙</DotText>
            <SecondText>
              {
                '접근권한은 관련 기능 이용 시 동의하실 수 있으며, 미동의 시에도 앱을 이용할 수 있습니다.'
              }
            </SecondText>
          </FlexRowBox2>
        </NotiveBox>
      </ContentBlock>
      <ButtonBlock style={{ width: screenWidth - 40 }} onPress={onPressRequestPermissions}>
        <ButtonText>확인</ButtonText>
      </ButtonBlock>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
`;

const HeaderBlock = styled(View)`
  padding: 30px 25px;
`;

const HeaderText = styled(Text)`
  ${({ theme }) => theme.fontSet(20, 700, 25)};
`;

const ContentBlock = styled(View)`
  width: 100%;
  padding: 0px 25px 100px 25px;
`;

const PermissionBox = styled(View)`
  width: 100%;
  padding: 16px;
  background-color: #f2f4f6;
  border-radius: 14px;
`;

const FlexRowBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
  margin: 10px 0px;
`;

const IconBox = styled(View)`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  width: 26px;
  height: 26px;
  margin-right: 10px;
  background-color: white;
  border-radius: 13px;
`;

const FlexColumnBox = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
`;

const TitleText = styled(Text)`
  margin-bottom: 4px;
  color: #383838;
  ${({ theme }) => theme.fontSet(16, 500, 20)};
`;

const DescriptionText = styled(Text)`
  color: #777777;
  ${({ theme }) => theme.fontSet(14, 400, 20)};
`;

const NotiveBox = styled(View)`
  padding: 25px 0px;
`;

const FlexRowBox2 = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'row')};
`;

const DotText = styled(Text)`
  padding: 5px 5px;
  color: #777;
  ${({ theme }) => theme.fontSet(25, 400, 25)};
  text-align: center;
`;

const FirstText = styled(Text)`
  margin-bottom: 7px;
  color: #777;
  ${({ theme }) => theme.fontSet(15, 400, 20)};
  flex-shrink: 1;
`;

const SecondText = styled(Text)`
  color: #777;
  ${({ theme }) => theme.fontSet(15, 400, 20)};
  flex-shrink: 1;
`;

const ButtonBlock = styled(TouchableOpacity)`
  position: absolute;
  bottom: 40px;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
`;

const ButtonText = styled(Text)`
  width: 100%;
  height: 26px;
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
  text-align: center;
`;
