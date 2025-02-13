import React, { useState } from 'react';
import { LabelInput, LabelOutput, Button, FormStack, FormRow } from '../elements/Form';
import ResistorSelector from './ResistorSelector';
import classVariant from '../helpers/classVariant';
import isEmpty from '../helpers/isEmpty';
import type {ChangeEvent, MouseEvent} from 'react';
import { Section } from '../elements/Section';
import './VoltageDivider.css';
import '../elements/Schematics.css';

interface Props {
}

type State = [string, string, string];

export default function VoltageDivider ({}: Props) {
                                                    //    v    r1   r2
    const [inputState, setInputState] = useState<State>(['0', '0', '0']);
    const [outputState, setOutputState] = useState('0');

    const handleVin = (event: ChangeEvent<HTMLInputElement>): void => updateState([
        event.currentTarget.value,
        inputState.at(1)!,
        inputState.at(2)!
    ]);

    const handleR1 = (event: ChangeEvent<HTMLSelectElement>): void => updateState([
        inputState.at(0)!,
        event.currentTarget.value,
        inputState.at(2)!
    ]);
    
    const handleR2 = (event: ChangeEvent<HTMLSelectElement>): void => updateState([
        inputState.at(0)!,
        inputState.at(1)!,
        event.currentTarget.value,
    ]);

    const handleSwitch = (event: MouseEvent<HTMLButtonElement>): void => updateState([
        inputState.at(0)!,
        inputState.at(2)!,
        inputState.at(1)!,
    ]);
    
    const updateState = (state: State) => {
        setInputState(state);

        const isEveryValueSet = state.every(value => !isEmpty(value));
        if (isEveryValueSet === false) return;

        const calculation = calculateVoltage(
            parseFloat(state.at(0)!), 
            parseFloat(state.at(1)!), 
            parseFloat(state.at(2)!),
        );

        if (isNaN(calculation)) {return;}

        setOutputState(calculation.toFixed(2));
    }

    const calculateVoltage = (v: number, r1: number, r2: number): number => {
        return (r2 / (r1 + r2)) * v;
    }

    return (
        <article className="voltage-divider">
            <header className="voltage-divider__header">
                <h2 className="voltage-divider__title">Voltage Divider</h2>
            </header>
            <aside className="voltage-divider__formula">
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
                        <mfrac>
                            <msub>
                            <mi>R</mi>
                            <mn>2</mn>
                            </msub>
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
            </aside>
            <aside className="voltage-divider__schematic">
                <svg width="325" height="261" viewBox="0 0 325 261" fill="none" className="schematics">
                    <circle cx="44.5" cy="29.9688" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <circle cx="234.5" cy="133" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <path d="M33.9938 30.3279H34.8418L34.8498 30.9999C34.9511 30.7759 35.1111 30.5919 35.3298 30.4479C35.5484 30.3039 35.8044 30.2319 36.0978 30.2319C36.4764 30.2319 36.7671 30.3119 36.9698 30.4719C37.1724 30.6266 37.3084 30.8453 37.3778 31.1279C37.4471 31.4106 37.4818 31.7786 37.4818 32.2319V33.9999H36.6178V32.2559C36.6178 31.7919 36.5724 31.4586 36.4818 31.2559C36.3911 31.0479 36.2044 30.9439 35.9218 30.9439C35.7618 30.9439 35.5991 30.9946 35.4338 31.0959C35.2684 31.1919 35.1298 31.3333 35.0178 31.5199C34.9111 31.7066 34.8578 31.9253 34.8578 32.1759V33.9999H33.9938V30.3279Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M31.9016 30.328H32.7976V34H31.9016V30.328ZM32.3416 29.64C32.1762 29.64 32.0376 29.584 31.9256 29.472C31.8136 29.36 31.7576 29.2213 31.7576 29.056C31.7576 28.9066 31.8136 28.7786 31.9256 28.672C32.0376 28.5653 32.1762 28.512 32.3416 28.512C32.5016 28.512 32.6376 28.5653 32.7496 28.672C32.8616 28.7786 32.9176 28.9066 32.9176 29.056C32.9176 29.2213 32.8616 29.36 32.7496 29.472C32.6429 29.584 32.5069 29.64 32.3416 29.64Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M21.776 23.71H23.554L26.634 30.78L29.728 23.71H31.492L26.746 34H26.536L21.776 23.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M261.158 137.032H260.51V136.328H261.158V134.832L262.03 134.64V136.328H262.878V137.032H262.03V140H261.158V137.032Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M257.664 140.08C257.158 140.08 256.808 139.931 256.616 139.632C256.43 139.333 256.336 138.917 256.336 138.384V136.328H257.2V138.168C257.2 138.472 257.216 138.709 257.248 138.88C257.286 139.045 257.355 139.168 257.456 139.248C257.563 139.328 257.72 139.368 257.928 139.368C258.078 139.368 258.222 139.325 258.36 139.24C258.499 139.155 258.611 139.04 258.696 138.896C258.787 138.747 258.832 138.584 258.832 138.408V136.328H259.688V140H258.984L258.888 139.464C258.755 139.672 258.587 139.827 258.384 139.928C258.187 140.029 257.947 140.08 257.664 140.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M253.55 140.08C253.171 140.08 252.835 139.995 252.542 139.824C252.248 139.653 252.022 139.421 251.862 139.128C251.702 138.835 251.622 138.509 251.622 138.152C251.622 137.8 251.699 137.477 251.854 137.184C252.014 136.891 252.24 136.659 252.534 136.488C252.827 136.317 253.166 136.232 253.55 136.232C253.934 136.232 254.27 136.317 254.558 136.488C254.851 136.659 255.075 136.891 255.23 137.184C255.39 137.477 255.47 137.8 255.47 138.152C255.47 138.509 255.39 138.835 255.23 139.128C255.07 139.421 254.843 139.653 254.55 139.824C254.262 139.995 253.928 140.08 253.55 140.08ZM253.574 139.376C253.883 139.376 254.126 139.261 254.302 139.032C254.483 138.803 254.574 138.515 254.574 138.168C254.574 137.821 254.478 137.531 254.286 137.296C254.094 137.056 253.84 136.936 253.526 136.936C253.222 136.936 252.976 137.053 252.79 137.288C252.608 137.523 252.518 137.816 252.518 138.168C252.518 138.509 252.616 138.797 252.814 139.032C253.011 139.261 253.264 139.376 253.574 139.376Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M241.776 129.71H243.554L246.634 136.78L249.728 129.71H251.492L246.746 140H246.536L241.776 129.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <line x1="125" y1="30" x2="47" y2="30" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="124" y1="133" x2="231" y2="133" className={classVariant('schematics', ['stroke-dark'])}/>
                    <path d="M108.577 79.2079L109.481 78.9519V84.9999H108.577V79.2079Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M105.23 85L103.158 81.108C102.729 81.1266 102.346 81.136 102.01 81.136H101.618V85H100.092V74.71H102.43C103.615 74.71 104.591 74.9573 105.356 75.452C106.121 75.9373 106.504 76.7306 106.504 77.832C106.504 78.5226 106.341 79.12 106.014 79.624C105.697 80.1186 105.221 80.5013 104.586 80.772L107.036 85H105.23ZM102.612 79.862C103.527 79.862 104.152 79.666 104.488 79.274C104.833 78.8726 105.006 78.3966 105.006 77.846C105.006 76.6233 104.189 76.012 102.556 76.012H101.618V79.862H102.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M110.089 190.528C110.34 190.192 110.548 189.88 110.713 189.592C110.884 189.304 110.969 189.037 110.969 188.792C110.969 188.493 110.889 188.267 110.729 188.112C110.574 187.952 110.34 187.872 110.025 187.872C109.737 187.872 109.505 187.952 109.329 188.112C109.153 188.272 109.006 188.467 108.889 188.696L108.145 188.296C108.332 187.939 108.577 187.637 108.881 187.392C109.185 187.147 109.574 187.024 110.049 187.024C110.641 187.024 111.094 187.179 111.409 187.488C111.724 187.792 111.881 188.192 111.881 188.688C111.881 189.333 111.561 190.048 110.921 190.832L109.833 192.208H112.113V193H108.113L110.089 190.528Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M105.23 193L103.158 189.108C102.729 189.127 102.346 189.136 102.01 189.136H101.618V193H100.092V182.71H102.43C103.615 182.71 104.591 182.957 105.356 183.452C106.121 183.937 106.504 184.731 106.504 185.832C106.504 186.523 106.341 187.12 106.014 187.624C105.697 188.119 105.221 188.501 104.586 188.772L107.036 193H105.23ZM102.612 187.862C103.527 187.862 104.152 187.666 104.488 187.274C104.833 186.873 105.006 186.397 105.006 185.846C105.006 184.623 104.189 184.012 102.556 184.012H101.618V187.862H102.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <circle cx="124" cy="133" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                    <line x1="124" y1="31" x2="124" y2="237" className={classVariant('schematics', ['stroke-dark'])}/>
                    <rect x="131" y="209" width="14" height="44" transform="rotate(180 131 209)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <rect x="131" y="101" width="14" height="44" transform="rotate(180 131 101)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="116" y1="238" x2="132" y2="238" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="118" y1="242" x2="130" y2="242" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="120" y1="246" x2="128" y2="246" className={classVariant('schematics', ['stroke-dark'])}/>
                </svg>
            </aside>
            <section className="voltage-divider__input">
                <Section variant={['framed', 'raised']}>
                    <FormStack>
                        <LabelInput text={<>V<sub>in</sub></>} onChange={handleVin} value={inputState.at(0)} />
                        <FormRow variants={['stretch']}>
                            <ResistorSelector text={<>R<sub>1</sub></>} 
                                onSelect={handleR1} 
                                value={inputState.at(1)} />
                            <Button onClick={handleSwitch}>switch</Button>
                            <ResistorSelector text={<>R<sub>2</sub></>} 
                                onSelect={handleR2} 
                                value={inputState.at(2)} />
                        </FormRow>
                        <LabelOutput text={<>V<sub>out</sub></>} value={outputState} readOnly />
                    </FormStack>
                </Section>
            </section>
        </article>
    )
}
