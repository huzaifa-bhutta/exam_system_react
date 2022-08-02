import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import Table from '../components/Table'
import { fetch_options, URI } from '../constants'
import { GlobalContext } from '../context/GlobalContext'

const PendingQuestionaires = () => {
  const [pending, setPending] = useState(null)
  const {message, setMessage} = useContext(GlobalContext)
  useEffect(()=>{
    fetch(`${URI}/questionaires/pending`,fetch_options()).then(response => response.json()).then(questionaire => setPending(questionaire))

    return () => {
    }
  }, [message])
  const approveQuestionaire = (id) => {
    fetch(`${URI}/questionaires/${id}/approve`, fetch_options("PATCH")).then((res)=> res.json()).then(result => setMessage(result.message))
  }
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