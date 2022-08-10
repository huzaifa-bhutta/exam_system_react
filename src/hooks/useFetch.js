import { useEffect, useState } from "react";
import { fetch_options, URI } from "../apis/utils";

export const useFetch = ({ url, dependencies }) => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    fetch(`${URI}${url}`, fetch_options())
      .then((response) => response.json())
      .then((result) => setResult(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies || []);
  return [result];
};
