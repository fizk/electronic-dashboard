import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,Link,RouterProvider, } from "react-router-dom";
import { QueryClient,QueryClientProvider, } from '@tanstack/react-query'
import WantListPage from './pages/Wantlist';
import ResistorsPage from './pages/Resistors';
import CapacitorsPage from './pages/Capacitors';
import CalculatorsPage from './pages/Calculators';
import App from './App';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Link to={"/electronic"}>to site</Link>),
  },
  {
    path: "/electronic",
    element: (<App><h1>Hello World</h1></App>),
  },
  {
    path: "electronic/wantlist",
    element: (<App><WantListPage /></App>),
  },
  {
    path: "electronic/resistors",
    element: (<App><ResistorsPage /></App>),
  },
  {
    path: "electronic/capacitors",
    element: (<App><CapacitorsPage /></App>),
  },
  {
    path: "electronic/calculators",
    element: (<App><CalculatorsPage /></App>),
  },
]);
const queryClient = new QueryClient()

createRoot(document.querySelector('[data-react]'))
    .render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );