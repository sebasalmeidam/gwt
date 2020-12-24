import React, { useContext} from 'react';
import { DashboardContext } from '../context/DashboardContext'
import { gql, useQuery } from '@apollo/client';
import {
  Treemap, ResponsiveContainer, Tooltip
} from 'recharts';

const GET_COMPANIES = gql`
    query Companies($name: String!){
      companyList(organization: $name),
    }
  `;

export default function CompaniesWorked() {
  const { state } = useContext(DashboardContext)
  const { loading, error, data } = useQuery(GET_COMPANIES, {
    variables: { "name": state.userOrganization }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  let values = data.companyList.reduce((count, word) => {
    count[word] = (count[word] || 0) + 1;
    return count
  }, {})

  let val = []
  if (values) {
    Object.entries(values).map(item => {
      const i = {name: item[0], size: item[1]}
      val.push(i)
    })
  }
  console.log(val)
  return(
    <div style={{ width: '100%', height: 130 }}>
      <ResponsiveContainer width="100%" height="85%" >
        <Treemap data={val} ratio={val.lenght / 2} fill="#cddc39" dataKey="size" stroke="#000" >
        </Treemap>
      </ResponsiveContainer>
    </div>
  )
}