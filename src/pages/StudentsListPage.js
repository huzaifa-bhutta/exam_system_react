import React, { useEffect, useState } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { URI } from "../constants";

const StudentsListPage = () => {
  const { id } = useParams();
  const {url, path} = useRouteMatch()
  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    fetch(`${URI}/attempted_questionaires/${id}/attempted_students`)
      .then((res) => res.json())
      .then((data) => setStudentList(data));
  }, []);
  
  return (
    <div className='card m-3'>
      <h6 className='card-header'>Review Students' Results</h6>
      <div className='card-body'>
        {studentList.map((student) => {
          return (
            <p key={student.id}>
              <strong> {student.user?.full_name}</strong> &bull; <Link to={`${url}/result/student/${student.user?.id}`}>{student.user?.email}</Link>
            </p>
          );
        })}

        <hr />
      </div>
    </div>
  );
};

export default StudentsListPage;
