import { fetch_options, URI } from "../constants";

export const deleteQuestion = (question_id, response) => {
  fetch(`${URI}/questions/${question_id}`, fetch_options("DELETE"))
    .then((response) => response.json())
    .then(response);
};
//TODO
export const submitQuestion = () => {};
