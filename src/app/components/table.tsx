"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useClienteStore } from "../../services/api";
import { Loading } from "./loading";
import useModalStore from "../../store/modal";

export function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const clienteStore = useClienteStore((store) => store);
  const clientes = useClienteStore((state) => state.clientes);
  const filteredClientes = useClienteStore((state) => state.filteredClientes);
  const modalStore = useModalStore((store) => store);

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);
      await clienteStore.fetchClientes();
      setIsLoading(false);
    };
    fetchApi();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="relative overflow-x-auto sm:rounded-lg w-2/3 mb-4 rounded-2xl mx-auto shadow-md shadow-zinc-500">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-sky-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-white">
                  Id
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Cpf
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Editar / Excluir
                </th>
              </tr>
            </thead>
            <tbody>
              {(filteredClientes.length > 0 ? filteredClientes : clientes).map(
                (cliente) => {
                  return (
                    <tr
                      className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                      key={cliente.id}
                    >
                      <th className="px-6 py-4 text-zinc-300">{cliente.id}</th>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap text-zinc-300"
                      >
                        {cliente.nome}
                      </td>
                      <td className="px-6 py-4 text-zinc-300">
                        {cliente.email}
                      </td>
                      <td className="px-6 py-4 text-zinc-300">{cliente.cpf}</td>
                      <td className="px-6 py-4 text-zinc-300">
                        <a
                          href="#"
                          className="font-medium ml-1 mr-3 text-blue-500 hover:underline hover:text-blue-300"
                          onClick={() => {
                            modalStore.toggleMode("edit");
                            modalStore.setId(cliente.id);
                            modalStore.setNome(cliente.nome);
                            modalStore.setEmail(cliente.email);
                            modalStore.setCpf(cliente.cpf);
                            modalStore.openModal();
                            toast.warn("Editando cliente...");
                          }}
                        >
                          Editar
                        </a>
                        <a
                          href="#"
                          className="font-medium text-red-500 hover:underline hover:text-red-300"
                          onClick={() => {
                            clienteStore.deleteCliente(cliente.id);
                            toast.error("Cliente removido.");
                          }}
                        >
                          Excluir
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
