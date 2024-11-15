type Actions = {
  type: "SET_ADMIN";
  payload: {
    uuid: string;
    nome: string;
  };
};

type InitialStateType = {
  admin: {
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
    case "SET_ADMIN":
      return {
        ...state,
        admin: payload,
      };
    default:
      return state;
  }
}
