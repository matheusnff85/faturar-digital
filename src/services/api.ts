import create from "zustand";
import axios from "axios";

// Interface IUser
export interface IUser {
  id: string;
  nome: string;
  email: string;
  cpf: string;
}

interface StoreState {
  clientes: IUser[];
  fetchClientes: () => Promise<void>;
  addCliente: (newCliente: Omit<IUser, "id">) => Promise<void>;
  updateCliente: (id: string, updatedCliente: Partial<IUser>) => Promise<void>;
  deleteCliente: (id: string) => Promise<void>;
}

const API_URL = "http://localhost:5000/clientes";

export const useClienteStore = create<StoreState>((set) => ({
  clientes: [],

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

  updateCliente: async (id: string, updatedCliente: Partial<IUser>) => {
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

  deleteCliente: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        clientes: state.clientes.filter((cliente) => cliente.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  },
}));
