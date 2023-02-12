/**
 * Author : Ryan
 * Date : 2022-10-07
 * Desc : useMainStore
 */

import create from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSuccessStore = create(set => ({
  // Async State
  successList: null,
  successDetail: null,
  errorMessage: '',
  isLoadingSuccessDeal: false,
  isLoadingSuccessDealDetail: false,
  isFetchedSuccessDeal: false,
  isFetchedSuccessDealDetail: false,
  hasErrorsSuccessDeal: false,
  hasErrorsSuccessDealDetail: false,
  // Fetch
  fetchSuccessDeal: async () => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingSuccessDeal: true, isFetchedSuccessDeal: false }));
    try {
      const response = await axios.get('https://api.vlpmcorp.com/v1/success_deal', {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        successList: response.data.result,
        isLoadingSuccessDeal: false,
        isFetchedSuccessDeal: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        isLoadingSuccessDeal: false,
        isFetchedSuccessDeal: false,
        hasErrorsSuccessDeal: true,
      }));
    }
  },
  fetchSuccessDealDetail: async ({ id }) => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingSuccessDealDetail: true, isFetchedSuccessDealDetail: false }));
    try {
      const response = await axios.get(`https://api.vlpmcorp.com/v1/success_deal/${id}`, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        successDetail: response.data.result,
        isLoadingSuccessDealDetail: false,
        isFetchedSuccessDealDetail: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        isLoadingSuccessDealDetail: false,
        isFetchedSuccessDealDetail: false,
        hasErrorsSuccessDealDetail: true,
      }));
    }
  },
  // Init
  initSuccessDealError: () => {
    set({
      errorMessage: '',
      hasErrorsSuccessDealDetail: false,
    });
  },
}));
