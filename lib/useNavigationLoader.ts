import { create } from "zustand";

interface LoaderStore {
  loading: boolean;
  setLoading: (v: boolean) => void;
}

export const useNavigationLoader = create<LoaderStore>((set) => ({
  loading: false,
  setLoading: (v) => set({ loading: v }),
}));