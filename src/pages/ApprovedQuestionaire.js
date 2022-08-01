import React, {useState, useEffect} from 'react'
import Table from '../components/Table'
import {Link} from 'react-router-dom'
import { fetch_options, URI } from '../constants'
const ApprovedQuestionaire = () => {
  const [approved, setApproved] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(()=>{
    fetch(`${URI}/questionaires/approved`, fetch_options()).then(response => response.json()).then(questionaire => setApproved(questionaire))
  }, [message])
  const rejectQuestionaire = (id) => {
    fetch(`${URI}/questionaires/${id}/reject`, fetch_options("PATCH")).then((res)=> res.json()).then(result => setMessage(result))
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