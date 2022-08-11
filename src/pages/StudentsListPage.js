import React from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const StudentsListPage = () => {
  const { id } = useParams();
  const { url } = useRouteMatch();
  const [studentList] = useFetch({
    url: `/attempted_questionaires/${id}/attempted_students`,
  });

  return (
    <div className='card m-3'>
      <h6 className='card-header'>Review Students' Results</h6>
      <ol className='card-body'>
        {studentList &&
          studentList.map((student) => {
            return (
              <>
                <li key={student.id} className='ml-4'>
                  <strong> {student.user?.full_name}</strong> &bull;{" "}
                  <Link to={`${url}/result/student/${student.user?.id}`}>
                    {student.user?.email}
                  </Link>
                </li>
                <hr />
              </>
            );
          })}
      </ol>
    </div>
  );
};

export default StudentsListPage;
