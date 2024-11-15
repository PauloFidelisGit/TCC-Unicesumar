import { DashboardFallback } from "@/advogado/dashboard/dashboard-fallback";
import { LOCAL_STORAGE_TOKENS } from "@/domain/enums/TOKENS";
import { handleLocalStorage } from "@/lib/handle-local-storage";
import { navRoot } from "@/routes/nav-root";
import { useLazyQuery } from "@apollo/client";
import { useCallback, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { QUERY_FIND_ADMIN } from "./auth.queries";
import AuthReducer from "./auth.reducer";

export type AuthProviderAdvogadoLocationTypes = {
  kind: "admin";
  admin_uuid: string;
};

interface Props {
  children: React.ReactNode;
}
export function AuthProvider({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const admin_uuid = useCallback(async () => {
    return (
      location.state?.admin_uuid ||
      (await handleLocalStorage.getItem(LOCAL_STORAGE_TOKENS.ADMIN_UUID))
    );
  }, []);

  const [state, dispatch] = useReducer(AuthReducer, {
    admin: null as any,
  });

  const [findAdmin] = useLazyQuery(QUERY_FIND_ADMIN);

  useEffect(() => {
    (async () => {
      if ((await admin_uuid()) && state.admin === null) {
        findAdmin({
          variables: {
            where: "uuid",
            value: await admin_uuid(),
          },
        }).then((res) => {
          if (res.data?.findAdmin)
            dispatch({
              type: "SET_ADMIN",
              payload: res.data?.findAdmin,
            });
        });
      } else if (state.admin === null) {
        navigate(navRoot.login);
      }
    })();
  }, [admin_uuid]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.admin === null ? <DashboardFallback /> : children}
    </AuthContext.Provider>
  );
}
