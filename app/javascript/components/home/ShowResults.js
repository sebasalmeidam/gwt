import React from 'react';
import swal from 'sweetalert';

export default function ShowResults ({organizations}){
  
  const completeSignUp = (org) => {
    swal({
      title: "Complete Sign Up!",
      text: `And obtain insights from ${org} and job status from current members and alumni!`,
      icon: "success",
      closeOnClickOutside: true,
      button: {
        text: "Continue",
        className: 'btn-success'
      }
    
    }).then((value) => {
      if (value) {
        window.location.href = `/users/sign_up?organization=${org}`        
      }
    })
  }
  
  if (organizations.length == 0) {
    return (
      <div className="col-12 col-md-8 offset-md-2 mt-2" style={{minHeight: '30px'}}>
        Organization not found, please try completing the word/name or talk to <a href="https://torre.co">torre.co</a> to add the Organization
      </div>
    )
  }
  return (
    <React.Fragment>
      <div className="col-12 col-md-8 offset-md-2 grey darken-2 rounded px-0" style={{maxHeight: "200px", overflow: 'auto'}}>
        {organizations.map(organization => {
          return(
            <button key={organization.id} onClick={() => completeSignUp(organization.name)} className="text-left btn btn-block mx-0">{organization.name}</button>
          )
        })}
      </div>
      <div className="col-12 col-md-8 offset-md-2 mt-2">If the Organization you are looking for does not appear in the list, please try completing the word/name or talk to <a href="https://torre.co" target="_blank">torre.co</a> to add the Organization </div>
    </React.Fragment>
  )
}