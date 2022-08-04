import React from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const StudentsListPage = () => {
  const { id } = useParams();
  const {url} = useRouteMatch()
  const [studentList] = useFetch({url: `/attempted_questionaires/${id}/attempted_students`})

  return (
    <div className='card m-3'>
      <h6 className='card-header'>Review Students' Results</h6>
      <div className='card-body'>
        {studentList && studentList.map((student) => {
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
