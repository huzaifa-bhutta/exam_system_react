import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch_options, URI } from "../constants";

const StudentResultPage = () => {
  const params = useParams();
  const [totalScore, setTotalScore] = useState(0)
  const [totalObtainedScore, setTotalObtainedScore] = useState(0)
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    fetch(
      `${URI}/attempted_questionaires/${params.id}/review_result?student_id=${params.student_id}`,
      fetch_options()
    )
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions)
        setTotalObtainedScore(data.total_obtained_score)
        setTotalScore(data.total_score)
      });
  }, []);
  console.log(questions);
  return <div className="card">
  <div className="card-header">
      <h3>Questions</h3>
      <p><strong>Total Marks:  {totalObtainedScore} /  {totalScore}</strong></p>
  </div>
  {questions.map((question, index)=>{
    return <div key={question.id} className="card m-3">
    <div className="card-header d-flex justify-content-between">
        <p> <strong>Question no.{index + 1}:</strong> {question.question && question.question.qs}</p>
        <p> <strong>Obtained:</strong>  {parseInt(question.obtained_score)} / {question.question && parseInt(question.question.score)}</p>
    </div>
    <div className="card-body">
        <p>Your Answer:{question.given_answer}</p>
        <p>Correct Answer: <strong>{question.question && question.question.answer.ans}</strong></p>
    </div>
</div>
  })}
</div>

};

export default StudentResultPage;
