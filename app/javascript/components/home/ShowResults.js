import React from 'react';

export default function ShowResults ({organizations}){
  
  if (organizations.length == 0) {
    return (
      <div style={{minHeight: '30px'}}>
        Organization not found, please try completing the word/name or talk to <a href="https://torre.co">torre.co</a> to add the Organization
      </div>
    )
  }
  return (
    <React.Fragment>
      <div className="col-12 col-md-8 offset-md-2 grey darken-2 rounded px-0" style={{maxHeight: "200px", overflow: 'auto'}}>
        {organizations.map(organization => {
          return(
            <button key={organization.id} className="text-left btn btn-block mx-0">{organization.name}</button>
          )
        })}
      </div>
      <div className="col-12 col-md-8 offset-md-2 mt-2">If the Organization you are looking for does not appear in the list, please try completing the word/name or talk to <a href="https://torre.co" target="_blank">torre.co</a> to add the Organization </div>
    </React.Fragment>
  )
}