import React from "react";
import ApprovedQuestionaire from "./pages/ApprovedQuestionaire";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PendingQuestionaires from "./pages/PendingQuestionaires";
import QuestionairePage from "./pages/QuestionairePage";
import QuestionaireRouter from "./routes/QuestionaireRouter";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact  component={ApprovedQuestionaire} />
        <Route path="/questionaires" component={QuestionaireRouter} />
      </Switch>
    </Router>
  );
};

export default App;
