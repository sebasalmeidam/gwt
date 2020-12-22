import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext'
import SelectOrganization from './SelectOrganization'

export default function SignUp() {
  const { state, dispatch } = useContext(MainContext)
  
  const continueSignup = () => {
    dispatch({ type: 'continueTrue'})
  }
  
  // until captcha
  const requestClick = () => {
    if (state.continue) {
      return <SelectOrganization />
    } else {
      return <button onClick={continueSignup} className="btn btn-yellow btn-rounded">Get Insights about your students and alumni</button>
    }
  }
  
  return (
    <div className="text-center">
      {requestClick()}
    </div>
  )
}