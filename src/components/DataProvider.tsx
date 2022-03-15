import produce from "immer";
import { createContext, useReducer } from "react";

const initialState: VC.InitialState = {
  data: [],
  clientID: "",
  userList:[]
};

export const DataContext = createContext(initialState);

type DispatchType = (params:{type:string;payload?:any})=>void

export const DispatchContext = createContext<DispatchType>(()=>{});

const reduce: React.ReducerStateWithoutAction<any> = (
  state: VC.InitialState,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  const result = produce(state, (state) => {
    switch (type) {
      case "setClientType":
        state.clientID = payload;
        break;
      case "setMSGData":
        state.data = [...state.data, payload];
        break;
      case "setUserList":
        state.userList = payload;
        break
      default:
        return state;
    }

    return state;
  });
  
  return result;
};


const DataProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reduce as any, initialState);

  return (
    <DispatchContext.Provider value={dispatch as any}>
      <DataContext.Provider value={state as any}>
        {children}
      </DataContext.Provider>
    </DispatchContext.Provider>
  );
};

export default DataProvider;
