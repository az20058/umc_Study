import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Movies from './components/Movies';
import RootLayout from './layout/RootLayout';
import { RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Search from './components/Search';
import MovieCategory from './components/MovieCategory';

const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout/>,
      errorElement: <NotFound/>,
      children: [
        {
            // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
            index: true,
            element: <Movies/>
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'signUp',
          element: <SignUp/>
        },
        {
          path: 'search',
          element: <Search/>
        },
        {
          path: 'movies',
          element: <MovieCategory/>
        },
        {
          path: 'movie/:type',
          element: <Movies/>
        }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router}/>
  
}