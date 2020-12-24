import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext'
import { gql, useQuery } from '@apollo/client';
import DisplayStudents from './DisplayStudents'

  const GET_STUDENTS = gql`
    query Students($name: String!, $cursor: String){
      studentList(organization: $name, first: 10, after: $cursor) {
        pageInfo {
		      endCursor
		      hasNextPage
        }
        edges {
		    	node {
            id
            name
            torreUsername
          }
        cursor
        }
      }
    }
  `


export default function StudentsList() {
  const { state } = useContext(DashboardContext)
  
  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: { "name": state.userOrganization }
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data)
  let show = data.studentList.edges.length > 0 ? true : false

  return (
    <div className="row">
      <DisplayStudents
        maxH={"200px"}
        show={show}
        entries={data.studentList || []}
        hasNextPage={data.studentList.pageInfo.hasNextPage}
      />
    </div>
  )

}