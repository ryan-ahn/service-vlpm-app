/**
 * Author : Ryan
 * Date : 2022-05-07
 * Desc : index
 */

import React, { useCallback, useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { COMMUNITY_TAB } from '@asset/data';
import PageHeader from '@components/Common/Header/PageHeader';
import CommunityContainer from '@components/Common/Container/CommunityContainer';
import ListFilter from '@components/Common/Filter/ListFilter';
import Icons from '@components/Common/Icons';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function CommunityTabScreen({ navigation }) {
  // State
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // Value
  const screenHeight = Dimensions.get('window').height;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const onPressRouteToCreatePost = useCallback(() => {
    navigation.navigate('createPost');
  }, []);

  return (
    <Wrapper style={{ height: screenHeight - 40 }}>
      <HeaderBlock>
        <PageHeader tab="community" />
      </HeaderBlock>
      <TabBlock>
        {COMMUNITY_TAB.map(tab => (
          <TabBox key={tab.id}>
            <TabText>{tab.name}</TabText>
          </TabBox>
        ))}
      </TabBlock>
      <ContentBlock
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <ListBox>
          <ListFilter />
        </ListBox>
        {posts.map(item => (
          <CommunityContainer
            key={item.id}
            recent={item.recent}
            title={item.title}
            name={item.name}
            content={item.content}
            date={item.date}
            view={item.view}
            heart={item.heart}
            comments={item.comment.length}
          />
        ))}
      </ContentBlock>
      <PostButtonBox onPress={onPressRouteToCreatePost}>
        <Icons icon={'communityPost'} width={43} height={43} />
      </PostButtonBox>
    </Wrapper>
  );
}

const Wrapper = styled(View)`
  position: relative;
`;

const HeaderBlock = styled(View)`
  padding: 0 20px;
  background-color: white;
`;

const TabBlock = styled(View)`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  padding: 10px 20px 10px 20px;
  background-color: white;
`;

const TabBox = styled(View)`
  padding: 10px 15px;
  border-radius: 6px;
  background-color: #f2f4f6;
  margin-right: 15px;
`;

const TabText = styled(Text)`
  color: #b1b8bf;
  ${({ theme }) => theme.fontSet(13, 700, 18)};
`;

const ListBox = styled(View)`
  padding: 18px 10px;
`;

const ContentBlock = styled(ScrollView)`
  padding: 0 20px;
  padding-bottom: 100px;
`;

const PostButtonBox = styled(TouchableOpacity)`
  position: absolute;
  bottom: 80px;
  right: 20px;
  width: 60px;
  padding: 7px 5px 7px 10px;
  height: 60px;
  border-radius: 25px;
  background-color: #557fe6;
`;
