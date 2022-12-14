import { Link } from "react-router-dom";

const StartExam = ({ exam }) => {
  return (
    <div className='card m-3'>
      <div className='card-header text-dark'>
        <p>{exam?.subject?.title} </p>
      </div>
      <div className='card-body'>
        <h5 className='card-title text-primary'>
          <strong>{exam.name}</strong>
        </h5>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <strong>Duration:</strong> {exam.duration} min
          </li>
          <li className='list-group-item'>
            <strong>Start Time:</strong>
            {new Date(exam.designated_time).toLocaleString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </li>
        </ul>
        <Link
          to={`/questionaires/${exam.id}/start_exam`}
          className='btn btn-primary'>
          Start Exam
        </Link>
      </div>
    </div>
  );
};

export default StartExam;
