import React, { useContext } from "react";
import { StateProvider } from './context/MainContext'
import SignUp from './home/SignUp'

export default function HomeContainer() {

  return (
    <StateProvider>
      <SignUp />
    </StateProvider>
  );
}
