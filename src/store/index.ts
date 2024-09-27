import { create } from "zustand";

interface UserState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useUserStore = create<UserState>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  clearToken: () => set({ token: null }),
}));

export default useUserStore;
