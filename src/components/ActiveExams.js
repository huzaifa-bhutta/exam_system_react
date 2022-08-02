import React from 'react'
import StartExam from './StartExam'

const ActiveExams = ({activeExams}) => {
  return (
    <React.Fragment>
      <h2 className='m-3 text-center'>Active Exams</h2>
      {activeExams.map(exam => {
        return <StartExam key={exam.id} exam={exam} />
      })}
     
    </React.Fragment>
  )
}

export default ActiveExams