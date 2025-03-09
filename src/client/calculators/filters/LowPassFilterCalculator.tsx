import React, { useState } from "react";
import { FormRow, FormStack, LabelInput, LabelSelect } from "../../elements/Form";
// import ResistorUnitSelect from "../../elements/ResistorUnitSelect";
// import CapacitorUnitSelect from "../../elements/CapacitorUnitSelect";
// import FrequencyUnitSelect from "../../elements/FrequencyUnitSelect";
import type { ChangeEvent } from "react";

type State = {
    r: string
    c: string
    f: string
    ru: number
    cu: number
    fu: number
}

const isEmpty = (value: string): boolean => (value === '' || value === '0' || value === null || value === undefined)

export default function LowPassFilterCalculator () {

    const [formState, setFormState] = useState<State>({
        r: '0',
        c: '0',
        f: '0',
        ru: 1,
        cu: 6,
        fu: 1
    });

    const handleResistanceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const r = event.currentTarget.value;

        setFormState({
            r: r,
            c: formState.c,
            f: formState.f,
            ru: formState.ru,
            cu: formState.cu,
            fu: formState.fu,
        });
        if (isEmpty(r)) return;

        if (isEmpty(formState.c) && !isEmpty(formState.f)) {
            const c = calculateCapacitance(
                parseFloat(r) * formState.ru,
                parseFloat(formState.f) * formState.fu,
            );

            setFormState({
                r: r,
                c: String(c),
                f: formState.f,
                ru: formState.ru,
                cu: formState.cu,
                fu: formState.fu,
            }); 

        } else if (isEmpty(formState.f) && !isEmpty(formState.c)) {
            const f = calculateFrequency(
                parseFloat(r) * formState.ru,
                parseFloat(formState.c) / Math.pow(10, formState.cu)
            );
            setFormState({
                r: r,
                c: formState.c,
                f: String(f),
                ru: formState.ru,
                cu: formState.cu,
                fu: formState.fu,
            }); 
        }
    }

    const handleCapacitanceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const c = event.currentTarget.value;
        setFormState({
            r: formState.c,
            c: c,
            f: formState.f,
            ru: formState.ru,
            cu: formState.cu,
            fu: formState.fu,
        });
        if (isEmpty(c)) return;

        if (isEmpty(formState.r) && !isEmpty(formState.f)) {
            const r = calculateResistance(
                parseFloat(c) / Math.pow(10, formState.cu),
                parseFloat(formState.f) * formState.fu,
            );
            setFormState({
                r: String(r),
                c: c,
                f: formState.f,
                ru: formState.ru,
                cu: formState.cu,
                fu: formState.fu,
            });

        } else if (isEmpty(formState.f) && !isEmpty(formState.r)) {
            const f = calculateFrequency(
                parseFloat(formState.r) * formState.ru,
                parseFloat(c) / Math.pow(10, formState.cu),
            );
            setFormState({
                r: formState.r,
                c: c,
                f: String(f),
                ru: formState.ru,
                cu: formState.cu,
                fu: formState.fu,
            });
        }
    }

    const handleCutoffChange = (event: ChangeEvent<HTMLInputElement>) => {
        const f = event.currentTarget.value;
        setFormState({
            r: formState.r,
            c: formState.c,
            f: f,
            ru: formState.ru,
            cu: formState.cu,
            fu: formState.fu
        });
        if (isEmpty(f)) return;

        // if C is 0
        if (isEmpty(formState.r) && !isEmpty(formState.c)) {

            const r = calculateResistance(
                parseFloat(formState.c),
                parseFloat(f)
            );
            setFormState({
                r: String(r),
                c: formState.c,
                f: f,
                ru: formState.ru,
                cu: formState.cu,
                fu: formState.fu
            });
        // if r is 0
        } else if (isEmpty(formState.c) && !isEmpty(formState.r)) {
            const c = calculateCapacitance(
                parseFloat(formState.r) * formState.ru,
                parseFloat(f) * formState.fu
            );
            setFormState({
                r: formState.r,
                c: String(c),
                f: f,
                ru: formState.ru,
                cu: formState.cu,
                fu: formState.fu
            });
        }
    }

    const calculateResistance = (c: number, f: number): number => {
        return 1 / (2 * Math.PI * c * f);
    }

    const calculateCapacitance = (r: number, f: number): number => {
        return 1 / (2 * Math.PI * r * f);
    }

    const calculateFrequency = (r: number, c: number): number => {
        return 1 / (2 * Math.PI * r * c);
    }

    return (
        <article>
            <form>
                <FormStack>
                    <FormRow>
                        <LabelInput text="Resistance" type="number" value={formState.r} onChange={handleResistanceChange} />
                        {/* <ResistorUnitSelect value={formState.ru} onChange={console.log} /> */}
                    </FormRow>
                
                    <FormRow>
                        <LabelInput text="Capacitance" type="number" value={formState.c} onChange={handleCapacitanceChange} />
                        {/* <CapacitorUnitSelect value={formState.cu} onChange={console.log} /> */}
                    </FormRow>
                    
                    <FormRow>
                        <LabelInput text="Frequency" type="number" value={formState.f} onChange={handleCutoffChange} />
                        {/* <FrequencyUnitSelect value={formState.fu} onChange={console.log} /> */}
                    </FormRow>
                </FormStack>
            </form>
        </article>
    )
}
