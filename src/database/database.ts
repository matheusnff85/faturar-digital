interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

let clientes: Cliente[] = [
  {
    id: 1,
    nome: "João da Silva",
    email: "joao-silva@faturar.digital",
    cpf: "313.666.700-00",
  },
  {
    id: 2,
    nome: "Maria da Silva",
    email: "maria-silva@faturar.digital",
    cpf: "906.339.760-75",
  },
];

export function fetchClientes(): Cliente[] {
  return clientes;
}

export function addCliente(cliente: Omit<Cliente, "id">): Cliente {
  const newId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
  const novoCliente: Cliente = { id: newId, ...cliente };
  clientes.push(novoCliente);
  return novoCliente;
}

export function updateCliente(
  id: number,
  clienteData: Partial<Cliente>
): Cliente | null {
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex !== -1) {
    clientes[clienteIndex] = { ...clientes[clienteIndex], ...clienteData };
    return clientes[clienteIndex];
  } else {
    return null;
  }
}

export function deleteCliente(id: number): Cliente | null {
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

  if (clienteIndex !== -1) {
    const [deletedCliente] = clientes.splice(clienteIndex, 1);
    return deletedCliente;
  } else {
    return null;
  }
}

export function filterClientes(searchTerm: string): Cliente[] {
  return clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.cpf.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
