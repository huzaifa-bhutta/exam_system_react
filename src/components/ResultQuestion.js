import React from 'react'

const ResultQuestion = ({question, index}) => {
  return (
    <div className="card m-3">
    <div className="card-header d-flex justify-content-between">
        <p> <strong>Question no.{index + 1}:</strong> {question.question && question.question.qs}</p>
        <p> <strong>Obtained:</strong>  {parseInt(question.obtained_score)} / {question.question && parseInt(question.question.score)}</p>
    </div>
    <div className="card-body">
        <p>Your Answer:{question.given_answer}</p>
        <p>Correct Answer: <strong>{question.question && question.question.answer.ans}</strong></p>
    </div>
</div>
  )
}

export default ResultQuestion