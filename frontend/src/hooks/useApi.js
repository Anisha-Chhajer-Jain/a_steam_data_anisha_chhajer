import { useState, useCallback } from 'react';
import api from '../services/api';

/**
 * Generic hook for making API calls with loading/error state
 */
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method](url, data, config);
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.message || 'An error occurred';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
};

export default useApi;
