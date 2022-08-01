import React, {useState, useEffect} from 'react'
import Table from '../components/Table'
import {Link} from 'react-router-dom'
const ApprovedQuestionaire = () => {
  const [approved, setApproved] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(()=>{
    fetch('http://localhost:3000/questionaires/approved', {headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'

    }}).then(response => response.json()).then(questionaire => setApproved(questionaire))
  }, [message])
  const rejectQuestionaire = (id) => {
    fetch(`http://localhost:3000/questionaires/${id}/reject`, {
      method: "PATCH",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }).then((res)=> res.json()).then(result => setMessage(result))
  }
  return (
    <Table>
      {approved !==null && approved.map((questionaire, index) => {
        return <tr key={questionaire.id}>
        <th scope="row">{index+1}</th>
        <td><Link to={`/questionaires/${questionaire.id}`}>{questionaire.name}</Link></td>
        <td>{questionaire.duration}</td>
        <td>{new Date(questionaire.designated_time).toDateString()}</td>
        <td>{questionaire.subject.title}</td>
        <td>{questionaire.teacher.email}</td>
        <td>{questionaire.approval_status}</td>
        <td>
          <button onClick={()=> rejectQuestionaire(questionaire.id)} className='btn btn-danger'>Reject</button>
        </td>
      </tr>
    
      })}
    </Table>
  )
}

export default ApprovedQuestionaire