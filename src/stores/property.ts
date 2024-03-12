import api from "@/services/api";
import { create } from "zustand";

export interface IProperty {
  id?: string;
  name: string;
  address: string;
  number: string
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  description: string;
  price: number;
  isAvailable?: boolean;
  ownerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUsePropertyStore {
  createProperty: (property: IProperty) => void
  getProperty: (id: string) => Promise<IProperty>
  getProperties: () => Promise<IProperty[]>
  updateProperty: (property: IProperty) => void
  deleteProperty: (id: string) => void
}

export const usePropertyStore = create<IUsePropertyStore>(() => ({

  async createProperty(data: IProperty) {
    await api.post('/property', data)
  },

  async getProperty(id: string) {
    const response = await api.get(`/property/${id}`)

    return response.data
  },

  async getProperties() {
    const response = await api.get('/property')

    return response.data
  },

  async updateProperty(data: IProperty) {
    await api.put(`property/${data.id}`, {
      number: data.number,
      zipCode: data.zipCode,
      state: data.state,
      city: data.city,
      address: data.address,
      name: data.name,
      description: data.description,
      isAvailable: data.isAvailable,
      price: Number(data.price),
      country: data.country,
      ownerId: data.ownerId
    })
  },

  async deleteProperty(id: string) {
    await api.delete(`property/${id}`)
  },
}))