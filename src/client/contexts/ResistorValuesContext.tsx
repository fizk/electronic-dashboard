import React, { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ResistorValue } from '../types.d';

export const ResistorValuesContext = createContext<ResistorValue[]>([]);

export function ResistorValuesContextWrapper ({
    children,
    host = '',
}) {

    const query = useQuery({ initialData: [], queryKey: ['resistors-fixed'], queryFn: async(): Promise<ResistorValue[]> => {
        const request = await fetch(`${host}/electronic/api/values/resistors/fixed`);
        if (request.status !== 200) return [];
        const response = request.json();
        return response;
    } });

    return (
        <ResistorValuesContext.Provider value={query.data || []}>
            {children}
        </ResistorValuesContext.Provider>
    )
}
