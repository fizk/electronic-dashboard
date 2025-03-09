import React, { useState } from 'react';
import { LabelInput, Button, FormStack, FormRow } from '../../elements/Form';
import { VoltageOutput, AmperOutput, ConstantOutput } from '../../elements/ValueOutput';
import { Section, type Variants } from "../../elements/Section";
import ResistorSelector from '../../elements/FixedValueInput';
import isEmpty from '../../helpers/isEmpty';
import classVariant from '../../helpers/classVariant';
import type { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { SummaryFooter } from '../../elements/SummaryFooter';
import { VoltageInput } from '../../elements/ValueInput';
import './InvertingOpAmp.css';

interface State {
    v: string
    vu: number
    rf: string
    r2: string
    o: string
    ou: number
    a: string
}

interface Props {
    variants?: Variants
    state?: State
    header?: ReactNode
}

const defaultState: State = {
    v: '10',
    vu: 1,
    rf: '0',
    r2: '0',
    o: '0',
    ou: 1,
    a: '0',
}

export default function InvertingOpAmp ({
    variants = [],
    state = defaultState,
    header
}: Props) {
    const [internalState, setInternalState] = useState(state);

    const handleVin = (value: string): void => updateState({
        ...internalState,
        v: value,
    });
    const handleVinUnit = (value: string): void => updateState({
        ...internalState,
        vu: parseFloat(value),
    });
    const handleOutUnit = (value: string): void => updateState({
        ...internalState,
        ou: parseFloat(value),
    });

    const handleRf = (event: ChangeEvent<HTMLSelectElement>): void => updateState({
        ...internalState,
        rf: event.currentTarget.value,
    });

    const handleR2 = (event: ChangeEvent<HTMLSelectElement>): void => updateState({
        ...internalState,
        r2: event.currentTarget.value,
    });

    const handleSwitch = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        updateState({
            ...internalState,
            rf: internalState.r2,
            r2: internalState.rf
        });
    }

    const invertingGainFormula = (rf: number, r2: number): number => {
		return ((rf/r2)) * -1;
	}

    const invertingOutputFormula = (v: number, a: number): number => {
		return a * v;
	}

    const updateState = (state: State) => {
        setInternalState(state);

        const isEveryValueSet = [state.v, state.rf, state.r2].every(value => !isEmpty(value));

        if (isEveryValueSet === false) return;

        const gain = invertingGainFormula(
            parseFloat(state.rf),
            parseFloat(state.r2),
        );

        const output = invertingOutputFormula(
            parseFloat(state.v) * state.vu,
            gain
        );

        setInternalState({
            ...state,
            o: String(output),
            a: String(gain)
        });
    }

    return (
        <article className="inverting-op-amp">
            {header && (
                <header>{header}</header>
            )}
            <Section variant={variants}>
                <FormStack>
                    <FormRow variants={['stretch']}>
                        <VoltageInput 
                            text={<>V<sub>in</sub></>} 
                            value={internalState.v} 
                            onValueChange={handleVin} 
                            onUnitChange={handleVinUnit} 
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <ResistorSelector text={<>R<sub>2</sub></>} 
                            onSelect={handleR2} 
                            value={internalState.r2} />
                        <Button onClick={handleSwitch}>switch</Button>
                        <ResistorSelector text={<>R<sub>f</sub></>} 
                            onSelect={handleRf} 
                            value={internalState.rf} />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <VoltageOutput text={<>V<sub>out</sub></>} 
                            value={internalState.o} 
                        />
                        <ConstantOutput text={<>A<sub>(v)</sub></>} 
                            value={internalState.a}
                            onUnitChange={handleOutUnit}
                        />
                    </FormRow>
                </FormStack>
            </Section>
            <SummaryFooter label="Description">
                <svg width="325" height="154" viewBox="0 0 325 154" fill="none">
                    <circle cx="33.5" cy="69.9688" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <circle cx="287.5" cy="86" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="157" y1="36" x2="257" y2="36" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="37" y1="70" x2="181" y2="70" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <rect x="189" y="43" width="14" height="44" transform="rotate(-90 189 43)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <rect x="69" y="77" width="14" height="44" transform="rotate(-90 69 77)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <path d="M22.9938 70.3279H23.8418L23.8498 70.9999C23.9511 70.7759 24.1111 70.5919 24.3298 70.4479C24.5484 70.3039 24.8044 70.2319 25.0978 70.2319C25.4764 70.2319 25.7671 70.3119 25.9698 70.4719C26.1724 70.6266 26.3084 70.8453 26.3778 71.1279C26.4471 71.4106 26.4818 71.7786 26.4818 72.2319V73.9999H25.6178V72.2559C25.6178 71.7919 25.5724 71.4586 25.4818 71.2559C25.3911 71.0479 25.2044 70.9439 24.9218 70.9439C24.7618 70.9439 24.5991 70.9946 24.4338 71.0959C24.2684 71.1919 24.1298 71.3333 24.0178 71.5199C23.9111 71.7066 23.8578 71.9253 23.8578 72.1759V73.9999H22.9938V70.3279Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M20.9016 70.328H21.7976V74H20.9016V70.328ZM21.3416 69.64C21.1762 69.64 21.0376 69.584 20.9256 69.472C20.8136 69.36 20.7576 69.2213 20.7576 69.056C20.7576 68.9066 20.8136 68.7786 20.9256 68.672C21.0376 68.5653 21.1762 68.512 21.3416 68.512C21.5016 68.512 21.6376 68.5653 21.7496 68.672C21.8616 68.7786 21.9176 68.9066 21.9176 69.056C21.9176 69.2213 21.8616 69.36 21.7496 69.472C21.6429 69.584 21.5069 69.64 21.3416 69.64Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M10.776 63.71H12.554L15.634 70.78L18.728 63.71H20.492L15.746 74H15.536L10.776 63.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M314.158 90.0319H313.51V89.3279H314.158V87.8319L315.03 87.6399V89.3279H315.878V90.0319H315.03V92.9999H314.158V90.0319Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M310.664 93.0799C310.158 93.0799 309.808 92.9305 309.616 92.6319C309.43 92.3332 309.336 91.9172 309.336 91.3839V89.3279H310.2V91.1679C310.2 91.4719 310.216 91.7092 310.248 91.8799C310.286 92.0452 310.355 92.1679 310.456 92.2479C310.563 92.3279 310.72 92.3679 310.928 92.3679C311.078 92.3679 311.222 92.3252 311.36 92.2399C311.499 92.1545 311.611 92.0399 311.696 91.8959C311.787 91.7465 311.832 91.5839 311.832 91.4079V89.3279H312.688V92.9999H311.984L311.888 92.4639C311.755 92.6719 311.587 92.8265 311.384 92.9279C311.187 93.0292 310.947 93.0799 310.664 93.0799Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M306.55 93.0799C306.171 93.0799 305.835 92.9946 305.542 92.8239C305.248 92.6533 305.022 92.4213 304.862 92.1279C304.702 91.8346 304.622 91.5093 304.622 91.1519C304.622 90.7999 304.699 90.4773 304.854 90.1839C305.014 89.8906 305.24 89.6586 305.534 89.4879C305.827 89.3173 306.166 89.2319 306.55 89.2319C306.934 89.2319 307.27 89.3173 307.558 89.4879C307.851 89.6586 308.075 89.8906 308.23 90.1839C308.39 90.4773 308.47 90.7999 308.47 91.1519C308.47 91.5093 308.39 91.8346 308.23 92.1279C308.07 92.4213 307.843 92.6533 307.55 92.8239C307.262 92.9946 306.928 93.0799 306.55 93.0799ZM306.574 92.3759C306.883 92.3759 307.126 92.2613 307.302 92.0319C307.483 91.8026 307.574 91.5146 307.574 91.1679C307.574 90.8213 307.478 90.5306 307.286 90.2959C307.094 90.0559 306.84 89.9359 306.526 89.9359C306.222 89.9359 305.976 90.0533 305.79 90.2879C305.608 90.5226 305.518 90.8159 305.518 91.1679C305.518 91.5093 305.616 91.7973 305.814 92.0319C306.011 92.2613 306.264 92.3759 306.574 92.3759Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M294.776 82.71H296.554L299.634 89.78L302.728 82.71H304.492L299.746 93H299.536L294.776 82.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M213.457 22.0159H212.865V21.3279H213.457V20.5359C213.457 20.0559 213.572 19.6853 213.801 19.4239C214.036 19.1573 214.377 19.0239 214.825 19.0239C215.006 19.0239 215.212 19.0746 215.441 19.1759L215.273 19.9919C215.236 19.9493 215.177 19.9093 215.097 19.8719C215.022 19.8293 214.94 19.8079 214.849 19.8079C214.492 19.8079 214.31 20.0399 214.305 20.5039V21.3279H215.169V22.0159H214.305V24.9999H213.457V22.0159Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M210.23 25L208.158 21.108C207.729 21.1266 207.346 21.136 207.01 21.136H206.618V25H205.092V14.71H207.43C208.615 14.71 209.591 14.9573 210.356 15.452C211.121 15.9373 211.504 16.7306 211.504 17.832C211.504 18.5226 211.341 19.12 211.014 19.624C210.697 20.1186 210.221 20.5013 209.586 20.772L212.036 25H210.23ZM207.612 19.862C208.527 19.862 209.152 19.666 209.488 19.274C209.833 18.8726 210.006 18.3966 210.006 17.846C210.006 16.6233 209.189 16.012 207.556 16.012H206.618V19.862H207.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M93.5769 53.2079L94.4809 52.9519V58.9999H93.5769V53.2079Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M90.23 59L88.158 55.108C87.7287 55.1266 87.346 55.136 87.01 55.136H86.618V59H85.092V48.71H87.43C88.6154 48.71 89.5907 48.9573 90.356 49.452C91.1214 49.9373 91.504 50.7306 91.504 51.832C91.504 52.5226 91.3407 53.12 91.014 53.624C90.6967 54.1186 90.2207 54.5013 89.586 54.772L92.036 59H90.23ZM87.612 53.862C88.5267 53.862 89.152 53.666 89.488 53.274C89.8334 52.8726 90.006 52.3966 90.006 51.846C90.006 50.6233 89.1894 50.012 87.556 50.012H86.618V53.862H87.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <circle cx="157" cy="70" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                    <circle cx="256" cy="86" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M181 120.327V51.6725L244.887 86L181 120.327Z" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <rect x="185" y="69.5312" width="10" height="2" className={classVariant('schematics', ['fill-dark'])}/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M191 96.5312H189V100.531H185V102.531H189V106.531H191V102.531H195V100.531H191V96.5312Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <line x1="157" y1="35" x2="157" y2="70" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="256" y1="35" x2="256" y2="85" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="245" y1="86" x2="284" y2="86" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="149" y1="135.5" x2="165" y2="135.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="151" y1="139.5" x2="163" y2="139.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="153" y1="143.5" x2="161" y2="143.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <path d="M157 102L157 136" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="181" y1="103" x2="157" y2="103" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                </svg>
                <p>
                    <math xmlns="http://www.w3.org/1998/Math/MathML">
                        <mstyle displaystyle="true">
                            <mrow>
                            <msub>
                                <mi>A</mi>
                                <mi>v</mi>
                            </msub>
                            <mo>=</mo>
                            <mo>&#x2212;</mo>
                            <mrow>
                                <mo>(</mo>
                                <mfrac>
                                <msub>
                                    <mi>R</mi>
                                    <mi>f</mi>
                                </msub>
                                <msub>
                                    <mi>R</mi>
                                    <mn>2</mn>
                                </msub>
                                </mfrac>
                                <mo>)</mo>
                            </mrow>
                            </mrow>
                        </mstyle>
                    </math>
                </p>
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
                            <msub>
                                <mi>A</mi>
                                <mi>v</mi>
                            </msub>
                            <mo>&#x00D7;</mo>
                            <msub>
                                <mi>V</mi>
                                <mrow>
                                <mi>i</mi>
                                <mi>n</mi>
                                </mrow>
                            </msub>
                            </mrow>
                        </mstyle>
                    </math>
                </p>
                <p>
                    An inverting amplifier uses negative feedback to invert and amplify a voltage. The <math xmlns="http://www.w3.org/1998/Math/MathML">
                        <mstyle displaystyle="true">
                            <msub>
                            <mi>R</mi>
                            <mrow>
                                <mi>f</mi>
                            </mrow>
                            </msub>
                        </mstyle>
                        </math> resistor allows some of 
                    the output signal to be returned to the input. Since the output is 180° out of phase, this amount is effectively 
                    subtracted from the input, thereby reducing the input into the operational amplifier. This increases the overall 
                    gain of the amplifier and is dubbed negative feedback
                </p>
                <p>
                    <math xmlns="http://www.w3.org/1998/Math/MathML">
                        <mstyle displaystyle="true">
                            <msub>
                            <mi>Z</mi>
                            <mrow>
                                <mo>in</mo>
                            </mrow>
                            </msub>
                            <mo>=</mo>
                            <msub>
                            <mi>R</mi>
                            <mrow>
                                <mo>in</mo>
                            </mrow>
                            </msub>
                        </mstyle>
                    </math> (because <math xmlns="http://www.w3.org/1998/Math/MathML"><mstyle displaystyle="true"><msub><mi>V</mi><mrow><mo>-</mo></mrow></msub></mstyle></math> is a virtual ground)
                </p>
                <p>
                    A third resistor, of value <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <mstyle displaystyle="true">
                        <mrow>
                        <msub>
                            <mi>R</mi>
                            <mrow>
                            <mi>f</mi>
                            <mo>&#x2225;</mo>
                            </mrow>
                        </msub>
                        <msub>
                            <mi>R</mi>
                            <mrow>
                            <mi>i</mi>
                            <mi>n</mi>
                            </mrow>
                        </msub>
                        <mo>&#x225C;</mo>
                        <mfrac>
                            <mrow>
                            <msub>
                                <mi>R</mi>
                                <mi>f</mi>
                            </msub>
                            <mo>&#x00D7;</mo>
                            <msub>
                                <mi>R</mi>
                                <mrow>
                                <mi>i</mi>
                                <mi>n</mi>
                                </mrow>
                            </msub>
                            </mrow>
                            <mrow>
                            <msub>
                                <mi>R</mi>
                                <mi>f</mi>
                            </msub>
                            <mo>+</mo>
                            <msub>
                                <mi>R</mi>
                                <mrow>
                                <mi>i</mi>
                                <mi>n</mi>
                                </mrow>
                            </msub>
                            </mrow>
                        </mfrac>
                        </mrow>
                    </mstyle>
                    </math>, added between the non-inverting input and ground, while not necessary, minimizes errors due to input bias currents.
                </p>
                <a href="https://en.wikibooks.org/wiki/Electronics/Electronics_Formulas/Op_Amp_Configurations">wikibooks.org</a>
            </SummaryFooter>
        </article>
    )
}
