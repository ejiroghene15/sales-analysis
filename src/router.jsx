import {createBrowserRouter} from 'react-router-dom';
import Header from "./components/Header.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Signin from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import RootRedirect from "./routes/RootRedirect.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootRedirect/>
    },
    {
        path: '/signin',
        element: <Signin/>
    },
    {
        path: '/signup',
        element: <SignUp/>
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Header/>
                <Dashboard/>
            </ProtectedRoute>
        )
    }
]);