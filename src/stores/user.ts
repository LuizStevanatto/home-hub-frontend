import api from "@/services/api";
import { destroyCookie, setCookie } from "nookies";
import { create } from "zustand";

interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export interface IUser {
  id: string;
	email: string;
	name: string;
	password: string;
	isAdmin: boolean;
	isActive: boolean;
}

interface SignUpProps {
  name: string,
  email: string
  password: string
  confirm_password?: string
}

interface SignInProps {
  email: string
  password: string
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
  signIn: (data: SignInProps) => void
  updateUser: (data: UpdateUserProps) => void;
  deleteUser: (id: string) => void;
}

const useUserStore = create<IUseUserStore>((set, get) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),

  async signUp(data: SignUpProps) {
    await api.post('/users/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    })
  },

  async signIn(data: SignInProps) {
    const response = await api.post('/auth/signin', {
      email: data.email,
      password: data.password
    })

    const { accessToken, user }: ILoginResponse = response.data;

    setCookie(null, "@homeHub:user_token", accessToken, {
      maxAge: 86400,
      path: "/",
    });
    set({ user })
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
