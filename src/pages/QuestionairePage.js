import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Questionaire from "../components/Questionaire";
import Questions from "../components/Questions";

const QuestionairePage = () => {
  const { id } = useParams();
  const [questionare, setQuestionaire] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:3000/questionaires/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    })
      .then((response) => response.json())
      .then((questionaire) => setQuestionaire(questionaire));
  }, [id]);
  return (
    <React.Fragment>
      {questionare !== null && (
        <React.Fragment>
          <Questionaire questionaire={questionare.questionaire} />
          <Questions questions_filter={questionare.questions} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default QuestionairePage;
