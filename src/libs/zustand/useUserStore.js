/**
 * Author : Ryan
 * Date : 2022-09-21
 * Desc : useUserStore
 */

import axios from 'axios';
import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(set => ({
  // State
  userDetail: null,
  userLoggedIn: false,
  userPermissions: false,
  currEstimate: null,
  myCallList: [],
  myEstimateList: [],
  currRequest: null,
  // Async State
  errorMessage: '',
  isLoadingSignIn: false,
  isFetchedSignIn: false,
  hasErrorsSignIn: false,
  // Set State
  setUserDetail: payload => set({ userDetail: payload }),
  setUserLoggedIn: payload => set({ userLoggedIn: payload }),
  setUserPermissions: payload => set({ userPermissions: payload }),
  setCurrRequest: payload => set({ currRequest: payload }),
  setCurrEstimate: payload => set({ currEstimate: payload }),
  setCallList: payload => set({ myCallList: payload }),
  setChatList: payload => set({ chatList: payload }),
  // Fetch
  fetchSignIn: async ({ email, password }) => {
    set(() => ({ isLoadingSignIn: true, isFetchedSignIn: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/v1/auth/signin', {
        email: email,
        password: password,
      });
      await AsyncStorage.setItem('access', response.data.accessToken);
      set(() => ({
        userDetail: response.data.user,
        isLoadingSignIn: false,
        isFetchedSignIn: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsSignIn: true,
        isLoadingSignIn: false,
        isFetchedSignIn: false,
      }));
    }
  },

  // Init
  initSignInState: () =>
    set({
      userDetail: null,
      userLoggedIn: false,
      isLoadingSignIn: false,
      isFetchedSignIn: false,
      hasErrorsSignIn: false,
    }),
  initSignInError: () => {
    set({
      errorMessage: '',
      hasErrorsSignIn: false,
    });
  },
}));

export const useSignUpStore = create(set => ({
  signUpStep: 'email',
  email: '',
  password: '',
  repassword: '',
  name: '',
  contact: '',
  initSignUpStep: () => set(() => ({ signUpStep: 0 })),
  initPassword: () => set({ password: '', repassword: '' }),
  setSignUpStep: payload => set({ signUpStep: payload }),
  setEmail: payload => set({ email: payload }),
  setPassword: payload => set({ password: payload }),
  setRePassword: payload => set({ repassword: payload }),
  setName: payload => set({ name: payload }),
  setContact: payload => set({ contact: payload }),
  // Async State
  errorMessage: '',
  isLoadingSignUp: false,
  isFetchedSignUp: false,
  hasErrorsSignUp: false,
  // Fetch
  fetchSignUp: async ({ email, password, name, contact }) => {
    set(() => ({ isLoadingSignUp: true, isFetchedSignUp: false }));
    try {
      const response = await axios.post('https://api.vlpmcorp.com/v1/auth/signup', {
        type: 'customer',
        email: email,
        password: password,
        name: name,
        contact: contact,
      });
      set(() => ({
        isLoadingSignUp: false,
        isFetchedSignUp: true,
      }));
    } catch (e) {
      set(() => ({
        errorMessage: e.response.data.message,
        hasErrorsSignUp: true,
        isLoadingSignUp: false,
        isFetchedSignUp: false,
      }));
    }
  },
  // Init
  initSignUpStore: () =>
    set({
      signUpStep: 'email',
      email: '',
      password: '',
      repassword: '',
      name: '',
      contact: '',
      errorMessage: '',
      isLoadingSignUp: false,
      isFetchedSignUp: false,
      hasErrorsSignUp: false,
    }),
  initSignupInput: () =>
    set({
      email: '',
      password: '',
      repassword: '',
      name: '',
      contact: '',
    }),
  initSignUpError: () => {
    set({
      errorMessage: '',
      hasErrorsSignUp: false,
    });
  },
}));
