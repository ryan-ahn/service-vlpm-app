/**
 * Author : Ryan
 * Date : 2022-07-24
 * Desc : index
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Platform, View, Text, Pressable } from 'react-native';
import styled, { css } from 'styled-components/native';
import { useCallStore, useSpecificationStore } from '@libs/zustand';
import { PRODUCT_MENU } from '@asset/data';
import StackHeader from '@components/Common/Header/StackHeader';
import StackTitle from '@components/Common/Title/StackTitle';

export default function SpecificationIndex({ navigation, route }) {
  // Root State
  const { brand, categoryList, setCategoryTagList } = useCallStore();
  const { productType } = useSpecificationStore();
  // State
  const [selectedTag, setSelectedTag] = useState([]);
  // Value
  const screedWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const onPressAddToTag = useCallback(
    tagName => {
      const copiedSelectedTag = [...selectedTag];
      if (copiedSelectedTag.some(item => item === tagName)) {
        setSelectedTag(copiedSelectedTag.filter(item => item !== tagName));
      } else {
        setSelectedTag(copiedSelectedTag.concat(tagName));
      }
    },
    [selectedTag, productType],
  );

  const onPressCompleteSpecification = useCallback(() => {
    const copiedCategoryList = [...categoryList];
    const copiedCategoryProduct = [...categoryList].filter(item => item.id === productType)[0];
    copiedCategoryList.filter(item => item === copiedCategoryProduct)[0].tags = selectedTag;
    setCategoryTagList(copiedCategoryList);
    navigation.goBack();
  }, [categoryList, productType, selectedTag]);

  useEffect(() => {
    if (categoryList.filter(item => item.id === productType)[0].tags !== undefined) {
      setSelectedTag(categoryList.filter(item => item.id === productType)[0].tags);
    }
  }, []);

  return (
    <>
      {PRODUCT_MENU.filter(filteredItem => filteredItem.id === productType).map(item => (
        <Wrapper key={item.id} style={{ height: screenHeight }}>
          <HeaderBlock>
            <StackHeader type={'popup'} navigation={navigation} route={route} />
          </HeaderBlock>
          <TitleBlock>
            <StackTitle
              title="스펙 선택"
              description="생각한 모델이 없을 경우 스펙을 선택해 주세요."
            />
          </TitleBlock>
          <BallonTail />
          <ContentBlock>
            <ProductTypeName>{item.name}</ProductTypeName>
            {item.tag
              .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
              .filter(tagItem => tagItem.tag_row === 0).length > 0 ? (
              <RowBlock>
                {item.tag
                  .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
                  .filter(tagItem => tagItem.tag_row === 0)
                  .map(tagRowItem => (
                    <TagBox
                      key={tagRowItem.tag_id}
                      attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}
                      onPress={() => onPressAddToTag(tagRowItem.tag_name)}
                    >
                      <RowText attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}>
                        {tagRowItem.tag_name}
                      </RowText>
                    </TagBox>
                  ))}
              </RowBlock>
            ) : null}
            {item.tag
              .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
              .filter(tagItem => tagItem.tag_row === 1).length > 0 ? (
              <RowBlock>
                {item.tag
                  .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
                  .filter(tagItem => tagItem.tag_row === 1)
                  .map(tagRowItem => (
                    <TagBox
                      key={tagRowItem.tag_id}
                      attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}
                      onPress={() => onPressAddToTag(tagRowItem.tag_name)}
                    >
                      <RowText attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}>
                        {tagRowItem.tag_name}
                      </RowText>
                    </TagBox>
                  ))}
              </RowBlock>
            ) : null}
            {item.tag
              .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
              .filter(tagItem => tagItem.tag_row === 2).length > 0 ? (
              <RowBlock>
                {item.tag
                  .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
                  .filter(tagItem => tagItem.tag_row === 2)
                  .map(tagRowItem => (
                    <TagBox
                      key={tagRowItem.tag_id}
                      attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}
                      onPress={() => onPressAddToTag(tagRowItem.tag_name)}
                    >
                      <RowText attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}>
                        {tagRowItem.tag_name}
                      </RowText>
                    </TagBox>
                  ))}
              </RowBlock>
            ) : null}
            {item.tag
              .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
              .filter(tagItem => tagItem.tag_row === 3).length > 0 ? (
              <RowBlock>
                {item.tag
                  .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
                  .filter(tagItem => tagItem.tag_row === 3)
                  .map(tagRowItem => (
                    <TagBox
                      key={tagRowItem.tag_id}
                      attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}
                      onPress={() => onPressAddToTag(tagRowItem.tag_name)}
                    >
                      <RowText attrActive={selectedTag.some(ele => ele === tagRowItem.tag_name)}>
                        {tagRowItem.tag_name}
                      </RowText>
                    </TagBox>
                  ))}
              </RowBlock>
            ) : null}
            {item.tag
              .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
              .filter(tagItem => tagItem.tag_row === 4).length > 0 ? (
              <RowBlock>
                {item.tag
                  .filter(tagItem => tagItem.tag_type === brand || tagItem.tag_type === 'all')
                  .filter(tagItem => tagItem.tag_row === 4)
                  .map(tagRowItem => (
                    <TagBox
                      key={tagRowItem.tag_id}
                      attrActive={selectedTag.some(ele => ele === tagRowItem.tag_id)}
                      onPress={() => onPressAddToTag(tagRowItem.tag_id, tagRowItem.tag_name)}
                    >
                      <RowText attrActive={selectedTag.some(ele => ele === tagRowItem.tag_id)}>
                        {tagRowItem.tag_name}
                      </RowText>
                    </TagBox>
                  ))}
              </RowBlock>
            ) : null}
          </ContentBlock>
          <CompleteButtonBox
            style={{ width: screedWidth - 40, bottom: Platform.OS === 'ios' ? 20 : 50 }}
            onPress={onPressCompleteSpecification}
          >
            <CompleteButtonText>{'완료'}</CompleteButtonText>
          </CompleteButtonBox>
        </Wrapper>
      ))}
    </>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
  background-color: #f2f3f4;
`;

const TitleBlock = styled(View)`
  padding-bottom: 20px;
  background-color: #f2f3f4;
`;

const BallonTail = styled(View)`
  width: 0;
  height: 0;
  margin-left: 20px;
  border-bottom-width: 20px;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  border-top-width: 20px;
  border-top-style: solid;
  border-top-color: #f2f3f4;
  border-left-width: 20px;
  border-left-style: solid;
  border-left-color: transparent;
  border-right-width: 20px;
  border-right-style: solid;
  border-right-color: transparent;
`;

const ContentBlock = styled(View)`
  padding: 20px;
`;

const ProductTypeName = styled(Text)`
  ${({ theme }) => theme.fontSet(25, 700, 35)};
`;

const RowBlock = styled(View)`
  flex-wrap: wrap;
  width: 100%;
  margin: 20px 0;
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
`;

const TagBox = styled(Pressable)`
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 10px 15px;
  border-radius: 6px;
  background-color: #f2f3f4;
  ${props =>
    props.attrActive &&
    css`
      background-color: #557fe6;
    `}
`;

const RowText = styled(Text)`
  ${({ theme }) => theme.fontSet(14, 700, 18)};
  ${props =>
    props.attrActive &&
    css`
      color: white;
    `}
`;

const CompleteButtonBox = styled(Pressable)`
  position: absolute;
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  height: 60px;
  margin-left: 20px;
  border-radius: 14px;
  background-color: #557fe6;
  ${props =>
    props.attrDisabled &&
    css`
      display: none;
    `}
`;

const CompleteButtonText = styled(Text)`
  color: white;
  ${({ theme }) => theme.fontSet(18, 400, 26)};
`;
