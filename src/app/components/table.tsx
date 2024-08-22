"use client";
import { useEffect, useState } from "react";

import { useClienteStore } from "../../services/api";
import { Loading } from "./loading";

export function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const clienteStore = useClienteStore((store) => store);
  const users = useClienteStore((state) => state.clientes);

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
              {users.map((user) => {
                return (
                  <tr
                    className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                    key={user.id}
                  >
                    <th className="px-6 py-4 text-zinc-300">{user.id}</th>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-zinc-300"
                    >
                      {user.nome}
                    </td>
                    <td className="px-6 py-4 text-zinc-300">{user.email}</td>
                    <td className="px-6 py-4 text-zinc-300">{user.cpf}</td>
                    <td className="px-6 py-4 text-zinc-300">
                      <a
                        href="#"
                        className="font-medium ml-1 mr-3 text-blue-500 hover:underline hover:text-blue-300"
                      >
                        Editar
                      </a>
                      <a
                        href="#"
                        className="font-medium text-red-500 hover:underline hover:text-red-300"
                      >
                        Excluir
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
