import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ResultQuestion from "../components/ResultQuestion";

const StudentResultPage = () => {
  const { id, student_id } = useParams();
  const [result] = useFetch({
    url: `/attempted_questionaires/${id}/review_result?student_id=${student_id}`,
  });
  return (
    <div className='card'>
      {result && (
        <React.Fragment>
          <div className='card-header'>
            <h3>Questions</h3>
            <p>
              <strong>
                Total Marks: {result.total_obtained_score} /{" "}
                {result.total_score}
              </strong>
            </p>
          </div>
          {result.questions.map((question, index) => {
            return (
              <ResultQuestion
                key={question.id}
                question={question}
                index={index}
              />
            );
          })}
        </React.Fragment>
      )}
    </div>
  );
};

export default StudentResultPage;
