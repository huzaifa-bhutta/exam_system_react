import React from "react";

const Questionaire = ({ questionaire }) => {
  return (
    <div className='card m-3'>
      <div className='card-header'>{questionaire?.subject?.title}</div>
      <div className='card-body'>
        <h5 className='card-title'>{questionaire.name}</h5>
        <p className='card-text'>{questionaire.duration} min</p>
        <p className='card-text'>
          {new Date(questionaire.designated_time).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
        <p className='card-text'>
          Status:
          <span
            className={`badge ${
              questionaire.approval_status === "approved"
                ? "badge-primary"
                : "badge-danger"
            } ml-1`}>
            {questionaire.approval_status.toUpperCase()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Questionaire;
