import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Insights from './Insights'

export default function ValidateOrObtainData() {
  const { state, dispatch } = useContext(DashboardContext)

  const validateUserData = () => {
    let data = { organization: state.userOrganization , users: state.usersId }
    fetch(`/validate_students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content'),
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.message == "Processing") {
            dispatch({ type: 'backLoad'})
          } 
          dispatch({ type: 'insightsLoaded' })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  useEffect(() => {
    if (state.usersId.length > 0) {
      validateUserData()
    }
  }, [state.usersId])
  
  if (state.updatingInsights) {
    return (
      <div className="col-12 text-center">
        We are loading more insights, please wait
      </div>
    )
  } else if (state.backLoading) {
    return (
      <div className="col-12 text-center">
        We are updating information with user profiles, please come back in a couple of minutes.
      </div>
    )
  } 

  return (
    <div className="col-12 text-center">
      <Insights />
    </div>
  )
  
}

      