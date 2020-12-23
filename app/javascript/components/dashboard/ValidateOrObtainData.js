import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Loader from '../support/Loader'

export default function ValidateOrObtainData() {
  
  /* const getData = () => {
    let data = { organization: { term: state.userOrganization } }
    fetch(`/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({ type: 'loadingFalse' })
          dispatch({ type: 'usersCount', payload: result.total })
          if (result.aggregators.remoter.length > 0) {
            result.aggregators.remoter.map(res => {
              if (res.value == 'yes') {
                dispatch({ type: 'usersRemote', payload: res.total })
              } else if (res.value == 'no') {
                dispatch({ type: 'usersRemoteNo', payload: res.total })
              }
            })
          }
          if (result.aggregators.compensationrange.length > 0) {
            dispatch({ type: 'usersRates', payload: result.aggregators.compensationrange })
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }

  useEffect(() => {
    if (state.userOrganization != "") {
      getUsersStats()
    }
  }, [state.userOrganization]) */
  
  return (
    <div className="col-12 text-center">
      We are loading more insights, please wait
    </div>
  )
}

      