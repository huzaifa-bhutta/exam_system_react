import React, { useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { startExam, submitExam } from "../apis/questionaires";
import { submitQuestion } from "../apis/questions";
import ExamAttempted from "../components/ExamAttempted";
import ExamQuestion from "../components/ExamQuestion";
import { GlobalContext } from "../context/GlobalContext";

const TakeExamPage = () => {
  const { id } = useParams();
  const { setMessage } = useContext(GlobalContext);
  const [postBody, setPostBody] = useState(null);
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
    startExam(id).then((result) => {
      if (result.status === 304) {
        setAttempted({ status: true, message: result.message });
      } else if (result.status === 404) {
        setRedirect(true);
        setMessage(result.message);
      } else {
        setQuestions(result.questions);
        setUser(result.user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setPostBody({
      question_id: questions[index]?.id,
      given_answer: givenAnswer,
      obtained_score:
        questions[index]?.answer.ans.toLowerCase() ===
        givenAnswer.toLocaleLowerCase()
          ? questions[index]?.score
          : 0,
      user_id: user?.id,
      questionaire_id: questions[index]?.questionaire_id,
    });
  }, [questions, givenAnswer, index, user, answers]);

  const questionSubmitHandler = async () => {
    return submitQuestion(questions, index, postBody).then((data) => {
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
    submitExam(id, user).then((result) => {
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
              <ExamQuestion
                questions={questions}
                index={index}
                answers={answers}
                setAnswers={setAnswers}
                setGivenAnswer={setGivenAnswer}
              />
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
