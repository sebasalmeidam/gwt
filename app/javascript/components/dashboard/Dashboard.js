import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Panels4lg from './Panels4lg'
import TotalUsers from './TotalUsers'
import Remoters from './Remoters'
import HourlyRates from './HourlyRates';

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
            result.aggregators.remoter.map(res => {
              if(res.value == 'yes') {
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

      <Panels4lg
        title={"Hourly Rates"}
        stat={<HourlyRates />}
      />

      <div className="col-12 col-md-6 col-lg-4">

      </div>
    </div>
  )
} 