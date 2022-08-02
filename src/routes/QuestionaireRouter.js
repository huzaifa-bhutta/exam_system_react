import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ApprovedQuestionaire from '../pages/ApprovedQuestionaire'
import PendingQuestionaires from '../pages/PendingQuestionaires'
import QuestionairePage from '../pages/QuestionairePage'
import QuestionairesPage from '../pages/QuestionairesPage'
import StudentResultPage from '../pages/StudentResultPage'
import StudentsListPage from '../pages/StudentsListPage'

const QuestionaireRouter = () => {
  const {url} = useRouteMatch()
  return (
    <Switch>
      <Route path={`${url}/approved`} exact component={ApprovedQuestionaire}/>
      <Route path={`${url}/teacher`} exact component={QuestionairesPage}/>
      <Route path={`${url}/pending`} exact component={PendingQuestionaires}/>
      <Route path={`${url}/:id`} exact component={QuestionairePage} />
      <Route path={`${url}/:id/students`} exact component={StudentsListPage}/>
      <Route path={`${url}/:id/students/result/student/:student_id`} exact component={StudentResultPage}/>
    </Switch>
  )
}

export default QuestionaireRouter