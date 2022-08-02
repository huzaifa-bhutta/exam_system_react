import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StartExam from '../components/StartExam'
import { URI } from '../constants'

const SubjectExamsPage = () => {
  const {subject_id} = useParams()
  const [exams, setExams] = useState([])
  useEffect(()=>{
    fetch(`${URI}/subjects/${subject_id}`).then(res=>res.json()).then(data=> setExams(data))
  },[subject_id])
  return (
    <div>
      {exams.map((exam)=>{
        return <StartExam key={exam.id} exam={exam} />
      })}
    </div>
  )
}

export default SubjectExamsPage