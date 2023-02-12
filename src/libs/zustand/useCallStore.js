/**
 * Author : Ryan
 * Date : 2022-09-21
 * Desc : useEstimateStore
 */

import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCallStore = create(set => ({
  // State
  step: 0,
  sequence: [],
  requestType: '',
  estimateType: '',
  budget: 1200,
  brand: '',
  categoryList: [],
  estimateAll: true,
  purpose: '',
  address: '',
  memo: '',
  uploadImage: null,
  bestSeller: false,
  display: false,
  allRegion: false,
  previewImage: '',
  tempEstimateType: '',
  // Async State
  callList: [],
  errorMessage: '',
  isLoadingCall: false,
  isLoadingCallList: false,
  isLoadingSuccessDeal: false,
  isFetchedCall: false,
  isFetchedCallList: false,
  isFetchedSuccessDeal: false,
  hasErrorsCall: false,
  hasErrorsCallList: false,
  hasErrorsSuccessDeal: false,
  // Set State
  setStep: payload => set({ step: payload }),
  nextStep: () => set(state => ({ step: state.step + 1 })),
  prevStep: () => set(state => ({ step: state.step > 0 ? state.step - 1 : 0 })),
  setRequestType: payload => set({ requestType: payload }),
  setSequence: payload => set({ sequence: payload }),
  setEstimateType: payload => set({ estimateType: payload }),
  setBudget: payload => set({ budget: payload }),
  setBrand: payload => set({ brand: payload }),
  setEstimateAll: () => set(state => ({ estimateAll: !state.estimateAll })),
  setPurpose: payload => set({ purpose: payload }),
  setAddress: payload => set({ address: payload }),
  setUploadImage: payload => set({ uploadImage: payload }),
  setBestSeller: payload => set({ bestSeller: payload }),
  setDisplay: payload => set({ display: payload }),
  setAllRegion: payload => set({ allRegion: payload }),
  setPreviewImage: payload => set({ previewImage: payload }),
  setMemo: payload => set({ requestMessage: payload }),
  setCategoryList: id =>
    set(state => ({
      categoryList: state.categoryList.some(ele => ele.id === id)
        ? state.categoryList.filter(ele => ele.id !== id)
        : state.categoryList.concat({ id, modelName: null, tags: [] }),
    })),
  setCategoryModelName: (id, value) =>
    set(state => (state.categoryList.filter(item => item.id === id)[0].modelName = value)),
  setCategoryTagList: payload => set({ categoryList: payload }),
  setTempEstimateType: payload => set({ tempEstimateType: payload }),
  // Fetch
  fetchCall: async payload => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingCall: true, isFetchedCall: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/v1/call', payload, {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        isLoadingCall: false,
        isFetchedCall: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsCall: true,
        isLoadingCall: false,
        isFetchedCall: false,
      }));
    }
  },
  fetchCallList: async () => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingCallList: true, isFetchedCallList: false }));
    try {
      const response = await axios.get('https://api.vlpmcorp.com/v1/call', {
        headers: {
          Authorization: access,
        },
      });
      set(() => ({
        callList: response.data,
        isLoadingCallList: false,
        isFetchedCallList: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsCallList: true,
        isLoadingCallList: false,
        isFetchedCallList: false,
      }));
    }
  },
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
        callList: response.data,
        isLoadingSuccessDeal: false,
        isFetchedSuccessDeal: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsSuccessDeal: true,
        isLoadingSuccessDeal: false,
        isFetchedSuccessDeal: false,
      }));
    }
  },

  fetchUploadImage: async data => {
    const access = await AsyncStorage.getItem('access');
    set(() => ({ isLoadingSuccessDeal: true, isFetchedSuccessDeal: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/v1/upload', data, {
        headers: {
          Authorization: access,
        },
      });

      console.log(response);
      set(() => ({
        uploadImage: response.data.key,
        isLoadingSuccessDeal: false,
        isFetchedSuccessDeal: true,
      }));
    } catch (e) {
      console.log(e);
      set(() => ({
        errorMessage: e.response?.data?.message ?? e.message,
        hasErrorsSuccessDeal: true,
        isLoadingSuccessDeal: false,
        isFetchedSuccessDeal: false,
      }));
    }
  },

  // Init
  initStore: () =>
    set({
      step: 0,
      sequence: [],
      requestType: '',
      estimateType: '',
      budget: 1200,
      brand: '',
      estimateAll: true,
      purpose: '',
      address: '',
      memo: '',
      uploadImage: null,
      previewImage: '',
      tempEstimateType: '',
      categoryList: [],
      callList: [],
      errorMessage: '',
      isLoadingCall: false,
      isLoadingCallList: false,
      isFetchedCall: false,
      isFetchedCallList: false,
      hasErrorsCall: false,
      hasErrorsCallList: false,
    }),
  initCallError: () => {
    set({
      errorMessage: '',
      hasErrorsCall: false,
    });
  },
  initStep: () => set(() => ({ step: 0 })),
}));
