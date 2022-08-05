import { fetch_options, URI } from "../constants";

export const rejectExam = (id, response) => {
  fetch(`${URI}/questionaires/${id}/reject`, fetch_options("PATCH"))
    .then((res) => res.json())
    .then(response);
};

export const approveExam = (id, response) => {
  fetch(`${URI}/questionaires/${id}/approve`, fetch_options("PATCH"))
    .then((res) => res.json())
    .then(response);
};

export const submitExam = () => {};
