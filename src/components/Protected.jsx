import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {
  /**Fake implementation */
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setisAuthenticated] = useState(false);

  console.log(isAuthenticated);
  return isAuthenticated === true ? children : <Navigate to="/login" replace />;
}

export default Protected;
