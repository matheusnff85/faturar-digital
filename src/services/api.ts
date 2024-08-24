import { create } from "zustand";
import {
  fetchClientes,
  addCliente,
  updateCliente,
  deleteCliente,
  filterClientes,
} from "../database/database";

interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

interface ClienteState {
  clientes: Cliente[];
  filteredClientes: Cliente[];
  fetchClientes: () => void;
  addCliente: (cliente: Omit<Cliente, "id">) => void;
  updateCliente: (id: number, clienteData: Partial<Cliente>) => void;
  deleteCliente: (id: number) => void;
  filterClientes: (searchTerm: string) => void;
}

export const useClienteStore = create<ClienteState>((set) => ({
  clientes: [],
  filteredClientes: [],

  fetchClientes: () => {
    const clientes = fetchClientes();
    set({ clientes: clientes, filteredClientes: [] });
  },

  addCliente: (cliente) => {
    addCliente(cliente);
    fetchClientes();
  },

  updateCliente: (id, clienteData) => {
    const clienteAtualizado = updateCliente(id, clienteData);
    if (clienteAtualizado) {
      fetchClientes();
    }
  },

  deleteCliente: (id) => {
    const deletedCliente = deleteCliente(id);
    if (deletedCliente) {
      fetchClientes();
    }
  },

  filterClientes: (searchTerm) => {
    set((state) => ({
      filteredClientes: filterClientes(searchTerm),
    }));
  },
}));
