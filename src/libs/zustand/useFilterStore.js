/**
 * Author : Ryan
 * Date : 2022-09-21
 * Desc : useFilterStore
 */

import create from 'zustand';

export const useFilterStore = create(set => ({
  currentValue: 0,
  initFilter: () => set(() => ({ step: 0 })),
  setFilter: payload => set({ currentValue: payload }),
}));
