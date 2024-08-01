import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WantListPage from './pages/Wantlist';
import ResistorsPage from './pages/Resistors';
import CapacitorsPage from './pages/Capacitors';
import CalculatorsOpAmpsPage from './pages/CalculatorsOpAmps';
import CalculatorsVoltagePage from './pages/CalculatorsVoltage';
import CalculatorsFiltersPage from './pages/CalculatorsFilters';
import App from './App';
import ErrorPage from './pages/Error';
import IcTL074Page from './pages/IcTL074';
import IcLm358Page from './pages/IcLm358';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<App><h1>Hello World</h1></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/wantlist",
    element: (<App><WantListPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/resistors",
    element: (<App><ResistorsPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/capacitors",
    element: (<App><CapacitorsPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/calculators/op-amps",
    element: (<App><CalculatorsOpAmpsPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/calculators/voltage",
    element: (<App><CalculatorsVoltagePage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/calculators/filters",
    element: (<App><CalculatorsFiltersPage /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/ic/tl074",
    element: (<App><IcTL074Page /></App>),
    errorElement: (<ErrorPage />),
  },
  {
    path: "/ic/lm358",
    element: (<App><IcLm358Page /></App>),
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
], {
    basename: '/electronic'
});
const queryClient = new QueryClient()

createRoot(document.querySelector('[data-react]'))
    .render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    );
