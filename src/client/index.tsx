import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter,RouterProvider, } from "react-router-dom";
import { QueryClient,QueryClientProvider, } from '@tanstack/react-query'
import WantListPage from './pages/Wantlist';
import ResistorsPage from './pages/Resistors';
import CapacitorsPage from './pages/Capacitors';
import CalculatorsPage from './pages/Calculators';
import App from './App';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<App><h1>Hello World</h1></App>),
  },
  {
    path: "wantlist",
    element: (<App><WantListPage /></App>),
  },
  {
    path: "resistors",
    element: (<App><ResistorsPage /></App>),
  },
  {
    path: "capacitors",
    element: (<App><CapacitorsPage /></App>),
  },
  {
    path: "calculators",
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