import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import LoginScreen from "../pages/LoginScreen";
import ErrorPage from "../components/layout/ErrorPage";
import TodoWrapper from "../pages/ToDo";

export const Routes = ({ isLogged }) => {
    const router = createBrowserRouter([
        {
            path: '/todo-list',
            element: <LoginScreen />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/todo',
            element: isLogged ? <TodoWrapper /> : <Navigate to="/todo-list" replace={false} />, // com replace ele não volta para '/todo' ao clicar em voltar
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
};
