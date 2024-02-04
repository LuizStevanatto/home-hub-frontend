import api from "@/services/api";
import { create } from "zustand";

export interface IContracts {
  id: string;
	propertyId: string;
	tentantId: string;
	ownerId: string;
	startDate: string;
	endDate: string;
	isActive: boolean;
	price: number;
	createdAt: Date;
	updatedAt: Date;
}

interface IUseContractsStore {
  contract: IContracts | null
  getContract: (id: string) => void
  getContracts: () => void
  getActiveContracts: () => void;
  getContractOwner: (id: string) => void
  getPropertyContracts: (id: string) => void
  getTenantContracts: (id: string) => void
  createContract: (contract: IContracts) => void
  updateContract: (contract: IContracts) => void
  deleteContract: (id: string) => void
}

export const useContractsStore = create<IUseContractsStore>((set) => ({
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

    return response.data.filter((contract: IContracts) => contract.isActive === true)
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

  async createContract(data: IContracts) {
    await api.post('/contracts', data)
  },

  async updateContract(data: IContracts) {
    await api.put(`/contracts/${data.id}`, data)
  },

  async deleteContract(id: string) {
    await api.delete(`/contracts/${id}`)
  }
}))