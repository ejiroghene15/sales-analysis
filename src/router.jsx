import {createBrowserRouter} from 'react-router-dom';
import Header from "./components/Header.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Signin from "./components/SignIn.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Signin/>
    },
    {
        path: '/dashboard',
        element: (
            <>
                <Header/>
                <Dashboard/>
            </>
        )
    }
]);