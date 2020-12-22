import React, { useContext, useEffect } from 'react';
import { MainContext } from '../context/MainContext'
import Loader from '../support/Loader'
import ShowResults from './ShowResults'

export default function SelectOrganization() {
  const { state, dispatch } = useContext(MainContext)
  
  const setOrganization = (e) => {
    if (e.target.value.length >= 3) {
      dispatch({type: 'updateOrganization', payload: e.target.value})
    } else {
      dispatch({ type: 'hideResults' })  
    }
  }

  const getOrganizations = (organization) => {
    fetch(`https://torre.co/api/organizations?q=${organization}&limit=20`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({type: 'updateOrganizationsQuery', payload: result})
          dispatch({ type: 'loadingFalse' })
          dispatch({ type: 'showResults' })
        },
        (error) => {
          console.log(error)
        }
      )
  }
  
  useEffect(() => {
    if (state.organization.length >= 3) {
      dispatch({ type: 'loadingTrue' })
      dispatch({ type: 'hideResults' })  
      getOrganizations(state.organization)      
    }
  }, [state.organization])
  

  return (
    <div className="row">
      <div className="col-12 text-center mb-2">1. Select your Organization</div>
      <div className="col-12 col-md-8 offset-md-2  px-0">
        <input onChange={(e) => setOrganization(e) } type="text" className="form-control" placeholder="Type your Organization name (Min 3 chars)" autoFocus />
      </div>
      {state.loading && 
        <div className="col-12">
          <Loader size="50px" />
        </div>
      }
      {state.showResults &&
        <ShowResults 
          organizations={state.organizations} 
        />
      }
    </div>
  )
}