import { useEffect, useState } from "react";

const ApiHook = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const { accessToken } = userInfo;
  const token = accessToken;

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const json = await fetchedData.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]);
  return { data, isLoading, isError };
};

export default ApiHook;
