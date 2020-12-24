import React, { useContext} from 'react';
import { DashboardContext } from '../context/DashboardContext'
import { gql, useQuery } from '@apollo/client';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts';

const GET_STUDENTS = gql`
    query Working($name: String!){
      isWorking(organization: $name),
      notWorking(organization: $name),
    }
  `;

export default function IsWorking() {
  const { state } = useContext(DashboardContext)
  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: { "name": state.userOrganization }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const values = [{ name: 'Yes', Total: data.isWorking }, { name: 'No', Total: data.notWorking }];
  return(
    <div style={{ width: '100%', height: 130 }}>
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart data={values} margin={{ top: 20, right: 10, left: -20, bottom: 10 }}>
          <XAxis dataKey="name" stroke="#ffffff" allowDataOverflow={true} label={{ fontSize: '8px' }} />
          <YAxis label={{ fontSize: '8' }} />
          <Tooltip offset={50} contentStyle={{ backgroundColor: 'black' }} />
          <Bar dataKey="Total" fill="#cddc39" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}