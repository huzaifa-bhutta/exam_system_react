import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { Radio, RadioGroup } from "react-radio-group";
import { useParams } from "react-router-dom";
import { fetch_options, URI } from "../constants";
import { GlobalContext } from "../context/GlobalContext";
const TakeExamPage = () => {
  const { id } = useParams();
  const { setMessage } = useContext(GlobalContext);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    optionValue: "",
    textAnswer: "",
    given_answer: function () {
      return !this.optionValue ? this.textAnswer : this.optionValue;
    },
  });
  const [givenAnswer, setGivenAnswer] = useState(
    !answers.optionValue ? answers.textAnswer : answers.optionValue
  );
  const [bodyData, setBodyData] = useState({
    question_id: null,
    given_answer: "",
    obtained_score: 0,
    user_id: null,
    questionaire_id: null,
  });
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);
  console.log(questions)
  useEffect(() => {
    fetch(`${URI}/questionaires/${id}/start_exam`, fetch_options())
      .then((response) => response.json())
      .then((result) => {
        setQuestions(result.questions);
        setUser(result.user);
        setLoading(true);
      });
  }, []);
  useEffect(() => {
    setGivenAnswer(
      !answers.optionValue ? answers.textAnswer : answers.optionValue
    );
    loading &&
      setBodyData({
        question_id: questions[index]?.id,
        given_answer: givenAnswer,
        obtained_score:
          questions[index]?.answer.ans.toLowerCase() ===
          givenAnswer.toLocaleLowerCase()
            ? questions[index]?.score
            : 0,
        user_id: user.id,
        questionaire_id: questions[index]?.questionaire_id,
      });
    return () => {};
  }, [answers, loading, index, givenAnswer]);

  const questionSubmitHandler = () => {
    fetch(`${URI}/questions/${questions[index].id}/submit_question`, {
      ...fetch_options("POST"),
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message);
          setIndex(index + 1);
        }
      });
  };
  return (
    <div className="card m-3">
      <h2 className="p-3">{questions[index]?.questionaire?.name}</h2>
      <div className='m-3 d-flex flex-column'>
        {questions[index] && (
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
        )}
        {index === questions.length - 1 || questions.length === 0 ? (
          <button
            className='btn btn-info btn-lg mt-3 align-self-end'
            onClick={questionSubmitHandler}>
            Finish Exam
          </button>
        ) : (
          <button
            className='btn btn-primary mt-3 align-self-end'
            onClick={questionSubmitHandler}>
            Submit Question
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeExamPage;
