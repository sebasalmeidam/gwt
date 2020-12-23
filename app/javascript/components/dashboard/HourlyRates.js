import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import Loader from '../support/Loader'
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';

export default function HourlyRates() { 
  const { state, dispatch } = useContext(DashboardContext)
  let data = [];
  if(state.rates.length > 0) {
    state.rates.map(rate => {
      data.push({value: `${rate.value}`, total: rate.total})
    })
  }

  if (state.loading) {
    return <Loader size={"15px"} />
  } else if (data.length == 0) {
    return (
      <div className="row mt10">
        <div className="col-12 text-center lighter-font">
          No data available
        </div>
      </div>
    )
  } else {
    return (
      <div className="row mt10">
        <div className="col-12 text-center">
          <div style={{ width: '100%', height: 130 }}>
            <ResponsiveContainer width="100%" height="100%" >
              <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 10 }}>
                <XAxis dataKey="value" stroke="#ffffff" allowDataOverflow={true} allowDataOverflow={true} tick={{marginTop: 10, fontSize: 9 }} angle={350} interval={0} />
                <YAxis label={{ fontSize: '8' }} />
                <Tooltip offset={50} contentStyle={{ backgroundColor: 'black' }} />
                <Bar dataKey="total" fill="#cddc39" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}
