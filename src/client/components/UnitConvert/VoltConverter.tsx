import React, { useState } from 'react';
import { FormStack, LabelInput } from '../../elements/Form';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { ChangeEvent } from "react";

interface State {
    u: string
    m: string
    v: string
}

export default function VoltConverter () {
    const [valuesStored, setValuesStored] = useLocalStorage<State>('VoltConverter', {
        u: '',
        m: '',
        v: '',
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
                v: '',
            });
            return;
        };
        const newState = {
            u: state.u === 'NaN' ? '' : state.u,
            m: state.m === 'NaN' ? '' : state.m,
            v: state.v === 'NaN' ? '' : state.v,
        };
        setValues(newState);
        setValuesStored(newState);
    }

    const handleMicro = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        u: event.currentTarget.value,
        m: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -3))),
        v: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -6))),
    }, event.currentTarget.value);

    const handleMilli = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        u: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 3))),
        m: event.currentTarget.value,
        v: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -3))),
    }, event.currentTarget.value);

    const handleVolt = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        u: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 6))),
        m: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 3))),
        v: event.currentTarget.value,
    }, event.currentTarget.value);

    return (
        <FormStack>
            <LabelInput text="µV" value={values.u} onChange={handleMicro} />
            <LabelInput text="mV" value={values.m} onChange={handleMilli} />
            <LabelInput text="&nbsp;V" value={values.v} onChange={handleVolt} />
        </FormStack>
    );
}
