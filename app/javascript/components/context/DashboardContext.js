import React, { useReducer, useEffect } from 'react';

let reducer = (state, action) => {
  switch (action.type) {
    case "loadingTrue":
      return { ...state, loading: true };
    case "loadingFalse":
      return { ...state, loading: false };
    case "showResults":
      return { ...state, showResults: true };
    case "hideResults":
      return { ...state, showResults: false };
    case 'setUserOrganization':
      return { ...state, userOrganization: action.payload}
    case 'usersCount':
      return { ...state, usersCount: action.payload }
    case 'usersRemote':
      return { ...state, remoteYes: action.payload }
    case 'usersRemoteNo':
      return { ...state, remoteNo: action.payload }
    case 'usersRates':
      return { ...state, rates: action.payload }
    case 'getUsersID':
      return { ...state, usersId: [...state.usersId, action.payload] }
    default:
      return;
  }
};

const initialState = {
  loading: true,
  showResults: false,
  userOrganization: '',
  usersCount: 0,
  remoteYes: 0,
  remoteNo: 0,
  rates: [],
  usersId: []
}

const DashboardContext = React.createContext(initialState);

function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  
  useEffect(() => {
    if (props.organization) {
      dispatch({ type: 'setUserOrganization', payload: props.organization })
    }
  }, [props.organization])
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, StateProvider };