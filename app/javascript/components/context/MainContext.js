import React, { useReducer } from 'react';

let reducer = (state, action) => {
  switch (action.type) {
    case "cancelContinue":
      return { ...state, continue: false };
    case "continueTrue":
      return { ...state, continue: true };
    default:
      return;
  }
};

const initialState = {
  continue: false,
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