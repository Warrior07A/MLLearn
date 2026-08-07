import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import TypesOfMlPage from "@/pages/TypesOfMlPage";
import SupervisedPage from "@/pages/SupervisedPage";
import UnsupervisedPage from "@/pages/UnsupervisedPage";
import PlaygroundPage from "@/pages/PlaygroundPage";
import ReferencesPage from "@/pages/ReferencesPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      // { path: "/types-of-ml", element: <TypesOfMlPage /> },
      { path: "/supervised", element: <SupervisedPage /> },
      { path: "/unsupervised", element: <UnsupervisedPage /> },
      { path: "/playground", element: <PlaygroundPage /> },
      { path: "/references", element: <ReferencesPage /> },
    ],
  },
]);
