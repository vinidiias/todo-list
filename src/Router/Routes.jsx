import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LoginScreen from "../pages/LoginScreen";
import TodoWrapper from "../pages/ToDo";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
  },
  {
      path: '/login',
      element: <LoginScreen />,
  },
  {
      path: '/todo',
      element: <TodoWrapper />,
  },
  ]);

  return <RouterProvider router={router} />;
};
