import React, { useReducer } from 'react';

let reducer = (state, action) => {
  switch (action.type) {
    case "cancelContinue":
      return { ...state, continue: false };
    case "continueTrue":
      return { ...state, continue: true };
    case "updateOrganization":
      return { ...state, organization: action.payload };
    case "updateOrganizationsQuery":
      return { ...state, organizations: action.payload };
    case "loadingTrue":
      return { ...state, loading: true };
    case "loadingFalse":
      return { ...state, loading: false };
    case "showResults":
      return { ...state, showResults: true };
    case "hideResults":
      return { ...state, showResults: false };
    default:
      return;
  }
};

const initialState = {
  continue: false,
  organization: '',
  organizations: [],
  loading: false,
  showResults: false
}

const MainContext = React.createContext(initialState);

function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MainContext.Provider>
  );
}

export { MainContext, StateProvider };