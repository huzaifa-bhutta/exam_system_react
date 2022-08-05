import React, { useState } from "react";
import SingleQuestion from "./SingleQuestion";

const Questions = ({ questions_filter }) => {
  const [questions, setQuestions] = useState(questions_filter);
  return (
    <div className='card m-3'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h3>Questions</h3>
        <h3>{questions.length}</h3>
      </div>
      <div className='card-body'>
        {questions.length &&
          questions.map((question, index) => {
            return (
              <SingleQuestion
                key={index}
                question={question}
                index={index}
                setQuestions={setQuestions}
                questions_filter={questions_filter}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
