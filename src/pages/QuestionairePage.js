import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Questionaire from "../components/Questionaire";
import Questions from "../components/Questions";

const QuestionairePage = () => {
  const { id } = useParams();
  const [questionaire] = useFetch({url:`/questionaires/${id}`, method:"GET", dependencies: [id]})
  return (
    <React.Fragment>
      {questionaire !== null && (
        <React.Fragment>
          <Questionaire questionaire={questionaire.questionaire} />
          <Questions questions_filter={questionaire.questions} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default QuestionairePage;
