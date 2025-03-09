import React, {
    useState,
    ReactNode,
    type MouseEvent,
} from "react";
import { Button, FormRow, FormStack } from "../../elements/Form";
import { Section, type Variants } from "../../elements/Section";
import { ResistorInput } from "../../elements/ValueInput";
import { ResistorOutput } from "../../elements/ValueOutput";
import './ResistorParallel.css';

interface State {
    o: string
    ou: string
    items: StateItem[]
}

type StateItem = [string, number];

interface Props {
    header?: ReactNode
    variants?: Variants
    state?: State
    onCalculate?: (state: State) => void
}

const defaultState: State = {
    o: '0', 
    ou: '1',
    items: [['1', 1], ['1', 1]], 
}

export default function ResistorParallel ({
    header = null, 
    variants = [], 
    onCalculate = () => {}, 
    state = defaultState,
}: Props) {

    const [internalState, setInternalState] = useState<State>(state);
    const [active, setActive] = useState<boolean>(false);

    const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
        calculate({
            ...internalState,
            items: [...internalState.items, ['1', 1]]
        });
    };

    const handleRemove = (index: number) => {
        if (internalState.items.length === 1) return;

        calculate({
            ...internalState,
            items: [
                ...internalState.items.slice(0, index),
                ...internalState.items.slice(index + 1)
            ]
        });
    };

    const handleChangeValue = (value: string, index: number) => {
        const items: StateItem[] = [...internalState.items];
        items[index][0] = value.replaceAll(',', '');

        calculate({
            ...internalState,
            items
        });
    }

    const handleChangeUnit = (value: string, index: number) => {
        const items: StateItem[] = [...internalState.items];
        items[index][1] = parseFloat(value);

        calculate({
            ...internalState,
            items
        });
    }

    const handleChangeOutputUnit = (value: string) => {
        calculate({
            ...internalState,
            ou: value
        });
    }

    const calculate = (state: State) => {
        const outcome = calculateParallelResistance(state.items);

        const updatedState: State = {
            ...state,
            o: String(outcome / parseFloat(state.ou))
        };

        setActive(state.items.length > 2);
        setInternalState(updatedState);
        onCalculate(updatedState);
    }

    const calculateParallelResistance = (values: StateItem[]) => {
        return Math.pow(
            values.reduce((previous, current) => {
                return previous + ( 1 / (parseFloat(current[0] as string) * current[1] as number) )
            }, 0),
            -1
        );
    }

    return (
        <article className="resistor-parallel">
            {header && (
                <header>{header}</header>
            )}
            <Section variant={variants}>
                <FormStack>
                    {internalState.items.map((item, i) => (
                        <FormRow key={i} variants={['stretch']}>
                            <ResistorInput
                                text={<>R<sub>{i+1}</sub></>}
                                value={item.at(0) as string}
                                unit={item.at(1) as number}
                                onValueChange={value => handleChangeValue(value, i)}
                                onUnitChange={value => handleChangeUnit(value, i)}
                            />
                            <Button onClick={() => handleRemove(i)} disabled={!active} kind="danger">Remove</Button>
                        </FormRow>
                    ))}
                    <FormRow variants={['stretch']}>
                        <Button onClick={handleAdd} kind="warning">add</Button>
                        <ResistorOutput 
                            text={<>R<sub>t</sub></>}
                            value={internalState.o}
                            unit={internalState.ou as unknown as number}
                            onUnitChange={handleChangeOutputUnit}
                        />
                    </FormRow>
                </FormStack>
            </Section>
            <footer>
                <details className="resistor-parallel__details">
                    <summary className="resistor-parallel__summary">Description</summary>
                    <div className="resistor-parallel__content">
                        <ul className="resistor-parallel__formula-list">
                            <li>
                                <math mode="display" xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <msub>
                                            <mi>R</mi>
                                            <mn>1</mn>
                                        </msub>
                                        <mo>∥</mo>
                                        <msub>
                                            <mi>R</mi>
                                            <mn>2</mn>
                                        </msub>
                                        <mo>&#xA0;</mo>
                                        <mo>&#x225C;</mo>
                                        <mo>&#xA0;</mo>
                                        <mfrac>
                                            <mrow>
                                                <msub>
                                                    <mi>R</mi>
                                                    <mn>1</mn>
                                                </msub>
                                                <mo>×</mo>
                                                <msub>
                                                    <mi>R</mi>
                                                    <mn>2</mn>
                                                </msub>
                                            </mrow>
                                            <mrow>
                                                <msub>
                                                    <mi>R</mi>
                                                    <mn>1</mn>
                                                </msub>
                                                <mo>+</mo>
                                                <msub>
                                                    <mi>R</mi>
                                                    <mn>2</mn>
                                                </msub>
                                            </mrow>
                                        </mfrac>
                                    </mstyle>
                                </math>
                            </li>
                            <li>
                                <math mode="display" xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <mrow>
                                        <msub>
                                            <mi>R</mi>
                                            <mn>1</mn>
                                        </msub>
                                        <mo>&#x2225;</mo>
                                        <msub>
                                            <mi>R</mi>
                                            <mn>2</mn>
                                        </msub>
                                        <mo>&#x2225;</mo>
                                        <mo>&#x002E;</mo>
                                        <mo>&#x002E;</mo>
                                        <mo>&#x002E;</mo>
                                        <mo>&#x2225;</mo>
                                        <msub>
                                            <mi>R</mi>
                                            <mi>n</mi>
                                        </msub>
                                        <mo>&#xA0;</mo>
                                        <mo>&#x225C;</mo>
                                        <mo>&#xA0;</mo>
                                        <msup>
                                            <mrow>
                                            <mo>(</mo>
                                            <mfrac>
                                                <mn>1</mn>
                                                <msub>
                                                <mi>R</mi>
                                                <mn>1</mn>
                                                </msub>
                                            </mfrac>
                                            <mo>+</mo>
                                            <mfrac>
                                                <mn>1</mn>
                                                <msub>
                                                <mi>R</mi>
                                                <mn>2</mn>
                                                </msub>
                                            </mfrac>
                                            <mo>+</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>+</mo>
                                            <mfrac>
                                                <mn>1</mn>
                                                <msub>
                                                <mi>R</mi>
                                                <mi>n</mi>
                                                </msub>
                                            </mfrac>
                                            <mo>)</mo>
                                            </mrow>
                                            <mrow >
                                            <mo>&#x2212;</mo>
                                            <mn>1</mn>
                                            </mrow>
                                        </msup>
                                        </mrow>
                                    </mstyle>
                                </math>
                            </li>
                        </ul>
                        <svg fill="none" height="216" viewBox="0 0 239 216" width="239" className="resistor-parallel__schematics schematics">
                            <circle cx="44.5" cy="29.9688" r="3.5" className="schematics--stroke-dark schematics--fill-light"/>
                            <path d="M21.776 23.71H23.554L26.634 30.78L29.728 23.71H31.492L26.746 34H26.536L21.776 23.71ZM31.9015 30.328H32.7975V34H31.9015V30.328ZM32.3415 29.64C32.1762 29.64 32.0375 29.584 31.9255 29.472C31.8135 29.36 31.7575 29.2213 31.7575 29.056C31.7575 28.9067 31.8135 28.7787 31.9255 28.672C32.0375 28.5653 32.1762 28.512 32.3415 28.512C32.5015 28.512 32.6375 28.5653 32.7495 28.672C32.8615 28.7787 32.9175 28.9067 32.9175 29.056C32.9175 29.2213 32.8615 29.36 32.7495 29.472C32.6429 29.584 32.5069 29.64 32.3415 29.64ZM33.9938 30.328H34.8418L34.8498 31C34.9511 30.776 35.1111 30.592 35.3298 30.448C35.5484 30.304 35.8044 30.232 36.0978 30.232C36.4764 30.232 36.7671 30.312 36.9698 30.472C37.1724 30.6267 37.3084 30.8453 37.3778 31.128C37.4471 31.4107 37.4818 31.7787 37.4818 32.232V34H36.6178V32.256C36.6178 31.792 36.5724 31.4587 36.4818 31.256C36.3911 31.048 36.2044 30.944 35.9218 30.944C35.7618 30.944 35.5991 30.9947 35.4338 31.096C35.2684 31.192 35.1298 31.3333 35.0178 31.52C34.9111 31.7067 34.8578 31.9253 34.8578 32.176V34H33.9938V30.328Z" className="schematics--fill-dark"/>
                            <line className="schematics--stroke-dark" x1="194" x2="47" y1="30" y2="30"/>
                            <path d="M109.23 68L107.158 64.108C106.729 64.1267 106.346 64.136 106.01 64.136H105.618V68H104.092V57.71H106.43C107.615 57.71 108.591 57.9573 109.356 58.452C110.121 58.9373 110.504 59.7307 110.504 60.832C110.504 61.5227 110.341 62.12 110.014 62.624C109.697 63.1187 109.221 63.5013 108.586 63.772L111.036 68H109.23ZM106.612 62.862C107.527 62.862 108.152 62.666 108.488 62.274C108.833 61.8727 109.006 61.3967 109.006 60.846C109.006 59.6233 108.189 59.012 106.556 59.012H105.618V62.862H106.612ZM112.577 62.208L113.481 61.952V68H112.577V62.208Z" className="schematics--fill-dark"/>
                            <path d="M178.23 68L176.158 64.108C175.729 64.1267 175.346 64.136 175.01 64.136H174.618V68H173.092V57.71H175.43C176.615 57.71 177.591 57.9573 178.356 58.452C179.121 58.9373 179.504 59.7307 179.504 60.832C179.504 61.5227 179.341 62.12 179.014 62.624C178.697 63.1187 178.221 63.5013 177.586 63.772L180.036 68H178.23ZM175.612 62.862C176.527 62.862 177.152 62.666 177.488 62.274C177.833 61.8727 178.006 61.3967 178.006 60.846C178.006 59.6233 177.189 59.012 175.556 59.012H174.618V62.862H175.612ZM181.113 64.328H181.961L181.969 65C182.07 64.776 182.23 64.592 182.449 64.448C182.668 64.304 182.924 64.232 183.217 64.232C183.596 64.232 183.886 64.312 184.089 64.472C184.292 64.6267 184.428 64.8453 184.497 65.128C184.566 65.4107 184.601 65.7787 184.601 66.232V68H183.737V66.256C183.737 65.792 183.692 65.4587 183.601 65.256C183.51 65.048 183.324 64.944 183.041 64.944C182.881 64.944 182.718 64.9947 182.553 65.096C182.388 65.192 182.249 65.3333 182.137 65.52C182.03 65.7067 181.977 65.9253 181.977 66.176V68H181.113V64.328Z" className="schematics--fill-dark"/>
                            <circle cx="124" cy="133" className="schematics--fill-dark" r="4.5"/>
                            <circle cx="124" cy="30.5" className="schematics--fill-dark" r="4.5"/>
                            <circle cx="159.5" cy="133" className="schematics--fill-dark" r="4.5"/>
                            <circle cx="159.5" cy="30.5" className="schematics--fill-dark" r="4.5"/>
                            <line className="schematics--stroke-dark" x1="124" x2="124" y1="31" y2="133"/>
                            <rect height="44" className="schematics--stroke-dark schematics--fill-light" transform="rotate(180 131 101)" width="14" x="131" y="101"/>
                            <line className="schematics--stroke-dark" x1="152" x2="168" y1="188" y2="188"/>
                            <line className="schematics--stroke-dark" x1="154" x2="166" y1="192" y2="192"/>
                            <line className="schematics--stroke-dark" x1="156" x2="164" y1="196" y2="196"/>
                            <line className="schematics--stroke-dark" x1="126" x2="194" y1="133" y2="133"/>
                            <line className="schematics--stroke-dark" x1="193" x2="193" y1="133" y2="30"/>
                            <line className="schematics--stroke-dark" x1="159" x2="159" y1="187" y2="30"/>
                            <rect height="44" className="schematics--stroke-middle schematics--fill-light" transform="rotate(180 166 101)" width="14" x="166" y="101"/>
                            <rect height="44" className="schematics--stroke-dark schematics--fill-light" transform="rotate(180 201 101)" width="14" x="201" y="101"/>
                        </svg>
                        <p className="resistor-parallel__description">
                            To find the total resistance of all components, add the reciprocals of the resistances R<sub>i</sub> of 
                            each component and take the reciprocal of the sum. Total resistance will always be less than the 
                            value of the smallest resistance.
                        </p>
                    </div>
                </details>
            </footer>
        </article>
    )
}
