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
    set({ clientes, filteredClientes: clientes });
  },

  addCliente: (cliente) => {
    const novoCliente = addCliente(cliente);
    set((state) => ({
      clientes: [...state.clientes, novoCliente],
      filteredClientes: [...state.filteredClientes, novoCliente],
    }));
  },

  updateCliente: (id, clienteData) => {
    const clienteAtualizado = updateCliente(id, clienteData);
    if (clienteAtualizado) {
      set((state) => ({
        clientes: state.clientes.map((cliente) =>
          cliente.id === id ? clienteAtualizado : cliente
        ),
        filteredClientes: state.filteredClientes.map((cliente) =>
          cliente.id === id ? clienteAtualizado : cliente
        ),
      }));
    }
  },

  deleteCliente: (id) => {
    deleteCliente(id);
    set((state) => ({
      clientes: state.clientes.filter((cliente) => cliente.id !== id),
      filteredClientes: state.filteredClientes.filter(
        (cliente) => cliente.id !== id
      ),
    }));
  },

  filterClientes: (searchTerm) => {
    set((state) => ({
      filteredClientes: filterClientes(searchTerm),
    }));
  },
}));
