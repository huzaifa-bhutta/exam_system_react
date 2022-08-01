import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ApprovedQuestionaire from '../pages/ApprovedQuestionaire'
import PendingQuestionaires from '../pages/PendingQuestionaires'
import QuestionairePage from '../pages/QuestionairePage'

const QuestionaireRouter = () => {
  const {url} = useRouteMatch()
  return (
    <Switch>
      <Route path={`${url}/approved`} exact component={ApprovedQuestionaire}/>
      <Route path={`${url}/pending`} exact component={PendingQuestionaires}/>
      <Route path={`${url}/:id`} exact component={QuestionairePage} />
    </Switch>
  )
}

export default QuestionaireRouter