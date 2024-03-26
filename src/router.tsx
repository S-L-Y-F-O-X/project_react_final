import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {MovieDetailsPage, MoviesPage} from "./pages";



const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {
                index: true, element: <Navigate to={'movie'}/>
            },
            {
                path: 'movie', element: <MoviesPage/>
            },
            {
                path: '/genres/:genreId', element: <MoviesPage/>
            },
            {
                path: 'movie/:movieId', element: <MovieDetailsPage/>
            },
            {
                path: 'search', element: <MoviesPage/>
            }
        ]
    }
]);

export {
    router
}