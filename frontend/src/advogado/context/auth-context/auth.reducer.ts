type Actions = {
  type: "SET_ADVOGADO";
  payload: {
    uuid: string;
    nome: string;
  };
};

type InitialStateType = {
  advogado: {
    uuid: string;
    nome: string;
  };
};

export type AuthReducerType = {
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
};

export default function AuthReducer(
  state: InitialStateType,
  action: Actions,
): InitialStateType {
  const { type, payload } = action;
  switch (type) {
    case "SET_ADVOGADO":
      return {
        ...state,
        advogado: payload,
      };
    default:
      return state;
  }
}
