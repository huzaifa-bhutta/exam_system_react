import React from "react";
import { deleteQuestion } from "../apis/questions";

const SingleQuestion = ({
  question,
  index,
  setQuestions,
  questions_filter,
}) => {
  const onDeleteHandler = (question_id) => {
    deleteQuestion(question_id, (result) => {
      result.status === 200 &&
        setQuestions(() =>
          questions_filter.filter((elem) => elem.id !== question_id)
        );
    });
  };
  return (
    <div className='card mb-5' key={question.id}>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <p>
          <strong>Question no. {index + 1}</strong>: {question.qs}
        </p>
        <div>
          <button
            className='btn btn-danger'
            onClick={() => onDeleteHandler(question.id)}>
            Delete
          </button>
        </div>
      </div>
      <div className='card-body'>
        {question.options.length !== 0 && (
          <ol>
            <li>{question.options[0].option}</li>
            <li>{question.options[0].option2}</li>
            <li>{question.options[0].option3}</li>
            <li>{question.options[0].option4}</li>
          </ol>
        )}
        <p>
          <strong>Correct Answer: </strong>
          {question.answer.ans}
        </p>
      </div>
    </div>
  );
};

export default SingleQuestion;
