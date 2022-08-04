import React, { useContext, useEffect, useState } from "react";
import { Radio, RadioGroup } from "react-radio-group";
import { useParams, Redirect } from "react-router-dom";
import ExamAttempted from "../components/ExamAttempted";
import { fetch_options, URI } from "../constants";
import { GlobalContext } from "../context/GlobalContext";
const TakeExamPage = () => {
  const { id } = useParams();
  const { setMessage } = useContext(GlobalContext);
  const [index, setIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [attempted, setAttempted] = useState({
    status: false,
    message: "",
  });
  const [answers, setAnswers] = useState({
    optionValue: "",
    textAnswer: "",
  });
  const [givenAnswer, setGivenAnswer] = useState(
    !answers.optionValue ? answers.textAnswer : answers.optionValue
  );

  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`${URI}/questionaires/${id}/start_exam`, fetch_options())
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 304) {
          setAttempted({ status: true, message: result.message });
        } else {
          setQuestions(result.questions);
          setUser(result.user);
        }
      });
  }, [id]);
  useEffect(() => {
    setGivenAnswer(
      !answers.optionValue ? answers.textAnswer : answers.optionValue
    );
    return () => {};
  }, [answers]);

  const questionSubmitHandler = async () => {
    return await fetch(
      `${URI}/questions/${questions[index].id}/submit_question`,
      {
        ...fetch_options("POST"),
        body: JSON.stringify({
          question_id: questions[index]?.id,
          given_answer: givenAnswer,
          obtained_score:
            questions[index]?.answer.ans.toLowerCase() ===
            givenAnswer.toLocaleLowerCase()
              ? questions[index]?.score
              : 0,
          user_id: user.id,
          questionaire_id: questions[index]?.questionaire_id,
        }),
      }
    )
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
  const examSubmitHandler = async () => {
    await questionSubmitHandler();
    await fetch(`${URI}/attempted_questionaires/${id}/submit_exam`, {
      ...fetch_options("POST"),
      body: JSON.stringify({
        user_id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage(result.message);
        setRedirect(true);
      });
  };
  return (
    <React.Fragment>
      {attempted.status ? (
        <ExamAttempted message={attempted.message} />
      ) : (
        <div className='card m-3'>
          <h2 className='p-3'>{questions[index]?.questionaire?.name}</h2>
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
                onClick={examSubmitHandler}>
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
          {redirect && <Redirect to={"/"} />}
        </div>
      )}
    </React.Fragment>
  );
};

export default TakeExamPage;
