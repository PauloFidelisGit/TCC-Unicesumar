import { RouteObject } from "react-router-dom";
import {
  EnderecosPessoaTab,
  PessoaPage,
  PessoasPage,
  RegisterPessoaPage,
  SearchPessoaPage,
  SelectIndexPessoaPage,
} from "./lazy-imports";

export const _navPessoa = {
  registerPessoa: "/dashboard/advogado/register-pessoa",
  pessoas: "/dashboard/advogado/pessoas",
  searchPessoa: "/dashboard/advogado/search-pessoa",
  pessoa: {
    index: "/dashboard/advogado/pessoa/:pessoa_uuid",
    enderecos: "/dashboard/advogado/pessoa/:pessoa_uuid/enderecos",
    toEnderecos: ({ pessoa_uuid }: { pessoa_uuid: string }) =>
      `/dashboard/advogado/pessoa/${pessoa_uuid}/enderecos`,
  },
  toPessoa: ({ pessoa_uuid }: { pessoa_uuid: string }) =>
    `/dashboard/advogado/pessoa/${pessoa_uuid}`,
} as const;

export const routesPessoa: RouteObject[] = [
  {
    path: _navPessoa.searchPessoa,
    element: <SearchPessoaPage />,
  },
  {
    path: _navPessoa.pessoas,
    element: <PessoasPage />,
  },
  {
    path: _navPessoa.registerPessoa,
    element: <RegisterPessoaPage />,
  },
  {
    path: _navPessoa.pessoa.index,
    element: <PessoaPage />,
    children: [
      {
        index: true,
        element: <SelectIndexPessoaPage />,
      },
      {
        path: _navPessoa.pessoa.enderecos,
        element: <EnderecosPessoaTab />,
      },
    ],
  },
];
