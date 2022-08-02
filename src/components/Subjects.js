import React from "react";
import { Link } from "react-router-dom";

const Subjects = ({subjects}) => {
  
  return (
    <React.Fragment>
      <h1 className='text-center'>Subjects</h1>
      <div className='card m-3'>
        <ul className='list-group list-group-flush'>
          {subjects.map(subject => {
            return <li key={subject.id} className='list-group-item'>
              <Link className="nav nav-link" to={`/subjects/${subject.id}`}>{subject.title}</Link>
          </li>
          })}
          
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Subjects;
