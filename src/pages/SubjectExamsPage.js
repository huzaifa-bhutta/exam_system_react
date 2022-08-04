import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import StartExam from '../components/StartExam'

const SubjectExamsPage = () => {
  const {subject_id} = useParams()
  const [exams] = useFetch({url: `/subjects/${subject_id}`})

  return (
    <div>
      {exams && exams.map((exam)=>{
        return <StartExam key={exam.id} exam={exam} />
      })}
    </div>
  )
}

export default SubjectExamsPage