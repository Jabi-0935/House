import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
const ProtectedRoute = () => {
    const {loading,isAuthenticated } = useAuth();
    if(loading){
        return <div>Loading...</div>
    }
    if(!isAuthenticated){
        <Navigate to='/auth' replace/>
    }
  return children;
}
export default ProtectedRoute
