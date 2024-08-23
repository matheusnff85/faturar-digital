"use client";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import useModalStore from "../../store/modal";
import { useClienteStore } from "../../services/api";

export function ModalCliente() {
  const nome = useModalStore((state) => state.nome);
  const email = useModalStore((state) => state.email);
  const cpf = useModalStore((state) => state.cpf);
  const id = useModalStore((state) => state.id);
  const modalStore = useModalStore((store) => store);
  const clienteStore = useClienteStore((store) => store);

  const formatCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpf;
  };

  return (
    <div
      id="crud-modal"
      tabIndex={1}
      aria-hidden="true"
      className={`${
        modalStore.isOpen ? "" : "hidden"
      } flex overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full h-[100%] max-h-full bg-zinc-800/60 transition-all animate-fadeIn`}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          modalStore.closeModal();
          toast.error(
            modalStore.mode === "create"
              ? "Criação cancelada."
              : "Edição cancelada."
          );
        }
      }}
    >
      <div className="self-center m-auto p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {modalStore.mode === "create"
                ? "Adicionar Cliente"
                : "Editar Cliente"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <X
                onClick={() => {
                  modalStore.closeModal();
                  toast.error(
                    modalStore.mode === "create"
                      ? "Criação cancelada."
                      : "Edição cancelada."
                  );
                }}
              />
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="John Doe"
                  value={nome}
                  onChange={(event) => modalStore.setNome(event.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="exemplo@gmail.com"
                  value={email}
                  onChange={(event) => modalStore.setEmail(event.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="cpf"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  CPF
                </label>
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="123.456.789-10"
                  maxLength={14}
                  value={cpf}
                  onChange={(event) => {
                    const formatedCpf = formatCPF(event.target.value);
                    modalStore.setCpf(formatedCpf);
                  }}
                />
              </div>
            </div>
            <button
              onClick={(event) => {
                event.preventDefault();
                if (modalStore.mode === "create") {
                  clienteStore.addCliente({ nome, email, cpf });
                  toast.success("Cliente adicionado.");
                } else {
                  clienteStore.updateCliente(id, { nome, email, cpf });
                  toast.success("Cliente atualizado.");
                }
                modalStore.setNome("");
                modalStore.setEmail("");
                modalStore.setCpf("");
                modalStore.closeModal();
              }}
              disabled={
                nome.length < 3 ||
                email.length < 5 ||
                !email.includes("@") ||
                cpf.length < 14
              }
              className="text-white w-full font-medium m-auto rounded-lg text-sm mt-5 px-5 py-2.5 text-center bg-green-600 hover:bg-green-400 disabled:bg-zinc-500 disabled:cursor-default"
            >
              {modalStore.mode === "create" ? "Criar" : "Editar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
