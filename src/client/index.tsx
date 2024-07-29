import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,Link,RouterProvider, } from "react-router-dom";
import { QueryClient,QueryClientProvider, } from '@tanstack/react-query'
import WantListPage from './pages/Wantlist';
import ResistorsPage from './pages/Resistors';
import CapacitorsPage from './pages/Capacitors';
import CalculatorsPage from './pages/Calculators';
import App from './App';
import ErrorPage from './pages/Error';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Link to={"/electronic"}>to site</Link>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/electronic",
    element: (<App><h1>Hello World</h1></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/electronic/wantlist",
    element: (<App><WantListPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/electronic/resistors",
    element: (<App><ResistorsPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/electronic/capacitors",
    element: (<App><CapacitorsPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/electronic/calculators",
    element: (<App><CalculatorsPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "*",
    element: (<App>
        <pre>
        {JSON.stringify(window.location)}
        </pre>
    </App>),
    errorElement: (<ErrorPage />),
  },
]);
const queryClient = new QueryClient()

createRoot(document.querySelector('[data-react]'))
    .render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
