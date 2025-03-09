import React, { useState } from 'react';
import {LabelInput, Button, FormStack, FormRow} from '../../elements/Form';
import { VoltageOutput, AmperOutput } from '../../elements/ValueOutput';
import { Section } from "../../elements/Section";
import type {ChangeEvent, MouseEvent} from 'react';
import ResistorSelector from '../../elements/FixedValueInput';
import isEmpty from '../../helpers/isEmpty';
import classVariant from '../../helpers/classVariant';
import './NonInvertingOpAmp.css';

interface Props {
}

type State = [string, string, string];

export default function NonInvertingOpAmp ({}: Props) {
                                            //     v   rf   r2
    const [inputState, setInputState] = useState<State>(['0', '0', '0']);
    const [outputState, setOutputState] = useState('0');
    const [gainState, setGainState] = useState('0');

    const handleVin = (event: ChangeEvent<HTMLInputElement>) => updateState([
        event.currentTarget.value,
        inputState.at(1)!,
        inputState.at(2)!,
    ]);
    
    const handleR1 = (event: ChangeEvent<HTMLSelectElement>) => updateState([
        inputState.at(0)!,
        event.currentTarget.value,
        inputState.at(2)!,
    ]);
    
    const handleR2 = (event: ChangeEvent<HTMLSelectElement>) => updateState([
        inputState.at(0)!,
        inputState.at(1)!,
        event.currentTarget.value,
    ]);

    const handleSwitch = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        updateState([
            inputState.at(0)!,
            inputState.at(2)!,
            inputState.at(1)!,
        ]);
    }

    const updateState = (state: State) => {
        setInputState(state);

        const isEveryValueSet = state.every(value => !isEmpty(value));
        if (isEveryValueSet === false) return;

        const gain = nonInvertingGainFormula(
            parseFloat(state.at(1)!),
            parseFloat(state.at(2)!),
        );
        const output = nonInvertingOutputFormula(
            parseFloat(state.at(0)!), 
            gain
        );
        setGainState(gain.toFixed(2));
        setOutputState(output.toFixed(2));
        
    }

    const nonInvertingGainFormula = (rf: number, r2: number) => {
		return (1 + (rf/r2));
	}

    const nonInvertingOutputFormula = (v: number, a: number) => {
		return a * v;
	}

    return (
        <>
            <section className="non-inverting-op-amp__input">
                <Section variant={['framed', 'raised']}>
                    <FormStack>
                        <FormRow variants={['stretch']}>
                            <LabelInput text={<>V<sub>in</sub></>} 
                                onChange={handleVin} 
                                type="number"
                                value={inputState.at(0)} />
                        </FormRow>
                        <FormRow variants={['stretch']}>
                            <ResistorSelector text={<>R<sub>1</sub></>} 
                                onSelect={handleR2} 
                                value={inputState.at(2)} />
                            <Button onClick={handleSwitch}>switch</Button>
                            <ResistorSelector text={<>R<sub>2</sub></>} 
                                onSelect={handleR1} 
                                value={inputState.at(1)} />
                        </FormRow>
                        <FormRow variants={['stretch']}>
                            <VoltageOutput text={<>V<sub>out</sub></>} value={outputState} />
                            <AmperOutput text={<>A<sub>(v)</sub></>} value={gainState} />
                        </FormRow>
                    </FormStack>
                </Section>
            </section>
            <section className="non-inverting-op-amp__schematic">
                <svg width="325" height="154" viewBox="0 0 325 154" fill="none" className="schematics">
                    <circle cx="48.5" cy="102.969" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <circle cx="287.5" cy="86" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="47" y1="36" x2="257" y2="36" className={classVariant('schematics', ['stroke-dark'])}/>
                    <rect x="189" y="43" width="14" height="44" transform="rotate(-90 189 43)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <rect x="69" y="43" width="14" height="44" transform="rotate(-90 69 43)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <path d="M37.9938 103.328H38.8418L38.8498 104C38.9511 103.776 39.1111 103.592 39.3298 103.448C39.5484 103.304 39.8044 103.232 40.0978 103.232C40.4764 103.232 40.7671 103.312 40.9698 103.472C41.1724 103.627 41.3084 103.845 41.3778 104.128C41.4471 104.411 41.4818 104.779 41.4818 105.232V107H40.6178V105.256C40.6178 104.792 40.5724 104.459 40.4818 104.256C40.3911 104.048 40.2044 103.944 39.9218 103.944C39.7618 103.944 39.5991 103.995 39.4338 104.096C39.2684 104.192 39.1298 104.333 39.0178 104.52C38.9111 104.707 38.8578 104.925 38.8578 105.176V107H37.9938V103.328Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M35.9016 103.328H36.7976V107H35.9016V103.328ZM36.3416 102.64C36.1762 102.64 36.0376 102.584 35.9256 102.472C35.8136 102.36 35.7576 102.221 35.7576 102.056C35.7576 101.907 35.8136 101.779 35.9256 101.672C36.0376 101.565 36.1762 101.512 36.3416 101.512C36.5016 101.512 36.6376 101.565 36.7496 101.672C36.8616 101.779 36.9176 101.907 36.9176 102.056C36.9176 102.221 36.8616 102.36 36.7496 102.472C36.6429 102.584 36.5069 102.64 36.3416 102.64Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M25.776 96.71H27.554L30.634 103.78L33.728 96.71H35.492L30.746 107H30.536L25.776 96.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M314.158 90.032H313.51V89.328H314.158V87.832L315.03 87.64V89.328H315.878V90.032H315.03V93H314.158V90.032Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M310.664 93.08C310.158 93.08 309.808 92.9307 309.616 92.632C309.43 92.3333 309.336 91.9173 309.336 91.384V89.328H310.2V91.168C310.2 91.472 310.216 91.7093 310.248 91.88C310.286 92.0453 310.355 92.168 310.456 92.248C310.563 92.328 310.72 92.368 310.928 92.368C311.078 92.368 311.222 92.3253 311.36 92.24C311.499 92.1547 311.611 92.04 311.696 91.896C311.787 91.7467 311.832 91.584 311.832 91.408V89.328H312.688V93H311.984L311.888 92.464C311.755 92.672 311.587 92.8267 311.384 92.928C311.187 93.0293 310.947 93.08 310.664 93.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M306.55 93.0799C306.171 93.0799 305.835 92.9946 305.542 92.8239C305.248 92.6533 305.022 92.4213 304.862 92.1279C304.702 91.8346 304.622 91.5093 304.622 91.1519C304.622 90.7999 304.699 90.4773 304.854 90.1839C305.014 89.8906 305.24 89.6586 305.534 89.4879C305.827 89.3173 306.166 89.2319 306.55 89.2319C306.934 89.2319 307.27 89.3173 307.558 89.4879C307.851 89.6586 308.075 89.8906 308.23 90.1839C308.39 90.4773 308.47 90.7999 308.47 91.1519C308.47 91.5093 308.39 91.8346 308.23 92.1279C308.07 92.4213 307.843 92.6533 307.55 92.8239C307.262 92.9946 306.928 93.0799 306.55 93.0799ZM306.574 92.3759C306.883 92.3759 307.126 92.2613 307.302 92.0319C307.483 91.8026 307.574 91.5146 307.574 91.1679C307.574 90.8213 307.478 90.5306 307.286 90.2959C307.094 90.0559 306.84 89.9359 306.526 89.9359C306.222 89.9359 305.976 90.0533 305.79 90.2879C305.608 90.5226 305.518 90.8159 305.518 91.1679C305.518 91.5093 305.616 91.7973 305.814 92.0319C306.011 92.2613 306.264 92.3759 306.574 92.3759Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M294.776 82.71H296.554L299.634 89.78L302.728 82.71H304.492L299.746 93H299.536L294.776 82.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M215.089 22.5279C215.34 22.1919 215.548 21.8799 215.713 21.5919C215.884 21.3039 215.969 21.0373 215.969 20.7919C215.969 20.4933 215.889 20.2666 215.729 20.1119C215.574 19.9519 215.34 19.8719 215.025 19.8719C214.737 19.8719 214.505 19.9519 214.329 20.1119C214.153 20.2719 214.006 20.4666 213.889 20.6959L213.145 20.2959C213.332 19.9386 213.577 19.6373 213.881 19.3919C214.185 19.1466 214.574 19.0239 215.049 19.0239C215.641 19.0239 216.094 19.1786 216.409 19.4879C216.724 19.7919 216.881 20.1919 216.881 20.6879C216.881 21.3333 216.561 22.0479 215.921 22.8319L214.833 24.2079H217.113V24.9999H213.113L215.089 22.5279Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M210.23 25L208.158 21.108C207.729 21.1266 207.346 21.136 207.01 21.136H206.618V25H205.092V14.71H207.43C208.615 14.71 209.591 14.9573 210.356 15.452C211.121 15.9373 211.504 16.7306 211.504 17.832C211.504 18.5226 211.341 19.12 211.014 19.624C210.697 20.1186 210.221 20.5013 209.586 20.772L212.036 25H210.23ZM207.612 19.862C208.527 19.862 209.152 19.666 209.488 19.274C209.833 18.8726 210.006 18.3966 210.006 17.846C210.006 16.6233 209.189 16.012 207.556 16.012H206.618V19.862H207.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M93.5769 19.2079L94.4809 18.9519V24.9999H93.5769V19.2079Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M90.23 25L88.158 21.108C87.7287 21.1266 87.346 21.136 87.01 21.136H86.618V25H85.092V14.71H87.43C88.6154 14.71 89.5907 14.9573 90.356 15.452C91.1214 15.9373 91.504 16.7306 91.504 17.832C91.504 18.5226 91.3407 19.12 91.014 19.624C90.6967 20.1186 90.2207 20.5013 89.586 20.772L92.036 25H90.23ZM87.612 19.862C88.5267 19.862 89.152 19.666 89.488 19.274C89.8334 18.8726 90.006 18.3966 90.006 17.846C90.006 16.6233 89.1894 16.012 87.556 16.012H86.618V19.862H87.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <circle cx="157" cy="36" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                    <circle cx="256" cy="86" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M181 120.327V51.6725L244.887 86L181 120.327Z" className={classVariant('schematics', ['stroke-dark'])}/>
                    <rect x="185" y="69.5312" width="10" height="2" className={classVariant('schematics', ['fill-dark'])}/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M191 96.5312H189V100.531H185V102.531H189V106.531H191V102.531H195V100.531H191V96.5312Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <line x1="157" y1="35" x2="157" y2="70" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="256" y1="35" x2="256" y2="85" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="245" y1="86" x2="284" y2="86" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="40" y1="68.5" x2="56" y2="68.5" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="42" y1="72.5" x2="54" y2="72.5" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="44" y1="76.5" x2="52" y2="76.5" className={classVariant('schematics', ['stroke-dark'])}/>
                    <path d="M48 35L48 69" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="181" y1="103" x2="51" y2="103" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="157" y1="69" x2="180" y2="69" className={classVariant('schematics', ['stroke-dark'])}/>
                </svg>
                
            </section>
            <section className="non-inverting-op-amp__formula">
                <p>
                    <math xmlns="http://www.w3.org/1998/Math/MathML">
                        <mstyle displaystyle="true">
                            <mrow>
                            <msub>
                                <mi>A</mi>
                                <mi>v</mi>
                            </msub>
                            <mo>=</mo>
                            <mn>1</mn>
                            <mo>+</mo>
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
                                <mrow class="MJX-TeXAtom-ORD">
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
                            <mo>×</mo>
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
            </section>
            <section className="non-inverting-op-amp__description">
                <p>
                    Input impedance <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <mstyle displaystyle="true">
                        <mrow>
                        <msub>
                            <mi>Z</mi>
                            <mrow>
                            <mi>i</mi>
                            <mi>n</mi>
                            </mrow>
                        </msub>
                        <mo>&#x2248;</mo>
                        <mi mathvariant="normal">&#x221E;</mi>
                        </mrow>
                    </mstyle>
                    </math>
                </p>
                <p>
                    The input impedance is at least the impedance between non-inverting (+) and inverting (−) inputs, which is typically 1 MΩ to 10 TΩ, 
                    plus the impedance of the path from the inverting (−) input to ground (i.e., R<sub>1</sub> in parallel with R<sub>2</sub>). 
                    Because negative feedback ensures that the non-inverting and inverting inputs match, the input impedance is actually much higher.
                </p>
                <p>
                    Although this circuit has a large input impedance, it suffers from error of input bias current.
                </p>
                <p>
                    The non-inverting (+) and inverting (−) inputs draw small leakage currents into the operational amplifier.
                </p>
                <p>
                    These input currents generate voltages that act like unmodeled input offsets. These unmodeled effects can lead to noise on the output (e.g., offsets or drift).
                </p>
                <p>
                    Assuming that the two leaking currents are matched, their effect can be mitigated by ensuring the DC impedance looking out of each input is the same.
                </p>
                <p>
                    The voltage produced by each bias current is equal to the product of the bias current with the equivalent DC impedance looking out of each input. 
                    Making those impedances equal makes the offset voltage at each input equal, and so the non-zero bias currents will have no impact on the difference 
                    between the two inputs.
                </p>
                <p>
                    A resistor of value <math xmlns="http://www.w3.org/1998/Math/MathML">
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
                            <mo>&#x225C;</mo>
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
                                <mo>)</mo>
                                </mrow>
                                <mrow>
                                <mo>&#x2212;</mo>
                                <mn>1</mn>
                                </mrow>
                            </msup>
                            <mo>=</mo>
                            <mfrac>
                                <mrow>
                                <msub>
                                    <mi>R</mi>
                                    <mn>1</mn>
                                </msub>
                                <mo>&#x00D7;</mo>
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
                            </mrow>
                        </mstyle>
                        </math> which is the equivalent resistance of R<sub>1</sub> in parallel with 
                    R<sub>2</sub>, between the V<sub>in</sub> source and the non-inverting (+) input 
                    will ensure the impedances looking out of each input will be matched.
                </p>
                <p>
                    The matched bias currents will then generate matched offset voltages, and their effect will be 
                    hidden to the operational amplifier (which acts on the difference between its inputs) so long as the CMRR is good.
                </p>
                <p>
                    Very often, the input currents are not matched.
                </p>
                <p>
                    Most operational amplifiers provide some method of balancing the two input currents (e.g., by way of an external potentiometer).
                </p>
                <p>
                    Alternatively, an external offset can be added to the operational amplifier input to nullify the effect.
                </p>
                <p>
                    Another solution is to insert a variable resistor between the 
                    V<sub>in</sub> source and the non-inverting (+) input. The resistance can be tuned until the offset voltages at each input are matched.
                </p>
                <p>
                    Operational amplifiers with MOSFET-based input stages have input currents that are so small that they often can be neglected.
                </p>
            </section>
        </>
    )
}
