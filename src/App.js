import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import FlashMessage from 'react-flash-message'
import QuestionaireRouter from "./routes/QuestionaireRouter";
import Header from "./components/Header";
import { GlobalContext } from "./context/GlobalContext";
import Home from "./pages/Home";
import SubjectExamsPage from "./pages/SubjectExamsPage";

const App = () => {
  const {message, setMessage} = useContext(GlobalContext)
  useEffect(() => {
    setTimeout(()=>{
      setMessage(null)
    }, 3000)
  }, [message])
  return (
    <Router>
      <Header />
     {message &&  <FlashMessage duration={3000} >
      <div className="alert alert-primary m-2 text-align-center ">
      <p className="m-0 p-0">{message}</p>
      </div>
          
      </FlashMessage>}
      <Switch>

        <Route path={"/"} exact  component={Home} />
        <Route path="/questionaires" component={QuestionaireRouter} />
        <Route path={"/subjects/:subject_id"} exact component={SubjectExamsPage}/>

      </Switch>
    </Router>
  );
};

export default App;
