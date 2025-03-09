import React, {
    useState,
    ReactNode,
    type MouseEvent,
} from "react";
import { Button, FormRow, FormStack } from "../../elements/Form";
import { Section, type Variants } from "../../elements/Section";
import { ResistorInput } from "../../elements/ValueInput";
import { ResistorOutput } from "../../elements/ValueOutput";
import './ResistorSerial.css';

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

export default function ResistorSerial ({
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
        items[index][0] = value;

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
        const outcome = calculateSerialResistance(state.items);

        const updatedState: State = {
            ...state,
            o: String(outcome / parseFloat(state.ou))
        };

        setActive(state.items.length > 2);
        setInternalState(updatedState);
        onCalculate(updatedState);
    }

    const calculateSerialResistance = (values: StateItem[]): number => {
        return values.reduce((previous, current) => {
            return previous + ((parseFloat(current[0] as string) * current[1] as number) )
        }, 0);
    }

    return (
        <article className="resistor-serial">
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
                                unit={item.at(1) as unknown as number}
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
                <details className="resistor-serial__details">
                    <summary className="resistor-serial__summary">Description</summary>
                    <div className="resistor-serial__content">
                        <ul className="resistor-serial__formula-list">
                            <li>
                                <math xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <msub>
                                            <mi>R</mi>
                                            <mi>s</mi>
                                        </msub>
                                        <mo>=</mo>
                                        <msub>
                                            <mi>R</mi>
                                            <mn>1</mn>
                                        </msub>
                                        <mo>+</mo>
                                        <msub>
                                            <mi>R</mi>
                                            <mrow>
                                                <mn>2</mn>
                                                <mo>+</mo>
                                            </mrow>
                                        </msub>
                                        <mo>·</mo>
                                        <mo>·</mo>
                                        <mo>·</mo>
                                        <mo>+</mo>
                                        <msub>
                                            <mi>R</mi>
                                            <mi>N</mi>
                                        </msub>
                                        <mo>&#xA0;</mo>
                                        <mo>≜</mo>
                                        <mo>&#xA0;</mo>
                                        <munderover accent="false" accentunder="false">
                                            <mo>∑</mo>
                                            <mrow>
                                                <mi>i</mi>
                                                <mo>=</mo>
                                                <mn>1</mn>
                                            </mrow>
                                            <mi>N</mi>
                                        </munderover>
                                        <msub>
                                            <mi>R</mi>
                                            <mi>i</mi>
                                        </msub>
                                    </mstyle>
                                </math>
                            </li>
                        </ul>
                        <svg></svg>
                        <p>
                            The total resistance of two or more resistors connected in series is equal to 
                            the sum of their individual resistances:
                        </p>
                    </div>
                </details>
            </footer>
        </article>
    )
}
