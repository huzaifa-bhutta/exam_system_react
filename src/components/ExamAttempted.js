import React from 'react'
import { useHistory } from 'react-router-dom'

const ExamAttempted = ({message}) => {
  const history = useHistory()
  return (
    <div className='card m-3 p-3'>
      <h1>{message}</h1>
      <div className='card-body'>
      <button className='btn btn-secondary mr-3' onClick={()=> history.goBack()}>Back</button>
      </div>
    </div>
  )
}

export default ExamAttempted