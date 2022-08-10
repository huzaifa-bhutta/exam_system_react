import React, { useEffect } from "react";
import { RadioGroup, Radio } from "react-radio-group";

const ExamQuestion = ({
  questions,
  index,
  setGivenAnswer,
  answers,
  setAnswers,
}) => {
  useEffect(() => {
    setGivenAnswer(
      !answers.optionValue ? answers.textAnswer : answers.optionValue
    );
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);
  return (
    <div className='card'>
      <p className='card-header'>{questions[index].qs}</p>
      {questions[index]?.options.length === 0 ? (
        <textarea
          rows={"2"}
          value={answers.textAnswer}
          onChange={(e) => setAnswers({ textAnswer: e.target.value })}
        />
      ) : (
        <ul className='list-group list-group-flush'>
          <RadioGroup
            name='options'
            selectedValue={answers.optionValue}
            onChange={(value) => setAnswers({ optionValue: value })}>
            <li className='list-group-item'>
              <Radio value={questions[index].options[0].option} />{" "}
              {questions[index].options[0].option}
            </li>
            <li className='list-group-item'>
              <Radio value={questions[index].options[0].option2} />{" "}
              {questions[index].options[0].option2}
            </li>
            <li className='list-group-item'>
              <Radio value={questions[index].options[0].option3} />{" "}
              {questions[index].options[0].option3}
            </li>
            <li className='list-group-item'>
              <Radio value={questions[index].options[0].option4} />{" "}
              {questions[index].options[0].option4}
            </li>
          </RadioGroup>
        </ul>
      )}
    </div>
  );
};

export default ExamQuestion;
