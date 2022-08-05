import { useEffect, useState } from "react";
import { fetch_options, URI } from "../constants";

export const useFetch = ({ url, method, dependencies }) => {
  const [result, setResult] = useState(null);
  useEffect(() => {
    fetch(`${URI}${url}`, fetch_options(method))
      .then((response) => response.json())
      .then((result) => setResult(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies || []);
  return [result];
};
