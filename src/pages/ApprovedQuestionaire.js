import React, { useContext } from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { useFetch } from "../hooks/useFetch";
import { rejectExam } from "../apis/questionaires";
const ApprovedQuestionaire = () => {
  const { message, setMessage } = useContext(GlobalContext);
  const [approved] = useFetch({
    url: "/questionaires/approved",
    dependencies: [message],
  });
  const rejectQuestionaire = (id) => {
    let check = window.confirm("DO you want to reject the questionaire?");
    check && rejectExam(id, (result) => setMessage(result.message));
  };
  return (
    <Table>
      {approved &&
        approved.map((questionaire, index) => {
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
                <span className='badge badge-primary'>
                  {questionaire.approval_status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => rejectQuestionaire(questionaire.id)}
                  className='btn btn-danger'>
                  Reject
                </button>
              </td>
            </tr>
          );
        })}
    </Table>
  );
};

export default ApprovedQuestionaire;
