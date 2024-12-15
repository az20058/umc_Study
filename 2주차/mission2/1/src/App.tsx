import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Movies from "./components/Movies";
import RootLayout from "./layout/RootLayout";
import { RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Search from "./components/Search";
import MovieCategory from "./components/MovieCategory";
import MovieDetails from "./components/MovieDetails";
import CollectionsPage from "./pages/CollectionsPage";
import RatingPage from "./pages/RatingPage";
import RecommendationsPage from "./pages/RecommendationsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <Movies />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "movies",
        element: <MovieCategory />,
      },
      {
        path: "movie/:type",
        element: <Movies />,
      },
      {
        path: "movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "collections",
        element: <CollectionsPage />,
      },
      {
        path: "ratings",
        element: <RatingPage />,
      },
      {
        path: "recommendations",
        element: <RecommendationsPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
