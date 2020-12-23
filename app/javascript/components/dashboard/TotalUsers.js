import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Loader from '../support/Loader'

export default function TotalUsers() {
  const { state, dispatch } = useContext(DashboardContext)

  if (state.loading) {
    return <Loader size={"15px"} />
  } else {
    return (
      <div className="text-center align-self-center">
        <span style={{ fontSize: '40px' }}>{state.usersCount}</span>
      </div>
    )
  }
  
  
}