import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Table from "../components/Table";
import { GlobalContext } from "../context/GlobalContext";
import { approveExam } from "../apis/questionaires";

const PendingQuestionaires = () => {
  const { message, setMessage } = useContext(GlobalContext);
  const [pending] = useFetch({
    url: "/questionaires/pending",
    dependencies: [message],
  });
  const approveQuestionaire = (id) => {
    approveExam(id, (result) => setMessage(result.message));
  };

  return (
    <Table>
      {pending &&
        pending.map((questionaire, index) => {
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
              <td>
                <span className='badge badge-danger'>
                  {questionaire.approval_status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => approveQuestionaire(questionaire.id)}
                  className='btn btn-info'>
                  Approve
                </button>
              </td>
            </tr>
          );
        })}
    </Table>
  );
};

export default PendingQuestionaires;
