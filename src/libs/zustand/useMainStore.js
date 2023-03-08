/**
 * Author : Ryan
 * Date : 2022-10-07
 * Desc : useMainStore
 */

import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMainStore = create(set => ({
  // Async State
  successDealList: null,
  promotionStoreList: null,
  promotionStoreDetail: null,
  errorMessage: '',
  isLoadingMain: false,
  isLoadingStoreDetail: false,
  isFetchedMain: false,
  isFetchedStoreDetail: false,
  hasErrorsMain: false,
  hasErrorsStoreDetail: false,
  // Fetch
  fetchMain: async () => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingMain: true, isFetchedMain: false }));
    try {
      const response = await axios.get('https://api.vlpmcorp.com/dev/main/customer', {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        successDealList: response.data.successDeals,
        promotionStoreList: response.data.promotionStore,
        isLoadingMain: false,
        isFetchedMain: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        isLoadingMain: false,
        isFetchedMain: false,
        hasErrorsMain: true,
      }));
    }
  },
  fetchStoreDetail: async ({ id }) => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingStoreDetail: true, isFetchedStoreDetail: false }));
    try {
      const response = await axios.get(`https://api.vlpmcorp.com/dev/promotion_store/${id}`, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        promotionStoreDetail: response.data.result,
        isLoadingStoreDetail: false,
        isFetchedStoreDetail: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        isLoadingStoreDetail: false,
        isFetchedStoreDetail: false,
        hasErrorsStoreDetail: true,
      }));
    }
  },
  // Init
  initMainError: () => {
    set({
      errorMessage: '',
      hasErrorsMain: false,
    });
  },
}));
