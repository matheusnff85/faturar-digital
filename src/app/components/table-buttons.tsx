"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useClienteStore } from "../../services/api";
import useModalStore from "../../store/modal";

export function TableButtons() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const openModal = useModalStore((store) => store.openModal);
  const filterClientes = useClienteStore((store) => store.filterClientes);

  return (
    <div className="flex items-center justify-around min-w-80 md:w-2/4  p-12  mb-4 rounded-2xl w-80 mx-auto h-10">
      <div className="flex items-center justify-between max-w-lg w-full p-2 rounded-md shadow-md border shadow-zinc-500 hover:shadow-zinc-700">
        <input
          type="text"
          placeholder="Pesquisar clientes"
          className="border-none w-full h-full text-sm placeholder-zinc-400 focus-visible:outline-none bg-transparent"
          value={searchBarValue}
          onChange={(event) => {
            setSearchBarValue(event.target.value);
            filterClientes(event.target.value);
          }}
        />
        {searchBarValue.length > 0 ? (
          <X
            color="#464646"
            className="cursor-pointer"
            onClick={() => {
              setSearchBarValue("");
              filterClientes("");
            }}
          />
        ) : (
          <Search color="#464646" className="cursor-pointer" />
        )}
      </div>
      <button
        type="button"
        data-modal-target="crud-modal"
        data-modal-toggle="crud-modal"
        className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-md px-5 py-2.5 ml-6 shadow-md shadow-green-900"
        onClick={() => {
          openModal();
        }}
      >
        Novo Cliente
      </button>
    </div>
  );
}
