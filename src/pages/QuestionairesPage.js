import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation,  matchPath} from 'react-router-dom'
import Table from '../components/Table'
import { URI } from '../constants'

const QuestionairesPage = () => {
  const [questionaires, setQuestionaires] = useState([])
  useEffect(()=>{
    fetch(`${URI}/questionaires`).then((response)=> response.json()).then(data=> setQuestionaires(data))
  },[])
  return (
    <Table last='Students Attempted'>
      {questionaires !==null && questionaires.map((questionaire, index) => {
        return <tr key={questionaire.id}>
        <th scope="row">{index+1}</th>
        <td><Link to={`/questionaires/${questionaire.id}`}>{questionaire.name}</Link></td>
        <td>{questionaire.duration}</td>
        <td>{new Date(questionaire.designated_time).toDateString()}</td>
        <td>{questionaire.subject.title}</td>
        <td>{questionaire.teacher.email}</td>
        <td>{questionaire.approval_status}</td>
        <td>
            <Link to={`/questionaires/${questionaire.id}/students`} >{questionaire.attempted_questionaires.length}</Link>
        </td>
      </tr>
    
      })}
    </Table>
  )
}

export default QuestionairesPage