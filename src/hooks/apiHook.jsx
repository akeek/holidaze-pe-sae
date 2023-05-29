import { useEffect, useState } from "react";

const ApiHook = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const token = localStorage.getItem("accessToken");


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
  }, [url, token]);
  return { data, isLoading, isError };
}

export default ApiHook;
