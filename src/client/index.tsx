import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WantListPage from './pages/Wantlist';
import ResistorsPage from './pages/Resistors';
import TransistorPage from './pages/Transistor';
import CapacitorsPage from './pages/Capacitors';
import CalculatorsOpAmpsPage from './pages/CalculatorsOpAmps';
import CalculatorsVoltagePage from './pages/CalculatorsVoltage';
import CalculatorsFiltersPage from './pages/CalculatorsFilters';
import CalculatorCalculatorPage from './pages/CapacitorCalculator';
import ResistorCalculatorPage from './pages/ResistorCalculator';
import UnitConverterPage from './pages/UnitConverter';
import IcPage from './pages/Ic';
import App from './App';
import ErrorPage from './pages/Error';
import { ConfigContextWrapper } from './contexts/ConfigContext'
import { ResistorValuesContextWrapper } from './contexts/ResistorValuesContext';
import ArticleTemplate from './pages/ArticleTemplate';
import './fonts/latinmodern-math.otf';
import './icons/apple-touch-icon.png';
import './icons/32x32.png';
import './icons/16x16.png';
import './icons/safari-pinned-tab.svg';
import './icons/192.png';
import './icons/512.png';
import './fonts/futura/Futura-Light-Italic.woff';
import './fonts/futura/Futura-Bold-Italic.woff';
import './fonts/futura/Futura-Bold.woff';
import './fonts/futura/Futura-Book-Italic.woff';
import './fonts/futura/Futura-Book.woff';
import './fonts/futura/Futura-Light.woff';
import './fonts/futura/Futura-Medium-Italic.woff';
import './fonts/futura/Futura-Medium.woff';

import Eseries from './pages/Eseries';
import StyleGuidePage from './pages/StyleGuide';
import Scratchpad from './pages/Scratchpad';

const router = createBrowserRouter([
    {
        path: "/",
        element: (<App />),
        errorElement: (<ErrorPage />),
        children: [
            {
                path: "/scratchpad",
                element: (
                    <Scratchpad />
                ),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/styleguide",
                element: (
                    <StyleGuidePage />
                ),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/wantlist",
                element: (
                    <ArticleTemplate header={<h1>Wantlist</h1>}>
                        <WantListPage />
                    </ArticleTemplate>
                ),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/inventory/resistors",
                element: (<ResistorsPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/inventory/capacitors",
                element: (<CapacitorsPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/transistor",
                element: (<TransistorPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/calculators/op-amps",
                element: (<CalculatorsOpAmpsPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/calculators/units",
                element: (<UnitConverterPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/calculators/voltage",
                element: (<CalculatorsVoltagePage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/calculators/filters",
                element: (<CalculatorsFiltersPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/calculators/capacitor",
                element: (<CalculatorCalculatorPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/calculators/resistor",
                element: (<ResistorCalculatorPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/ic",
                element: (<IcPage />),
                errorElement: (<ErrorPage />),
            },
            {
                path: "/eseries",
                element: (
                    <ArticleTemplate header={<h1>E series of preferred numbers</h1>}>
                        <Eseries />
                    </ArticleTemplate>
                ),
                errorElement: (<ErrorPage />),
            },
        ]
    },
    {
        path: "*",
        element: (<pre>{JSON.stringify(window.location)}</pre>),
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
                <ResistorValuesContextWrapper>
                    <ConfigContextWrapper>
                        <RouterProvider router={router} />
                    </ConfigContextWrapper>
                </ResistorValuesContextWrapper>
            </QueryClientProvider>
        </StrictMode>
    );
