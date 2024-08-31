import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ConfigContext = createContext({
    isAllResistorValues: false, 
    setIsAllResistorValues: (value: boolean): void => {}
});

export function ConfigContextWrapper ({children}) {

    const [isAllResistorValues, setIsAllResistorValues] = useLocalStorage('all-resistor-values', true);

    return (
        <ConfigContext.Provider value={{isAllResistorValues, setIsAllResistorValues}}>
            {children}
        </ConfigContext.Provider>
    )
}
