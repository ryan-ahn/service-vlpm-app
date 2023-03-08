/**
 * Author : Ryan
 * Date : 2022-09-21
 * Desc : useSpecificationStore
 */

import { create } from 'zustand';

export const useSpecificationStore = create(set => ({
  productType: 0,
  initProductType: () => set(() => ({ step: 0 })),
  setProductType: payload => set({ productType: payload }),
}));
