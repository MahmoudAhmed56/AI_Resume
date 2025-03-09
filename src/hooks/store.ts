import { create } from 'zustand';

type RefStore = {
  sharedRef: React.RefObject<HTMLDivElement> | null;
  setSharedRef: (ref: React.RefObject<HTMLDivElement>) => void;
};

export const useRefStore = create<RefStore>((set) => ({
  sharedRef: null,
  setSharedRef: (ref) => set({ sharedRef: ref }),
}));