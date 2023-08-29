import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function PrivateRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Fetch the user to check if they are authenticated
        axios.get('http://localhost:8080/getUser', { withCredentials: true })
            .then((response) => {
                if (response.data) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch((error) => {
                setIsAuthenticated(false);
            });
    }, []);

    // While we're waiting to get the user, don't render anything
    if (isAuthenticated === null) return null;

    // If the user is authenticated, render the children components
    if (isAuthenticated) return children;

    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" />;
}

export default PrivateRoute;
