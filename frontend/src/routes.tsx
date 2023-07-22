import { createBrowserRouter } from "react-router-dom";
import AuthorizationForm from "./auth/authorization/AuthorizationForm.tsx";
import RegistrationForm from "./auth/registration/RegistrationForm.tsx";
import NovelView from "./novelview/NovelView.tsx";
import NovelReader from "./reader/NovelReader.tsx";

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
    path: "/novel",
    element: <NovelView />,
  },
  {
    path: "/readnovel",
    element: <NovelReader />,
  },
]);
