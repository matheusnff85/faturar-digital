import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  mode: string;
  id: number;
  nome: string;
  email: string;
  cpf: string;
  setId: (id: number) => void;
  setNome: (nome: string) => void;
  setEmail: (email: string) => void;
  setCpf: (cpf: string) => void;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  toggleMode: (mode: string) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  mode: "create",
  id: -1,
  nome: "",
  email: "",
  cpf: "",

  setId: (id: number) => set({ id }),
  setNome: (nome: string) => set({ nome }),
  setEmail: (email: string) => set({ email }),
  setCpf: (cpf: string) => set({ cpf }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMode: (mode: string) => set({ mode }),
}));

export default useModalStore;
