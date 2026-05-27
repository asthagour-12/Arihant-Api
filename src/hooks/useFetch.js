import { useState, useEffect, useCallback } from "react";

const useFetch = (apiFn, params = {}, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (overrideParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFn({ ...params, ...overrideParams });
      setData(res.data?.data ?? res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [JSON.stringify(params), autoFetch]);

  return { data, loading, error, refetch: fetchData, fetchData };
};

export default useFetch;
