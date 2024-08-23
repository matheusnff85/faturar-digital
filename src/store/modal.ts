import create from "zustand";

interface ModalState {
  isOpen: boolean;
  type: string;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: "create",

  openModal: () => set({ isOpen: true }),

  closeModal: () => set({ isOpen: false }),

  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useModalStore;
