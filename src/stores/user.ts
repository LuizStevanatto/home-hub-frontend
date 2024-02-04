import api from "@/services/api";
import { create } from "zustand";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

interface SignUpProps {
  name: string,
  email: string
  password: string
  confirm_password?: string
}


interface IUseUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  signUp: (newUser: SignUpProps) => void
}

const useUserStore = create<IUseUserStore>((set) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),

  async signUp(data: SignUpProps) {
    await api.post('/users/signup', data)
  }
}));

export default useUserStore
