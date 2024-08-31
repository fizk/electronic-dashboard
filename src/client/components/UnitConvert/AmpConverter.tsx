import React, { useState } from 'react';
import { FormStack, LabelInput } from '../../elements/Form';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { ChangeEvent } from "react";

interface State {
    u: string
    m: string
    a: string
}

export default function AmpConverter () {
    const [valuesStored, setValuesStored] = useLocalStorage<State>('AmpConverter', {
        u: '',
        m: '',
        a: '',
    });
    const [values, setValues] = useState<State>(valuesStored)

    const formtatOptions: Intl.NumberFormatOptions = {
        maximumFractionDigits: 100,
    };

    const updateValue = (state: State, value: string) => {
        if (value === '0' || value === '') {
            setValues({
                u: '',
                m: '',
                a: '',
            });
            return;
        };
        const newState = {
            u: state.u === 'NaN' ? '' : state.u,
            m: state.m === 'NaN' ? '' : state.m,
            a: state.a === 'NaN' ? '' : state.a,
        };
        setValues(newState);
        setValuesStored(newState);
    }
    const handleMicro = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        u: event.currentTarget.value,
        m: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -3))),
        a: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -6))),
    }, event.currentTarget.value);

    const handleMilli = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        u: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 3))),
        m: event.currentTarget.value,
        a: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -3))),
    }, event.currentTarget.value);

    const handleAmp = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        u: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * (Math.pow(10, 6)))),
        m: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * (Math.pow(10, 3)))),
        a: event.currentTarget.value,
    }, event.currentTarget.value);

    return (
        <FormStack>
            <LabelInput text="µA" value={values.u} onChange={handleMicro} />
            <LabelInput text="mA" value={values.m} onChange={handleMilli} />
            <LabelInput text="&nbsp;A" value={values.a} onChange={handleAmp} />
        </FormStack>
    );
}
