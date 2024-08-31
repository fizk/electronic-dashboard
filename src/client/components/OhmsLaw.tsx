import React, { useState } from "react";
import { FormRow, FormStack, LabelInput, LabelSelect } from "../elements/Form";
import type { ChangeEvent } from "react";

interface Props {}
interface State {
    r: string
    v: string
    i: string
    ru: string
    vu: string
    iu: string
}

export default function OhmsLaw ({}: Props) {

    const [state, setState] = useState<State>({
        v: '',
        i: '',
        r: '',
        vu: '',
        iu: '',
        ru: '',
    });

    const [focus, setFocus] = useState<string>();

    const handleVoltageChange = (event: ChangeEvent<HTMLInputElement>) => updateState({
        v: event.currentTarget.value,
        i: state.i,
        r: state.r,
        vu: state.vu,
        iu: state.iu,
        ru: state.ru,
    });
    const handleCurrentChange = (event: ChangeEvent<HTMLInputElement>) => updateState({
        v: state.v,
        i: event.currentTarget.value,
        r: state.r,
        vu: state.vu,
        iu: state.iu,
        ru: state.ru,
    });
    const handleResistanceChange = (event: ChangeEvent<HTMLInputElement>) => updateState({
        v: state.v,
        i: state.i,
        r: event.currentTarget.value,
        vu: state.vu,
        iu: state.iu,
        ru: state.ru,
    });
    
    const handleVoltageUnitChange = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        v: state.v,
        i: state.i,
        r: state.r,
        vu: event.currentTarget.value,
        iu: state.iu,
        ru: state.ru,
    });
    const handleCurrentUnitChange = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        v: state.v,
        i: state.i,
        r: state.r,
        vu: state.vu,
        iu: event.currentTarget.value,
        ru: state.ru,
    });
    const handleResistanceUnitChange = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        v: state.v,
        i: state.i,
        r: state.r,
        vu: state.vu,
        iu: state.iu,
        ru: event.currentTarget.value,
    });

    const updateState = (state: State) => {
        setState(state);

        if (state.v === '') {
            if (state.i !== '' && state.r !== ''){
                setState({...state, v: 'active'});
            }
        }
        else if (state.r === '') {
            if (state.i !== '' && state.v !== '' ){
                setState({...state, r: 'active'});
            }
        }
        else if (state.i === '') {
            if (state.r !== '' && state.v !== '' ){
                setState({...state, i: 'active'});
            }
        }


        
    }
    // const handleVoltageChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setState({
    //         r: state.r,
    //         v: event.currentTarget.value,
    //         i: state.i,  
    //     });

    //     if (
    //         isEmpty(event.currentTarget.value) ||
    //         (isEmpty(state.r) && isEmpty(state.i))
    //     ) {return}


    //     if (isEmpty(state.r)) {
    //         // r = v / i
    //         setState({
    //             r: formatResistance(adjustVoltage(event.currentTarget.value) / adjustCurrent(state.i)),
    //             v: event.currentTarget.value,
    //             i: state.i,  
    //         });
    //     }
    //     if (isEmpty(state.i)) {
    //         // i = v / r
    //         setState({
    //             r: state.r,
    //             v: event.currentTarget.value,
    //             i: formatCurrent(adjustVoltage(event.currentTarget.value) / adjustResistance(state.r)),
    //         });
    //     }
    // };
    // const handleResistanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     console.log(
    //         adjustResistance(event.currentTarget.value)
    //     )
    //     setState({
    //         r: event.currentTarget.value,
    //         v: state.v,
    //         i: state.i,  
    //     });

    //     if (
    //         isEmpty(event.currentTarget.value) ||
    //         (isEmpty(state.v) && isEmpty(state.i))
    //     ) {return}


    //     if (isEmpty(state.v)) {
    //         // v = r * i
    //         setState({
    //             r: event.currentTarget.value,
    //             v: formatVoltage(adjustResistance(event.currentTarget.value) * adjustCurrent(state.i)),
    //             i: state.i,  
    //         });
    //     }
    //     if (isEmpty(state.i)) {
    //         // i = v / r
    //         setState({
    //             r: event.currentTarget.value,
    //             v: state.v,
    //             i: formatCurrent(adjustVoltage(state.v) / adjustResistance(event.currentTarget.value)),
    //         });
    //     }
    // };
    // const handleCurrentChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setState({
    //         r: state.r,
    //         v: state.v,
    //         i: event.currentTarget.value,
    //     });

    //     if (
    //         isEmpty(event.currentTarget.value) ||
    //         (isEmpty(state.r) && isEmpty(state.v))
    //     ) {return}


    //     if (isEmpty(state.r)) {
    //         // r = v / i
    //         setState({
    //             r: formatResistance(adjustVoltage(state.v) /  adjustCurrent(event.currentTarget.value)),
    //             v: state.v,
    //             i: event.currentTarget.value,
    //         });
    //     }
    //     if (isEmpty(state.v)) {
    //         // v = r * i
    //         setState({
    //             r: state.r,
    //             v: formatVoltage(adjustResistance(state.r) *  adjustCurrent(event.currentTarget.value)),
    //             i: event.currentTarget.value,
    //         });
    //     }
    // };

    // const adjustResistance = (value: string): number => {
    //     const trimmedValue = value.trim();
    //     const result = trimmedValue.match(/([0-9]+(\.[0-9]+)?)(?<unit>[kK])?/);
        
    //     if (isNaN(parseFloat(result?.at(0) as string))) {
    //         return 0;
    //     } else {
    //         const number = parseFloat(result?.at(0) as string);
    //         const unit = result?.groups?.unit;
    //         switch (unit) {
    //             case 'k':
    //             case 'K': {
    //                 return number * 1000;
    //             };
    //             default:
    //                 return number;
    //         }
    //     }
    // }
    // const adjustCurrent = (value: string): number => {
    //     return parseFloat(value)
    // }
    // const adjustVoltage = (value: string): number => {
    //     return parseFloat(value)
    // }

    // const formatVoltage = (value: number): string => {
    //     return value.toFixed(2);
    // }
    // const formatCurrent = (value: number): string => {
    //     return value.toFixed(2);
    // }
    // const formatResistance = (value: number): string => {
    //     return value.toFixed(2);
    // }

    return (
        <FormStack>
            <FormRow>
                <LabelInput text="V" value={state.v} onChange={handleVoltageChange} onFocus={() => setFocus('v')} />
                <LabelSelect value={state.vu} onChange={handleVoltageUnitChange}>
                    <option>mV</option>
                    <option>V</option>
                </LabelSelect>
            </FormRow>
            <FormRow>
                <LabelInput text="I" value={state.i} onChange={handleCurrentChange} onFocus={() => setFocus('i')} />
                <LabelSelect value={state.iu} onChange={handleCurrentUnitChange}>
                    <option>µA</option>
                    <option>mA</option>
                    <option>A</option>
                </LabelSelect>
            </FormRow>
            <FormRow>
                <LabelInput text="R" value={state.r} onChange={handleResistanceChange} onFocus={() => setFocus('r')} />
                <LabelSelect value={state.ru} onChange={handleResistanceUnitChange}>
                    <option>Ω</option>
                    <option>KΩ</option>
                </LabelSelect>
            </FormRow>
        </FormStack>
    )
}
