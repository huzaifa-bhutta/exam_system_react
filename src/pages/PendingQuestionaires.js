import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Table from '../components/Table'

const PendingQuestionaires = () => {
  const [pending, setPending] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(()=>{
    fetch('http://localhost:3000/questionaires/pending', {headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'

    }}).then(response => response.json()).then(questionaire => setPending(questionaire))

    return () => {
    }
  }, [message])
  const approveQuestionaire = (id) => {
    fetch(`http://localhost:3000/questionaires/${id}/approve`, {
      method: "PATCH",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }).then((res)=> res.json()).then(result => setMessage(result))
  }
  console.log(message)
  return (
    <Table>
      {pending !== null && pending.map((questionaire, index) => {
        return <tr key={questionaire.id}>
        <th scope="row">{index+1}</th>
        <td><Link to={`/questionaires/${questionaire.id}`}>{questionaire.name}</Link></td>
        <td>{questionaire.duration}</td>
        <td>{new Date(questionaire.designated_time).toDateString()}</td>
        <td>{questionaire.subject.title}</td>
        <td>{questionaire.teacher.email}</td>
        <td>{questionaire.approval_status}</td>
        <td>
          <button onClick={()=> approveQuestionaire(questionaire.id)} className='btn btn-info'>Approve</button>
        </td>
      </tr>
    
      })}
    </Table>
  )
}

export default PendingQuestionaires