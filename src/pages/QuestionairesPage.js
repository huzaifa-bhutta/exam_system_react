import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Table from "../components/Table";

const QuestionairesPage = () => {
  const [questionaires] = useFetch({ url: "/questionaires" });
  return (
    <Table last='Students Attempted'>
      {questionaires &&
        questionaires.map((questionaire, index) => {
          return (
            <tr key={questionaire.id}>
              <th scope='row'>{index + 1}</th>
              <td>
                <Link to={`/questionaires/${questionaire.id}`}>
                  {questionaire.name}
                </Link>
              </td>
              <td>{questionaire.duration}</td>
              <td>{new Date(questionaire.designated_time).toDateString()}</td>
              <td>{questionaire.subject.title}</td>
              <td>{questionaire.teacher.email}</td>
              <td>{questionaire.approval_status}</td>
              <td>
                <Link to={`/questionaires/${questionaire.id}/students`}>
                  {questionaire.attempted_questionaires.length} {" students"}
                </Link>
              </td>
            </tr>
          );
        })}
    </Table>
  );
};

export default QuestionairesPage;
