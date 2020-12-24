import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Panels4lg from './Panels4lg'
import TotalUsers from './TotalUsers'
import Remoters from './Remoters'
import HourlyRates from './HourlyRates';
import ValidateOrObtainData from './ValidateOrObtainData';
import swal from 'sweetalert';

export default function Dashboard() {
  const { state, dispatch } = useContext(DashboardContext)

  const getUsersStats = () => {
    let data = { organization: { term: state.userOrganization } }
    fetch(`https://search.torre.co/people/_search/?aggregate=true&offset=0&size=999`, {
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
          if (result.results.length > 0) {
            result.results.map(user => {
              dispatch({ type: 'getUsersID', payload: user.username })
            })
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

  const changeOrganization = () => {
    swal({
      title: "We can help you!",
      text: `Contact us, we can show your students and alumni job situation and send more insights of the labor market and your competitors`,
      icon: "success",
      closeOnClickOutside: true,
      button: {
        text: "Continue",
        className: 'btn-success'
      }

    }).then((value) => {
      if (value) {
        window.open(`https://torre.co`, '_blank')
      }
    })
  }
  
  return (
    <React.Fragment>
      <div className="row mb-5">
        <div className="col-12 text-center">
          <a onClick={changeOrganization} class="main-font">Change Organization</a>
        </div>
      </div>

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

        <ValidateOrObtainData />
      </div>
    </React.Fragment>
  )
} 