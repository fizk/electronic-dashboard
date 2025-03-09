import React, { useState } from 'react';
import { Button, FormRow, FormStack } from '../../elements/Form';
import { VoltageOutput } from '../../elements/ValueOutput';
import { Section, Variants } from "../../elements/Section";
import ResistorSelector from '../../elements/FixedValueInput';
import { VoltageInput } from '../../elements/ValueInput';
import classVariant from '../../helpers/classVariant';
import type { ChangeEvent, ReactNode } from 'react';
import { SummaryFooter } from '../../elements/SummaryFooter';
import './InvertingSummingOpAmp.css';

interface Props {
    state?: State
    variants?: Variants
    header?: ReactNode
    open?: boolean
}

type Item = {v: string, r: string, vu: number};
interface State {
    items: Item[]
    rf: string
    o: string
    ou: number
}

const defaultState: State = {
    items: [
        {v: '0', r: '0', vu: 1}
    ],
    rf: '1',
    o: '1',
    ou: 1,
}

export default function InvertingSummingOpAmp({
    state = defaultState,
    variants = [],
    header,
    open = false
}: Props) {

    const [internalState, setInternalState] = useState<State>(state);

    const handleResistorChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
        const tmpState: State = {...internalState};
        if (!tmpState.items[index]) {
            tmpState.items[index] = {v: '0', r: '0', vu: 1};
        }
        tmpState.items[index] = {
            ...tmpState.items[index],
            r: event.currentTarget.value,
        };

        updateState(tmpState);
    }

    const handleVoltageValueChange = (value: string, index: number) => {
        const tmpState = {...internalState};
        if (!tmpState.items[index]) {
            tmpState.items[index] = {v: '0', r: '0', vu: 1};
        }
        tmpState.items[index] = {
            ...tmpState.items[index],
            v: value,
        };

        updateState(tmpState);
    }

    const handleVoltageUnitChange = (value: string, index: number) => {
        const tmpState = {...internalState};
        if (!tmpState.items[index]) {
            tmpState.items[index] = {v: '0', r: '0', vu: 1};
        }
        tmpState.items[index] = {
            ...tmpState.items[index],
            vu: parseFloat(value),
        };

        updateState(tmpState);
    }

    const handleFeedbackChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateState({
            ...internalState, 
            rf: event.currentTarget.value
        });
    }

    const handleOutputUnitChange = (value: string) => {
        updateState({
            ...internalState,
            ou: parseFloat(value),
        })
    }

    const handleAdd = () => {
        updateState({
            ...internalState,
            items: [
                ...internalState.items, 
                {v: '0', r: '0', vu: 1}
            ]
        });
    }

    const handlRemove = (index: number) => {
        if (internalState.items.length === 1) return;

        updateState({
            ...internalState,
            items: [
                ...internalState.items.slice(0, index),
                ...internalState.items.slice(index + 1)
            ]
        });
    }

    const updateState = (state: State) => {
        setInternalState(state);

        const isAllValuePairsSet = state.items.map(item => parseFloat(item.v) > 0 && parseFloat(item.r) > 0);
        const isEveryValueSet = isAllValuePairsSet.every(item => item);
        const isFeedbackSet = state.rf != '' && state.rf != '0' ;

        if (!isEveryValueSet || !isFeedbackSet) return;

        const outcome = calculate(state.items, state.rf);

        setInternalState({
            ...state,
            o: String(outcome / state.ou)
        });

    }

    const calculate = (vr: Item[], feedback: string): number => {
        return vr.map(item => (parseFloat(item.v) * item.vu) / parseFloat(item.r))
            .reduce((previous, current) => previous + current, 0)
            * parseFloat(feedback)
            * -1 ;
    }

    return (
        <article className="inverting-summing-op-amp">
            {header && (
                <header className="inverting-summing-op-amp__header">{header}</header>
            )}
            <Section variant={variants}>
                <FormStack>
                    {internalState.items.map((item, index) => (
                        <FormRow key={index} variants={['stretch']}>
                            <VoltageInput value={item.v} 
                                unit={item.vu}
                                text={<>V<sub>{index + 1}</sub></>} 
                                onValueChange={value => handleVoltageValueChange(value, index)} 
                                onUnitChange={value => handleVoltageUnitChange(value, index)}
                            />
                            <ResistorSelector value={item.r} 
                                text={<>R<sub>{index + 1}</sub></>} 
                                onSelect={event => handleResistorChange(event, index)} 
                            />
                            <Button onClick={() => handlRemove(index)} kind="danger">remove</Button>
                        </FormRow>
                    ))}
                    <Button onClick={handleAdd} kind="warning">add</Button>
                    <ResistorSelector value={internalState.rf} 
                        text={<>R<sub>f</sub></>} 
                        onSelect={handleFeedbackChange} />
                    <VoltageOutput value={internalState.o} 
                        text={<>V<sub>out</sub></>} 
                        unit={internalState.ou}
                        onUnitChange={handleOutputUnitChange}
                    />
                </FormStack>
            </Section>
            <SummaryFooter label="Description" open={open}>
                <div className="inverting-summing-op-amp__summary">
                    <div className="inverting-summing-op-amp__schema">
                        <svg width="325" height="207" viewBox="0 0 325 207" fill="none" className="schematics">
                            <circle cx="29.5" cy="30.9688" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <circle cx="29.5" cy="64.9688" r="3.5" className={classVariant('schematics', ['stroke-middle', 'fill-light'])}/>
                            <circle cx="29.5" cy="98.9688" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <circle cx="29.5" cy="132.969" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <circle cx="293.5" cy="149" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <line x1="33" y1="31" x2="133" y2="31" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="33" y1="65" x2="133" y2="65" className={classVariant('schematics', ['stroke-middle'])}/>
                            <line x1="33" y1="99" x2="133" y2="99" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="163" y1="99" x2="263" y2="99" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="33" y1="133" x2="186" y2="133" className={classVariant('schematics', ['stroke-dark'])}/>
                            <rect x="65" y="38" width="14" height="44" transform="rotate(-90 65 38)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <rect x="65" y="72" width="14" height="44" transform="rotate(-90 65 72)" className={classVariant('schematics', ['stroke-middle', 'fill-light'])}/>
                            <rect x="65" y="106" width="14" height="44" transform="rotate(-90 65 106)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <rect x="195" y="106" width="14" height="44" transform="rotate(-90 195 106)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <rect x="65" y="140" width="14" height="44" transform="rotate(-90 65 140)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <path d="M16.8375 31.3279H17.6855L17.6935 31.9999C17.7949 31.7759 17.9549 31.5919 18.1735 31.4479C18.3922 31.3039 18.6482 31.2319 18.9415 31.2319C19.3202 31.2319 19.6109 31.3119 19.8135 31.4719C20.0162 31.6266 20.1522 31.8453 20.2215 32.1279C20.2909 32.4106 20.3255 32.7786 20.3255 33.2319V34.9999H19.4615V33.2559C19.4615 32.7919 19.4162 32.4586 19.3255 32.2559C19.2349 32.0479 19.0482 31.9439 18.7655 31.9439C18.6055 31.9439 18.4429 31.9946 18.2775 32.0959C18.1122 32.1919 17.9735 32.3333 17.8615 32.5199C17.7549 32.7066 17.7015 32.9253 17.7015 33.1759V34.9999H16.8375V31.3279Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M6.776 24.71H8.554L11.634 31.78L14.728 24.71H16.492L11.746 35H11.536L6.776 24.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M18.8135 100.528C19.0642 100.192 19.2722 99.8799 19.4375 99.5919C19.6082 99.3039 19.6935 99.0373 19.6935 98.7919C19.6935 98.4933 19.6135 98.2666 19.4535 98.1119C19.2989 97.9519 19.0642 97.8719 18.7495 97.8719C18.4615 97.8719 18.2295 97.9519 18.0535 98.1119C17.8775 98.2719 17.7309 98.4666 17.6135 98.6959L16.8695 98.2959C17.0562 97.9386 17.3015 97.6373 17.6055 97.3919C17.9095 97.1466 18.2989 97.0239 18.7735 97.0239C19.3655 97.0239 19.8189 97.1786 20.1335 97.4879C20.4482 97.7919 20.6055 98.1919 20.6055 98.6879C20.6055 99.3333 20.2855 100.048 19.6455 100.832L18.5575 102.208H20.8375V103H16.8375L18.8135 100.528Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M6.776 92.71H8.554L11.634 99.78L14.728 92.71H16.492L11.746 103H11.536L6.776 92.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M17.3015 131.208L18.2055 130.952V137H17.3015V131.208Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M6.776 126.71H8.554L11.634 133.78L14.728 126.71H16.492L11.746 137H11.536L6.776 126.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M320.158 153.032H319.51V152.328H320.158V150.832L321.03 150.64V152.328H321.878V153.032H321.03V156H320.158V153.032Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M316.664 156.08C316.158 156.08 315.808 155.931 315.616 155.632C315.43 155.333 315.336 154.917 315.336 154.384V152.328H316.2V154.168C316.2 154.472 316.216 154.709 316.248 154.88C316.286 155.045 316.355 155.168 316.456 155.248C316.563 155.328 316.72 155.368 316.928 155.368C317.078 155.368 317.222 155.325 317.36 155.24C317.499 155.155 317.611 155.04 317.696 154.896C317.787 154.747 317.832 154.584 317.832 154.408V152.328H318.688V156H317.984L317.888 155.464C317.755 155.672 317.587 155.827 317.384 155.928C317.187 156.029 316.947 156.08 316.664 156.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M312.55 156.08C312.171 156.08 311.835 155.995 311.542 155.824C311.248 155.653 311.022 155.421 310.862 155.128C310.702 154.835 310.622 154.509 310.622 154.152C310.622 153.8 310.699 153.477 310.854 153.184C311.014 152.891 311.24 152.659 311.534 152.488C311.827 152.317 312.166 152.232 312.55 152.232C312.934 152.232 313.27 152.317 313.558 152.488C313.851 152.659 314.075 152.891 314.23 153.184C314.39 153.477 314.47 153.8 314.47 154.152C314.47 154.509 314.39 154.835 314.23 155.128C314.07 155.421 313.843 155.653 313.55 155.824C313.262 155.995 312.928 156.08 312.55 156.08ZM312.574 155.376C312.883 155.376 313.126 155.261 313.302 155.032C313.483 154.803 313.574 154.515 313.574 154.168C313.574 153.821 313.478 153.531 313.286 153.296C313.094 153.056 312.84 152.936 312.526 152.936C312.222 152.936 311.976 153.053 311.79 153.288C311.608 153.523 311.518 153.816 311.518 154.168C311.518 154.509 311.616 154.797 311.814 155.032C312.011 155.261 312.264 155.376 312.574 155.376Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M300.776 145.71H302.554L305.634 152.78L308.728 145.71H310.492L305.746 156H305.536L300.776 145.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M89.1129 16.3279H89.9609L89.9689 16.9999C90.0702 16.7759 90.2302 16.5919 90.4489 16.4479C90.6676 16.3039 90.9236 16.2319 91.2169 16.2319C91.5956 16.2319 91.8862 16.3119 92.0889 16.4719C92.2916 16.6266 92.4276 16.8453 92.4969 17.1279C92.5662 17.4106 92.6009 17.7786 92.6009 18.2319V19.9999H91.7369V18.2559C91.7369 17.7919 91.6916 17.4586 91.6009 17.2559C91.5102 17.0479 91.3236 16.9439 91.0409 16.9439C90.8809 16.9439 90.7182 16.9946 90.5529 17.0959C90.3876 17.1919 90.2489 17.3333 90.1369 17.5199C90.0302 17.7066 89.9769 17.9253 89.9769 18.1759V19.9999H89.1129V16.3279Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M86.23 20L84.158 16.108C83.7287 16.1266 83.346 16.136 83.01 16.136H82.618V20H81.092V9.70996H83.43C84.6154 9.70996 85.5907 9.95729 86.356 10.452C87.1214 10.9373 87.504 11.7306 87.504 12.832C87.504 13.5226 87.3407 14.12 87.014 14.624C86.6967 15.1186 86.2207 15.5013 85.586 15.772L88.036 20H86.23ZM83.612 14.862C84.5267 14.862 85.152 14.666 85.488 14.274C85.8334 13.8726 86.006 13.3966 86.006 12.846C86.006 11.6233 85.1894 11.012 83.556 11.012H82.618V14.862H83.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M91.0889 85.5279C91.3396 85.1919 91.5476 84.8799 91.7129 84.5919C91.8836 84.3039 91.9689 84.0373 91.9689 83.7919C91.9689 83.4933 91.8889 83.2666 91.7289 83.1119C91.5742 82.9519 91.3396 82.8719 91.0249 82.8719C90.7369 82.8719 90.5049 82.9519 90.3289 83.1119C90.1529 83.2719 90.0062 83.4666 89.8889 83.6959L89.1449 83.2959C89.3316 82.9386 89.5769 82.6373 89.8809 82.3919C90.1849 82.1466 90.5742 82.0239 91.0489 82.0239C91.6409 82.0239 92.0942 82.1786 92.4089 82.4879C92.7236 82.7919 92.8809 83.1919 92.8809 83.6879C92.8809 84.3333 92.5609 85.0479 91.9209 85.8319L90.8329 87.2079H93.1129V87.9999H89.1129L91.0889 85.5279Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M86.23 88L84.158 84.108C83.7287 84.1266 83.346 84.136 83.01 84.136H82.618V88H81.092V77.71H83.43C84.6154 77.71 85.5907 77.9573 86.356 78.452C87.1214 78.9373 87.504 79.7306 87.504 80.832C87.504 81.5226 87.3407 82.12 87.014 82.624C86.6967 83.1186 86.2207 83.5013 85.586 83.772L88.036 88H86.23ZM83.612 82.862C84.5267 82.862 85.152 82.666 85.488 82.274C85.8334 81.8726 86.006 81.3966 86.006 80.846C86.006 79.6233 85.1894 79.012 83.556 79.012H82.618V82.862H83.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M219.457 85.0159H218.865V84.3279H219.457V83.5359C219.457 83.0559 219.572 82.6853 219.801 82.4239C220.036 82.1573 220.377 82.0239 220.825 82.0239C221.006 82.0239 221.212 82.0746 221.441 82.1759L221.273 82.9919C221.236 82.9493 221.177 82.9093 221.097 82.8719C221.022 82.8293 220.94 82.8079 220.849 82.8079C220.492 82.8079 220.31 83.0399 220.305 83.5039V84.3279H221.169V85.0159H220.305V87.9999H219.457V85.0159Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M216.23 88L214.158 84.108C213.729 84.1266 213.346 84.136 213.01 84.136H212.618V88H211.092V77.71H213.43C214.615 77.71 215.591 77.9573 216.356 78.452C217.121 78.9373 217.504 79.7306 217.504 80.832C217.504 81.5226 217.341 82.12 217.014 82.624C216.697 83.1186 216.221 83.5013 215.586 83.772L218.036 88H216.23ZM213.612 82.862C214.527 82.862 215.152 82.666 215.488 82.274C215.833 81.8726 216.006 81.3966 216.006 80.846C216.006 79.6233 215.189 79.012 213.556 79.012H212.618V82.862H213.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M89.5769 116.208L90.4809 115.952V122H89.5769V116.208Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M86.23 122L84.158 118.108C83.7287 118.127 83.346 118.136 83.01 118.136H82.618V122H81.092V111.71H83.43C84.6154 111.71 85.5907 111.957 86.356 112.452C87.1214 112.937 87.504 113.731 87.504 114.832C87.504 115.523 87.3407 116.12 87.014 116.624C86.6967 117.119 86.2207 117.501 85.586 117.772L88.036 122H86.23ZM83.612 116.862C84.5267 116.862 85.152 116.666 85.488 116.274C85.8334 115.873 86.006 115.397 86.006 114.846C86.006 113.623 85.1894 113.012 83.556 113.012H82.618V116.862H83.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <circle cx="134" cy="65" r="4.5" className={classVariant('schematics', ['fill-middle'])}/>
                            <circle cx="134" cy="99.5" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                            <circle cx="134" cy="132.5" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                            <circle cx="163" cy="132.5" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                            <circle cx="262" cy="149" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M187 183.327V114.673L250.887 149L187 183.327Z" className={classVariant('schematics', ['stroke-dark'])}/>
                            <rect x="191" y="132.531" width="10" height="2" className={classVariant('schematics', ['fill-dark'])}/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M197 159.531H195V163.531H191V165.531H195V169.531H197V165.531H201V163.531H197V159.531Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <line x1="134" y1="30" x2="134" y2="133" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="163" y1="98" x2="163" y2="133" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="262" y1="98" x2="262" y2="148" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="251" y1="149" x2="290" y2="149" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="164" y1="193" x2="180" y2="193" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="166" y1="197" x2="178" y2="197" className={classVariant('schematics', ['stroke-dark'])}/>
                            <line x1="168" y1="201" x2="176" y2="201" className={classVariant('schematics', ['stroke-dark'])}/>
                            <path d="M172 193.5L172 164.5L187 164.5" className={classVariant('schematics', ['stroke-dark'])}/>
                        </svg>
                    </div>
                    <div className="inverting-summing-op-amp__description">
                        <p>A summing amplifer is very similar to Inverting OpAmp with only one input.</p>
                        <p>A summing amplifer sums several (weighted) voltages:</p>
                        <p>
                            <math xmlns="http://www.w3.org/1998/Math/MathML">
                                <mstyle displaystyle="true">
                                    <mrow>
                                    <msub>
                                        <mi>V</mi>
                                        <mrow>
                                        <mi>o</mi>
                                        <mi>u</mi>
                                        <mi>t</mi>
                                        </mrow>
                                    </msub>
                                    <mo>=</mo>
                                    <mo>&#x2212;</mo>
                                    <msub>
                                        <mi>R</mi>
                                        <mi>f</mi>
                                    </msub>
                                    <mrow>
                                        <mo>(</mo>
                                        <mfrac>
                                        <msub>
                                            <mi>V</mi>
                                            <mn>1</mn>
                                        </msub>
                                        <msub>
                                            <mi>R</mi>
                                            <mn>1</mn>
                                        </msub>
                                        </mfrac>
                                        <mo>+</mo>
                                        <mfrac>
                                        <msub>
                                            <mi>V</mi>
                                            <mn>2</mn>
                                        </msub>
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
                                        <msub>
                                            <mi>V</mi>
                                            <mi>n</mi>
                                        </msub>
                                        <msub>
                                            <mi>R</mi>
                                            <mi>n</mi>
                                        </msub>
                                        </mfrac>
                                        <mo>)</mo>
                                    </mrow>
                                    </mrow>
                                </mstyle>
                            </math>
                        </p>
                        <dl className="inverting-summing-op-amp__definition-list">
                            <dt className="inverting-summing-op-amp__definition">
                                When <math xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mn>1</mn>
                                        </mrow>
                                        </msub>
                                        <mo>=</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mn>2</mn>
                                        </mrow>
                                        </msub>
                                        <mo>=</mo>
                                        <mo>&#x22EF;</mo>
                                        <mo>=</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mi>n</mi>
                                        </mrow>
                                        </msub>
                                    </mstyle>
                                    </math>, and <math xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mi>f</mi>
                                        </mrow>
                                        </msub>
                                    </mstyle>
                                    </math> independent
                            </dt>
                            <dd className="inverting-summing-op-amp__description">
                                <math xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <mrow>
                                        <msub>
                                            <mi>V</mi>
                                            <mrow>
                                            <mi>o</mi>
                                            <mi>u</mi>
                                            <mi>t</mi>
                                            </mrow>
                                        </msub>
                                        <mo>=</mo>
                                        <mo>&#x2212;</mo>
                                        <mfrac>
                                            <msub>
                                            <mi>R</mi>
                                            <mi>f</mi>
                                            </msub>
                                            <msub>
                                            <mi>R</mi>
                                            <mn>1</mn>
                                            </msub>
                                        </mfrac>
                                        <mrow>
                                            <mo>(</mo>
                                            <msub>
                                            <mi>V</mi>
                                            <mn>1</mn>
                                            </msub>
                                            <mo>+</mo>
                                            <msub>
                                            <mi>V</mi>
                                            <mn>2</mn>
                                            </msub>
                                            <mo>+</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>+</mo>
                                            <msub>
                                            <mi>V</mi>
                                            <mi>n</mi>
                                            </msub>
                                            <mo>)</mo>
                                        </mrow>
                                        </mrow>
                                    </mstyle>
                                </math>
                            </dd>
                            <dt className="inverting-summing-op-amp__definition">
                                When <math xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mn>1</mn>
                                        </mrow>
                                        </msub>
                                        <mo>=</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mn>2</mn>
                                        </mrow>
                                        </msub>
                                        <mo>=</mo>
                                        <mo>&#x22EF;</mo>
                                        <mo>=</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mi>n</mi>
                                        </mrow>
                                        </msub>
                                        <mo>=</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mrow>
                                            <mi>f</mi>
                                        </mrow>
                                        </msub>
                                    </mstyle>
                                </math>
                            </dt>
                            <dd className="inverting-summing-op-amp__description">
                                <math xmlns="http://www.w3.org/1998/Math/MathML">
                                    <mstyle displaystyle="true">
                                        <mrow>
                                        <msub>
                                            <mi>V</mi>
                                            <mrow>
                                            <mi>o</mi>
                                            <mi>u</mi>
                                            <mi>t</mi>
                                            </mrow>
                                        </msub>
                                        <mo>=</mo>
                                        <mo>&#x2212;</mo>
                                        <mrow>
                                            <mo>(</mo>
                                            <msub>
                                            <mi>V</mi>
                                            <mn>1</mn>
                                            </msub>
                                            <mo>+</mo>
                                            <msub>
                                            <mi>V</mi>
                                            <mn>2</mn>
                                            </msub>
                                            <mo>+</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>&#x002E;</mo>
                                            <mo>+</mo>
                                            <msub>
                                            <mi>V</mi>
                                            <mi>n</mi>
                                            </msub>
                                            <mo>)</mo>
                                        </mrow>
                                        </mrow>
                                    </mstyle>
                                </math>
                            </dd>
                        </dl>
                        <p>
                            Output is inverted
                        </p>
                        <p>
                            Input impedance of the nth input is <math xmlns="http://www.w3.org/1998/Math/MathML">
                                <mstyle displaystyle="true">
                                    <msub>
                                    <mi>Z</mi>
                                    <mrow>
                                        <mi>n</mi>
                                    </mrow>
                                    </msub>
                                    <mo>=</mo>
                                    <msub>
                                    <mi>R</mi>
                                    <mrow>
                                        <mi>n</mi>
                                    </mrow>
                                    </msub>
                                </mstyle>
                            </math> (<math xmlns="http://www.w3.org/1998/Math/MathML">
                                <mstyle displaystyle="true">
                                    <msub>
                                    <mi>V</mi>
                                    <mrow>
                                        <mo>-</mo>
                                    </mrow>
                                    </msub>
                                </mstyle>
                            </math> a virtual ground)
                        </p>
                    </div>
                </div>
            </SummaryFooter>
        </article>
    )
}
