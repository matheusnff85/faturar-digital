import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/header";
import { Table } from "./components/table";
import { ModalCliente } from "./components/modal";
import { TableButtons } from "./components/table-buttons";

export default function Home() {
  return (
    <main className="pb-24 flex flex-col gap-10">
      <Header />
      <ToastContainer
        position="top-right"
        theme="colored"
        className="float-right"
      />
      <TableButtons />
      <ModalCliente />
      <Table />
    </main>
  );
}
