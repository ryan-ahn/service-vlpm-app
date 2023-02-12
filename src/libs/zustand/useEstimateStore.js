/**
 * Author : Ryan
 * Date : 2022-11-19
 * Desc : useEstimateStore
 */

import create from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useEstimateStore = create(set => ({
  // Async State
  estimateList: null,
  channelUrl: null,
  errorMessage: '',
  isLoadingEstimateList: false,
  isLoadingCreateChat: false,
  isFetchedEstimateList: false,
  isFetchedCreateChat: false,
  hasErrorsEstimateList: false,
  hasErrorsCreateChat: false,
  // Fetch
  fetchEstimateList: async () => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingEstimateList: true, isFetchedEstimateList: false }));
    try {
      const response = await axios.get('https://api.vlpmcorp.com/v1/estimate', {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        estimateList: response.data.result,
        isLoadingEstimateList: false,
        isFetchedEstimateList: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data,
        hasErrorsEstimateList: true,
        isLoadingEstimateList: false,
        isFetchedEstimateList: false,
      }));
    }
  },
  fetchCreateChat: async payload => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingCall: true, isFetchedCall: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/v1/chat', payload, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        channelUrl: response.data.channel_url,
        isLoadingCreateChat: false,
        isFetchedCreateChat: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data,
        hasErrorsCreateChat: true,
        isLoadingCreateChat: false,
        isFetchedCreateChat: false,
      }));
    }
  },
  // Init
  initEstimateListStore: () => {
    set({
      estimateList: null,
      channelUrl: null,
      errorMessage: '',
      isLoadingEstimateList: false,
      isFetchedEstimateList: false,
      hasErrorsEstimateList: false,
    });
  },
  initEstimateChannelUrl: () => {
    set({
      channelUrl: null,
      errorMessage: '',
      isLoadingEstimateList: false,
      isFetchedEstimateList: true,
      hasErrorsEstimateList: false,
    });
  },
  initEstimateListError: () => {
    set({
      errorMessage: '',
      hasErrorsEstimateList: false,
      hasErrorsCreateChat: false,
    });
  },
}));
