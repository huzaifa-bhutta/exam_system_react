import React, { useState } from "react";
import { fetch_options, URI } from "../constants";

const Questions = ({ questions_filter }) => {
  const [questions, setQuestions] = useState(questions_filter)
  const onDeleteHandler = (question_id) => {
    fetch(`${URI}/questions/${question_id}`, fetch_options("DELETE")).then((response) => response.json()).then(result => {
      result.status === 200 && setQuestions(()=> questions_filter.filter(elem => elem.id !== question_id ))
    });
  };
  return (
    <div className='card m-3'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h3>Questions</h3>
        <h3>{questions.length}</h3>
      </div>
      <div className='card-body'>
        {questions.length !== 0 &&
          questions.map((question, index) => {
            return (
              <div className='card mb-5' key={question.id}>
                <div className='card-header d-flex justify-content-between align-items-center'>
                  <p>
                    <strong>Question no. {index + 1}</strong>: {question.qs}
                  </p>
                  <div>
                    <button onClick={() => onDeleteHandler(question.id)}>Delete</button>
                  </div>
                </div>
                <div className='card-body'>
                  <ol>
                    <li>{question.options[0].option}</li>
                    <li>{question.options[0].option2}</li>
                    <li>{question.options[0].option3}</li>
                    <li>{question.options[0].option4}</li>
                  </ol>
                  <p>
                    <strong>Correct Answer: </strong>
                    {question.answer.ans}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
