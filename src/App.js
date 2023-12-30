import React, { lazy }  from "react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import {ROUTESNAMES} from "src/utils"
import Layout from "src/views/Layout"

const TodoPage = lazy(() => import("src/views/pages/TodoPage")) 
const WeatherPage = lazy(() => import("src/views/pages/WeatherPage")) 

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: ROUTESNAMES.todo, element:<TodoPage/> },
        { path:  ROUTESNAMES.weather, element:<WeatherPage/> },
      ],
    },
  ])
  return (

      <RouterProvider router={router} />

  )
}

export default App