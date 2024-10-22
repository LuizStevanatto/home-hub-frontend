import api from "@/services/api";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { create } from "zustand";

interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

export interface IUser {
  id: string;
	email: string;
	name: string;
	isAdmin: boolean;
  password?: string;
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


interface IUseUserStore {
  user: IUser | null;
  getUser: (id: string) => Promise<IUser>
  signUp: (newUser: SignUpProps) => void
  signIn: (data: SignInProps) => void
  updateUser: (data: IUser) => void;
  signOut(): void;
  deleteUser: (id: string) => void;
}

const useUserStore = create<IUseUserStore>((set, get) => ({
  user: null,

  async getUser(id: string) {
    const response = await api.get(`/users/${id}`)

    set({ user: response.data })
    return response.data
  },  

  async signUp(data: SignUpProps) {
    await api.post('/users/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    })
  },

  async signIn(data: SignInProps) {
    const { getUser } = get()

    const response = await api.post('/auth/signin', {
      email: data.email,
      password: data.password
    })

    const { accessToken }: ILoginResponse = response.data;
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    setCookie(null, "@homeHub:user_token", accessToken, {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    getUser(response.data.id)
  },

  async signOut() {
    destroyCookie(null, "@homeHub:user_token");
    set({ user: null })
  },

  async updateUser(data: IUser) {
    const response = await api.put(`users/${data.id}`, {
      email: data.email,
      name: data.name,
      isActive: data.isActive,
      isAdmin: data.isAdmin,
      password: data.password,
    })

    set({ user: response.data })
  },

  async deleteUser(id: string) {
    await api.delete(`users/${id}`)
    destroyCookie(null, "@homeHub:user_token");
    
    set({ user: null })
  }
}));

export default useUserStore
