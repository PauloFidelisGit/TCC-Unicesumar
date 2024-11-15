import { DashboardFallback } from "@/advogado/dashboard/dashboard-fallback";
import { LOCAL_STORAGE_TOKENS } from "@/domain/enums/TOKENS";
import { handleLocalStorage } from "@/lib/handle-local-storage";
import { navRoot } from "@/routes/nav-root";
import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { QUERY_FIND_ADVOGADO } from "./auth.queries";
import AuthReducer from "./auth.reducer";

export type AuthProviderAdvogadoLocationTypes = {
  kind: "advogado";
  advogado_uuid: string;
};

interface Props {
  children: React.ReactNode;
}
export function AuthProvider({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const advogado_uuid = useCallback(async () => {
    return (
      location.state?.advogado_uuid ||
      (await handleLocalStorage.getItem(LOCAL_STORAGE_TOKENS.ADVOGADO_UUID))
    );
  }, []);

  const [state, dispatch] = useReducer(AuthReducer, {
    advogado: null as any,
  });

  const [findAdvogado] = useLazyQuery(QUERY_FIND_ADVOGADO);

  useEffect(() => {
    (async () => {
      if ((await advogado_uuid()) && state.advogado === null) {
        findAdvogado({
          variables: {
            where: "uuid",
            value: await advogado_uuid(),
          },
        }).then((res) => {
          if (res.data?.findAdvogado)
            dispatch({
              type: "SET_ADVOGADO",
              payload: res.data?.findAdvogado,
            });
        });
      } else if (state.advogado === null) {
        navigate(navRoot.login);
      }
    })();
  }, [advogado_uuid]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.advogado === null ? <DashboardFallback /> : children}
    </AuthContext.Provider>
  );
}
