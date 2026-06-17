import { useSelector } from 'react-redux';

/**
 * Hook to read authentication state from Redux
 */
const useAuth = () => {
  const { isAuthenticated, profile, token, loading } = useSelector((state) => state.auth);
  return { isAuthenticated, profile, token, loading };
};

export default useAuth;
