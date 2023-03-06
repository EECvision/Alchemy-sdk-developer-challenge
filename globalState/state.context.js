import { createContext, useReducer } from "react";
import { INITIAL_STATE, reducer } from "./state.reducer";

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <StateContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
