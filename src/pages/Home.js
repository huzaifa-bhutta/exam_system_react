import React, { useEffect, useState } from "react";
import ActiveExams from "../components/ActiveExams";
import Subjects from "../components/Subjects";
import { fetch_options, URI } from "../constants";

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  useEffect(() => {
    fetch(`${URI}`, fetch_options())
      .then((res) => res.json())
      .then((result) => {
        setSubjects(result.subjects);
        setExams(result.exams);
      });
  }, []);
  return (
    <div>
      <Subjects subjects={subjects} />
      <ActiveExams activeExams={exams} />
    </div>
  );
};

export default Home;
