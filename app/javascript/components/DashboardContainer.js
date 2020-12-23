import React, { useContext } from "react";
import { StateProvider } from './context/DashboardContext'
import Dashboard from './dashboard/Dashboard'

export default function DashboardContainer({organization}) {

  return (
    <StateProvider organization={organization}>
      <Dashboard />
    </StateProvider>
  );
}
