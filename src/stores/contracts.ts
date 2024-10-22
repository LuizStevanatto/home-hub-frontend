import api from "@/services/api";
import { create } from "zustand";

export interface IContract {
  id?: string;
  propertyId?: string;
  tentantId: string;
  ownerId?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUseContractsStore {
  contract: IContract | null
  getContract: (id: string) => Promise<IContract>
  getContracts: () => Promise<IContract[]>
  getActiveContracts: () => Promise<IContract[]>;
  getContractOwner: (id: string) => Promise<IContract>
  getPropertyContracts: (id: string) => Promise<IContract[]>
  getTenantContracts: (id: string) => Promise<IContract[]>
  createContract: (contract: IContract) => void
  updateContract: (contract: IContract) => void
  deleteContract: (id: string) => void
}

export const useContractsStore = create<IUseContractsStore>(() => ({
  contract: null,

  async getContract(id: string) {
    const response = await api.get(`/contracts/${id}`)

    return response.data
  },

  async getContracts() {
    const response = await api.get('/contracts')

    return response.data
  },

  async getActiveContracts() {
    const response = await api.get('/contracts')

    return response.data.filter((contract: IContract) => contract.isActive === true)
  },

  async getContractOwner(id: string) {
    const response = await api.get(`/contracts/owner/${id}`)

    return response.data
  },

  async getPropertyContracts(id: string) {
    const response = await api.get(`/contracts/property/${id}`)

    return response.data
  },

  async getTenantContracts(id: string) {
    const response = await api.get(`/contracts/tenant/${id}`)

    return response.data
  },

  async createContract(data: IContract) {
    await api.post('/contracts', data)
  },

  async updateContract(data: IContract) {
    await api.put(`/contracts/${data.id}`, data)
  },

  async deleteContract(id: string) {
    await api.delete(`/contracts/${id}`)
  }
}))