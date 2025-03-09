import React, { useState } from 'react';
import { FormStack, LabelInput } from '../../elements/Form';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { ChangeEvent } from "react";

interface State {
    p: string
    n: string
    u: string
    f: string
}

export default function FaradConverter () {
    const [valuesStored, setValuesStored] = useLocalStorage<State>('FaradConverter', {
        p: '0',
        n: '0',
        u: '0',
        f: '0',
    });
    const [values, setValues] = useState<State>(valuesStored)

    const updateValue = (state: State, value: string) => {
        if (value === '0' || value === '') {
            setValues({
                p: '',
                n: '',
                u: '',
                f: '',
            });
            return;
        };
        const newState = {
            p: state.p === 'NaN' ? '' : state.p,
            n: state.n === 'NaN' ? '' : state.n,
            u: state.u === 'NaN' ? '' : state.u,
            f: state.f === 'NaN' ? '' : state.f,
        };
        setValues(newState);
        setValuesStored(newState);
    }
    const formtatOptions: Intl.NumberFormatOptions = {
        maximumFractionDigits: 100,
    };

    const handlePico = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        p: event.currentTarget.value,
        n: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -3))),
        u: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -6))),
        f: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * (Math.pow(10, -12)))),
    }, event.currentTarget.value);

    const handleNano = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        p: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 3))),
        n: event.currentTarget.value,
        u: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -3))),
        f: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * (Math.pow(10, -9)))),
    },event.currentTarget.value);

    const handleMicro = (event: ChangeEvent<HTMLInputElement>) =>updateValue({
        p: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 6))),
        n: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 3))),
        u: event.currentTarget.value,
        f: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, -6))),
    }, event.currentTarget.value);
    
    const handleFarad = (event: ChangeEvent<HTMLInputElement>) => updateValue({
        p: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 12))),
        n: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 9))),
        u: Intl.NumberFormat('en-gb', formtatOptions).format((parseFloat(event.currentTarget.value) * Math.pow(10, 6))),
        f: event.currentTarget.value,
    }, event.currentTarget.value);


    return (
        <FormStack>
            <LabelInput text="pF" value={values.p} onChange={handlePico} />
            <LabelInput text="nF" value={values.n} onChange={handleNano} />
            <LabelInput text="µF" value={values.u} onChange={handleMicro} />
            <LabelInput text="&nbsp;F" value={values.f} onChange={handleFarad} />
        </FormStack>
    );
}
