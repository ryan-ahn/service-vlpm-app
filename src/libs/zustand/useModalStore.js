/**
 * Author : Ryan
 * Date : 2022-09-21
 * Desc : useModalStore
 */

import create from 'zustand';

export const useModalStore = create(set => ({
  isOpen: false,
  modalType: 'UNSET',
  selectPurposeModal: true,
  openModal: payload => set(() => ({ isOpen: true, modalType: payload })),
  closeModal: () => set(() => ({ isOpen: false, modalType: 'UNSET' })),
  setSelectPurposeModal: payload => set(() => ({ selectPurposeModal: payload })),
}));
