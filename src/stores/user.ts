import { create } from "zustand";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

interface IUseUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useUserStore = create<IUseUserStore>((set) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),
}));

export default useUserStore;
