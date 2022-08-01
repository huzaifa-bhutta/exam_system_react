import React from 'react'
import Questions from './Questions'

const Questionaire = ({questionaire}) => {
  return (
    <div className="card">
    <div className="card-header">
       {questionaire.subject.title}
    </div>
    <div className="card-body">
      <h5 className="card-title">{questionaire.name}</h5>
      <p className="card-text">{questionaire.duration} min</p>
      <p className="card-text">{new Date(questionaire.designated_time).toDateString()}</p>
      <p className="card-text">Status:{questionaire.approval_status}</p>
      {/* <% if current_user.teacher? %>
        <%= link_to "Edit", edit_questionaire_path, className: "btn btn-primary" %>
        <%= link_to "Delete", "#", method: :delete, className: "btn btn-secondary" %>
      <% end %> */}
      
    </div>
    
</div>
  )
}

export default Questionaire