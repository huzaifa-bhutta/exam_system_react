import { fetch_options, URI } from "./utils";

export const rejectExam = (id, response) => {
  return fetch(`${URI}/questionaires/${id}/reject`, fetch_options("PATCH"))
    .then((res) => res.json())
    .then(response);
};

export const approveExam = (id, response) => {
  return fetch(`${URI}/questionaires/${id}/approve`, fetch_options("PATCH"))
    .then((res) => res.json())
    .then(response);
};

export const submitExam = async (examId, user) => {
  return await fetch(`${URI}/attempted_questionaires/${examId}/submit_exam`, {
    ...fetch_options("POST"),
    body: JSON.stringify({
      user_id: user.id,
    }),
  }).then((response) => response.json());
};

export const startExam = async (examId) => {
  return await fetch(
    `${URI}/questionaires/${examId}/start_exam`,
    fetch_options()
  ).then((response) => response.json());
};
