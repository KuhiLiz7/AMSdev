import { Navigate } from 'react-router-dom';

function Protected({ children }) {
  /**Fake implementation */
  const isAuthenticated = false;
  return isAuthenticated === true ? children : <Navigate to="/login" replace />;
}

export default Protected;
