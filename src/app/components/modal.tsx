"use client";
import { X } from "lucide-react";
import useModalStore from "../../store/modal";
import { useState } from "react";
import { useClienteStore } from "../../services/api";

export function ModalCliente() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
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
        }
      }}
    >
      <div className="self-center m-auto p-4 w-full max-w-md">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Criar Novo Cliente
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <X onClick={() => modalStore.closeModal()} />
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
                  placeholder="Matheus Marinho"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
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
                  onChange={(event) => setEmail(event.target.value)}
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
                    setCpf(formatedCpf);
                  }}
                />
              </div>
            </div>
            <button
              onClick={(event) => {
                event.preventDefault();
                clienteStore.addCliente({ nome, email, cpf });
              }}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium m-auto rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Criar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
