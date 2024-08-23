import create from "zustand";
import axios from "axios";

// Interface IUser
export interface IUser {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

interface StoreState {
  clientes: IUser[];
  filteredClientes: IUser[];
  fetchClientes: () => Promise<void>;
  addCliente: (newCliente: Omit<IUser, "id">) => Promise<void>;
  updateCliente: (id: number, updatedCliente: Partial<IUser>) => Promise<void>;
  deleteCliente: (id: number) => Promise<void>;
  filterClientes: (searchTerm: string) => void;
}

const API_URL = "http://localhost:5252/clientes";

export const useClienteStore = create<StoreState>((set, get) => ({
  clientes: [],
  filteredClientes: [],

  fetchClientes: async () => {
    try {
      const response = await axios.get<IUser[]>(API_URL);
      set({ clientes: response.data });
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  },

  addCliente: async (newCliente: Omit<IUser, "id">) => {
    try {
      const response = await axios.post<IUser>(API_URL, newCliente);
      set((state) => ({
        clientes: [...state.clientes, response.data],
      }));
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  },

  updateCliente: async (id: number, updatedCliente: Partial<IUser>) => {
    try {
      const response = await axios.patch<IUser>(
        `${API_URL}/${id}`,
        updatedCliente
      );
      set((state) => ({
        clientes: state.clientes.map((cliente) =>
          cliente.id === id ? response.data : cliente
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  },

  deleteCliente: async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        clientes: state.clientes.filter((cliente) => cliente.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  },

  filterClientes: (searchTerm: string) => {
    const clientes = get().clientes;
    const filtered = clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.cpf.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredClientes: filtered });
  },
}));
