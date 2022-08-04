import React from "react";
import { useFetch } from "../hooks/useFetch";
import ActiveExams from "../components/ActiveExams";
import Subjects from "../components/Subjects";

const Home = () => {
  const [activeExams] = useFetch({ url: "/" });
  return (
    <React.Fragment>
      {activeExams && (
        <React.Fragment>
          <Subjects subjects={activeExams.subjects} />
          <ActiveExams activeExams={activeExams.exams} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
