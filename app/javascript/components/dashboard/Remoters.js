import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Loader from '../support/Loader'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';

export default function Remoters() {
  const { state, dispatch } = useContext(DashboardContext)
  
  const data = [{ name: 'Yes', Total: state.remoteYes }, {name: 'No', Total: state.remoteNo}];
  
  if (state.loading) {
    return <Loader size={"15px"} />
  } else {
    return (
      <div className="row mt10">
        <div className="col-12 text-center">
          <div style={{ width: '100%', height: 130 }}>
            <ResponsiveContainer width="100%" height="100%" >
              <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 10}}>
                <XAxis dataKey="name" stroke="#ffffff" allowDataOverflow={true} label={{fontSize: '8px'}} />
                <YAxis label={{ fontSize: '8' }} />
                <Tooltip offset={50} contentStyle={{backgroundColor: 'black'}} />
                <Bar dataKey="Total" fill="#cddc39" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
  
}