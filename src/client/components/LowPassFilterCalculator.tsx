import React, { useState } from "react";
import { LabelInput, LabelSelect } from "../elements/Form";
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
            <div>
                <LabelInput text="Resistance" type="number" value={formState.r} onChange={handleResistanceChange} />
                <LabelSelect value={formState.ru} onChange={console.log}>
                    <option value={1}>Ω</option>
                    <option value={1000}>ΩK</option>
                </LabelSelect>
            </div>
            <div>
                <LabelInput text="Capacitance" type="number" value={formState.c}  onChange={handleCapacitanceChange} />
                <LabelSelect value={formState.cu} onChange={console.log}>
                    <option value={12}>pF</option>
                    <option value={6}>µF</option>
                    <option value={1}>F</option>
                </LabelSelect>
            </div>
            <div>
                <LabelInput text="-3dB Cutoff Frequency" type="number" value={formState.f}  onChange={handleCutoffChange} />
                <LabelSelect value={formState.fu} onChange={console.log}>
                    <option value={1}>Hz</option>
                    <option value={1000}>KHz</option>
                </LabelSelect>
            </div>
            </form>
        </article>
    )
}
