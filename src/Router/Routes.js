import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import LoginScreen from "../pages/LoginScreen";
import ToDo from "../pages/ToDo";
import ErrorPage from "../components/layout/ErrorPage";

export const Routes = ({ isLogged }) => {
    const router = createBrowserRouter([
        {
            path: '/todo-list',
            element: <LoginScreen />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/todo',
            element: isLogged ? <ToDo /> : <Navigate to="/todo-list" replace />,
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
};
