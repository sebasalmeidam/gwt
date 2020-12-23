import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Panels4lg from './Panels4lg'
import TotalUsers from './TotalUsers'
import Remoters from './Remoters'

export default function Dashboard() {
  const { state, dispatch } = useContext(DashboardContext)

  const getUsersStats = () => {
    let data = { organization: { term: state.userOrganization } }
    fetch(`https://search.torre.co/people/_search/?aggregate=true&offset=0&size=0`, {
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
            dispatch({ type: 'usersRemote', payload: result.aggregators.remoter[0] })
            dispatch({ type: 'usersRemoteNo', payload: result.aggregators.remoter[1] })
          }
          dispatch({ type: 'usersRates', payload: result.aggregators.compensationrange })

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
  }, [state.userOrganization])
  
  return (
    <div className="row mt-3">
      <Panels4lg
      title={"Users in Torre"}
      stat={<TotalUsers />}
       />
      
      <Panels4lg
        title={"Remoters"}
        stat={<Remoters />}
      />

      <div className="col-12 col-md-6 col-lg-4">

      </div>
    </div>
  )
} 