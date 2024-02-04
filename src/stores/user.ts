import api from "@/services/api";
import { destroyCookie } from "nookies";
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

interface UpdateUserProps {
  firstName: string
  lastName: string
  email: string
}



interface IUseUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  signUp: (newUser: SignUpProps) => void
  updateUser: (credentials: UpdateUserProps) => void;
  deleteUser: (id: string) => void;
}

const useUserStore = create<IUseUserStore>((set, get) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),

  async signUp(data: SignUpProps) {
    await api.post('/users/signup', data)
  },

  async updateUser(data: UpdateUserProps) {
    const { user } = get()

    const response = await api.patch(`users/${user?.id}`, data)
    set({ setUser: response.data })
  },

  async deleteUser(id: string) {
    await api.delete(`users/${id}`)
    destroyCookie(null, "@webcasas:user_token");
    
    set({ user: null })
  }
}));

export default useUserStore
