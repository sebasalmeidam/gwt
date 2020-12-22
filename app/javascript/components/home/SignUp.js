import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext'

export default function ValidateAccess() {
  const { state } = useContext(MainContext)
  
  return (
    <div className="text-center">
      <button className="btn btn-yellow">hello from React</button>
    </div>
  )
}