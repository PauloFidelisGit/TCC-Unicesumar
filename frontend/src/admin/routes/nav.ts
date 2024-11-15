export const nav = {
  dashboard: {
    admin: {
      index: "/dashboard/admin",

      // Advogado
      registerAdvogado: "/dashboard/admin/register-advogado",
      advogados: "/dashboard/admin/advogados",
      searchAdvogado: "/dashboard/admin/search-advogado",
      toSelectAdvogado: ({ page_ref }: { page_ref: string }) => {
        const searchParams = new URLSearchParams();
        searchParams.set("page_ref", page_ref);
        return `/dashboard/admin/search-advogado?${searchParams.toString()}`;
      },
      toAdvogado: ({ advogado_uuid }: { advogado_uuid: string }) =>
        `/dashboard/admin/advogado/${advogado_uuid}`,
      advogado: {
        index: "/dashboard/admin/advogado/:advogado_uuid",
        enderecos: "/dashboard/admin/advogado/:advogado_uuid/enderecos",
        toEnderecos: ({ advogado_uuid }: { advogado_uuid: string }) =>
          `/dashboard/admin/advogado/${advogado_uuid}/enderecos`,
        permissoes: "/dashboard/admin/advogado/:advogado_uuid/permissoes",
        toPermissoes: ({ advogado_uuid }: { advogado_uuid: string }) =>
          `/dashboard/admin/advogado/${advogado_uuid}/permissoes`,
      },
    },
  },
} as const;

export const navAdmin = nav;
