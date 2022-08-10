import { fetch_options, URI } from "./utils";

export const deleteQuestion = (question_id, response) => {
  fetch(`${URI}/questions/${question_id}`, fetch_options("DELETE"))
    .then((response) => response.json())
    .then(response);
};
//TODO
export const submitQuestion = async (questions, index, postBody) => {
  return await fetch(
    `${URI}/questions/${questions[index].id}/submit_question`,
    {
      ...fetch_options("POST"),
      body: JSON.stringify(postBody),
    }
  ).then((response) => response.json());
};
