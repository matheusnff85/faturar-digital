import { Header } from "./components/header";
import { Table } from "./components/table";
import { ModalCliente } from "./components/modal";
import { TableButtons } from "./components/table-buttons";

export default function Home() {
  return (
    <main className="pb-24 flex flex-col gap-10">
      <Header />
      <TableButtons />
      <ModalCliente />
      <Table />
    </main>
  );
}
