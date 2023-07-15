import { useState, useEffect } from "react";
import LocalStorage from "../utils/localStorage";
import { config } from "../config";

function usePaginate(relativeUrl, query) {
  const token = LocalStorage.getUserToken();
  const requestUrl = `${config.baseUrl}${relativeUrl}`;

  let headers = {};
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  const [data, setData] = useState({
    data: [],
    page: 0,
    nextPage: 0,
    prevPage: 0,
    limit: 0,
    total: 0,
  });

  useEffect(() => {
    fetch(`${requestUrl}?${query.toString()}`, headers)
      .then((res) => res.json())
      .then(({ data, limit, total, page }) => {
        setData({
          data,
          limit,
          total,
          page,
          nextPage: page + 1,
          prevPage: page - 1,
        });
      })
      .catch(error => {
          console.error(error)
      });
  }, [query.toString()]);

  return data;
}

export default usePaginate;
