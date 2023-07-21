import { createBrowserRouter } from "react-router-dom";
import AuthorizationForm from "./auth/authorization/AuthorizationForm.tsx";
import RegistrationForm from "./auth/registration/RegistrationForm.tsx";
import App from "./App.tsx";
import NovelView from "./novelview/NovelView.tsx";

export const router = createBrowserRouter([
  {
    path: "/signin",
    element: <AuthorizationForm />,
  },
  {
    path: "/signup",
    element: <RegistrationForm />,
  },
  {
    path: "/test",
    element: <App />,
  },
  {
    path: "/",
    element: <NovelView />,
  },
]);
