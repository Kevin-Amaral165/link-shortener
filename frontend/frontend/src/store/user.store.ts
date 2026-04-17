// store/user.store.ts
import { create, type StoreApi, type UseBoundStore } from "zustand";

export interface User {
  name: string;
  email: string;
  token: string;
}

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const USER_STORAGE_KEY: string = "myapp_user";

export const useUserStore: UseBoundStore<StoreApi<UserState>> = create<UserState>((set) => ({
  user: (() => {
    const stored: string | null = localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  })(),

  setUser: (user): void => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    set({ user });
  },

  clearUser: (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
    set({ user: null });
  },
}));