import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const { currentUser, token } = useSelector((state) => state.auth);

    // If no user or token, redirect to sign in
    if (!currentUser || !token) {
        return <Navigate to="/signin" replace />;
    }

    // If authenticated, render the children
    return children;
}
