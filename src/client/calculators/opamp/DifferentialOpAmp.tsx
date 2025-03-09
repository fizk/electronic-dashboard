import React, { ChangeEvent, ReactNode, useState } from "react";
import ResistorSelector from "../../elements/FixedValueInput";
import { FormRow, FormStack } from "../../elements/Form";
import { VoltageOutput } from "../../elements/ValueOutput";
import { Section, type Variants } from "../../elements/Section";
import { VoltageInput } from "../../elements/ValueInput";
import isEmpty from '../../helpers/isEmpty';
import classVariant from '../../helpers/classVariant';
import { SummaryFooter } from "../../elements/SummaryFooter";
import './DifferentialOpAmp.css';

interface State {
    r1: string
    r2: string
    rf: string
    rg: string
    v1: string
    v2: string
    vu1: number
    vu2: number
    o: string
    ou: number
}

interface Props {
    state?: State
    variants?: Variants
    header?: ReactNode
    open?: boolean
}

const defaultState = {
    r1: '0',
    r2: '0',
    rf: '0',
    rg: '0',
    v1: '0',
    v2: '0',
    vu1: 1,
    vu2: 1,
    o: '0',
    ou: 0,
}

export default function DifferentialOpAmp ({
    state = defaultState,
    variants = [],
    open = false,
    header
}: Props) {

    const [internalState, setInternalState] = useState<State>(state);

    const handleR1Change = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        ...internalState,
        r1: event.currentTarget.value,
    });

    const handleR2Change = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        ...internalState,
        r2: event.currentTarget.value,
    });

    const handleRfChange = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        ...internalState,
        rf: event.currentTarget.value,
    });

    const handleRgChange = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        ...internalState,
        rg: event.currentTarget.value,
    });

    const handleV1ValueChange = (value: string): void => updateState({
        ...internalState,
        v1: value,
    });
    const handleV1UnitChange = (value: string): void => updateState({
        ...internalState,
        vu1: parseFloat(value),
    });

    const handleV2ValueChange = (value: string) => updateState({
        ...internalState,
        v2: value,
    });
    const handleV2UnitChange = (value: string) => updateState({
        ...internalState,
        vu2: parseFloat(value),
    });
    const handleOutputUnitChange = (value: string) => updateState({
        ...internalState,
        ou: parseFloat(value),
    });

    const updateState = (state: State) => {
        setInternalState(state);

        const isEveryValueSet = [state.r1, state.r2, state.rf, state.rg, state.v1, state.v2]
            .every(value => !isEmpty(value));
        if (isEveryValueSet === false) return;

        const outcome = calculate(
            parseFloat(state.r1),
            parseFloat(state.r2),
            parseFloat(state.rf),
            parseFloat(state.rg),
            parseFloat(state.v1) * state.vu1,
            parseFloat(state.v2) * state.vu2,
        );

        setInternalState({
            ...state,
            o: String(outcome / state.ou)
        });
    }

    const calculate = (r1: number, r2: number, rf: number, rg: number, v1: number, v2: number): number => {
        return ((((rf + r1) * rg) / ((rg + r2) * r1)) * v2) - ((rf/r1) * v1);
    }

    return (
        <article className="differential-op-amp">
            {header && (
                <header className="differential-op-amp__header">
                    {header}
                </header>
            )}
            <Section variant={variants}>
                <FormStack>
                    <FormRow variants={['stretch']}>
                        <VoltageInput text={<>V<sub>1</sub></>} 
                            onValueChange={handleV1ValueChange} 
                            onUnitChange={handleV1UnitChange}
                            value={internalState.v1}
                            unit={internalState.vu1}
                        />
                        <ResistorSelector onSelect={handleR1Change} 
                            text={<>R<sub>1</sub></>} 
                            value={internalState.r1} 
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <VoltageInput text={<>V<sub>2</sub></>} 
                            onValueChange={handleV2ValueChange} 
                            onUnitChange={handleV2UnitChange}
                            value={internalState.v2} 
                            unit={internalState.vu2} 
                        />
                        <ResistorSelector onSelect={handleR2Change} 
                            text={<>R<sub>2</sub></>} 
                            value={internalState.r2} 
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <ResistorSelector onSelect={handleRfChange} 
                            text={<>R<sub>f</sub></>} 
                            value={internalState.rf} 
                        />
                        <ResistorSelector onSelect={handleRgChange} 
                            text={<>R<sub>g</sub></>} 
                            value={internalState.rg} 
                        />
                    </FormRow>
                    <VoltageOutput 
                        text={<>V<sub>out</sub></>} 
                        value={internalState.o}
                        unit={internalState.ou}
                        onUnitChange={handleOutputUnitChange}
                    />
                </FormStack>
            </Section>
            <SummaryFooter label="Description" open={open}>
                <div className="differential-op-amp__description">
                    <div className="differential-op-amp__diagram">
                        <svg fill="none" height="207" viewBox="0 0 325 207" width="325" className="schematics">
                            <circle cx="36.5" cy="72.9688" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <circle cx="36.5" cy="104.969" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <circle cx="290.5" cy="89" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="160" x2="260" y1="39" y2="39"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="40" x2="184" y1="73" y2="73"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="40" x2="184" y1="105" y2="105"/>
                            <rect height="44" className={classVariant('schematics', ['stroke-dark', 'fill-light'])} transform="rotate(-90 192 46)" width="14" x="192" y="46"/>
                            <rect height="44" className={classVariant('schematics', ['stroke-dark', 'fill-light'] )} transform="rotate(-90 72 80)" width="14" x="72" y="80"/>
                            <rect height="44" className={classVariant('schematics', ['stroke-dark', 'fill-light'])} transform="rotate(-90 72 112)" width="14" x="72" y="112"/>
                            <path d="M24.3015 71.2079L25.2055 70.9519V76.9999H24.3015V71.2079Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M13.776 66.71H15.554L18.634 73.78L21.728 66.71H23.492L18.746 77H18.536L13.776 66.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M25.8135 106.528C26.0642 106.192 26.2722 105.88 26.4375 105.592C26.6082 105.304 26.6935 105.037 26.6935 104.792C26.6935 104.493 26.6135 104.267 26.4535 104.112C26.2989 103.952 26.0642 103.872 25.7495 103.872C25.4615 103.872 25.2295 103.952 25.0535 104.112C24.8775 104.272 24.7309 104.467 24.6135 104.696L23.8695 104.296C24.0562 103.939 24.3015 103.637 24.6055 103.392C24.9095 103.147 25.2989 103.024 25.7735 103.024C26.3655 103.024 26.8189 103.179 27.1335 103.488C27.4482 103.792 27.6055 104.192 27.6055 104.688C27.6055 105.333 27.2855 106.048 26.6455 106.832L25.5575 108.208H27.8375V109H23.8375L25.8135 106.528Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M13.776 98.71H15.554L18.634 105.78L21.728 98.71H23.492L18.746 109H18.536L13.776 98.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M317.158 93.0319H316.51V92.3279H317.158V90.8319L318.03 90.6399V92.3279H318.878V93.0319H318.03V95.9999H317.158V93.0319Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M313.664 96.0799C313.158 96.0799 312.808 95.9305 312.616 95.6319C312.43 95.3332 312.336 94.9172 312.336 94.3839V92.3279H313.2V94.1679C313.2 94.4719 313.216 94.7092 313.248 94.8799C313.286 95.0452 313.355 95.1679 313.456 95.2479C313.563 95.3279 313.72 95.3679 313.928 95.3679C314.078 95.3679 314.222 95.3252 314.36 95.2399C314.499 95.1545 314.611 95.0399 314.696 94.8959C314.787 94.7465 314.832 94.5839 314.832 94.4079V92.3279H315.688V95.9999H314.984L314.888 95.4639C314.755 95.6719 314.587 95.8265 314.384 95.9279C314.187 96.0292 313.947 96.0799 313.664 96.0799Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M309.55 96.0799C309.171 96.0799 308.835 95.9946 308.542 95.8239C308.248 95.6533 308.022 95.4213 307.862 95.1279C307.702 94.8346 307.622 94.5093 307.622 94.1519C307.622 93.7999 307.699 93.4773 307.854 93.1839C308.014 92.8906 308.24 92.6586 308.534 92.4879C308.827 92.3173 309.166 92.2319 309.55 92.2319C309.934 92.2319 310.27 92.3173 310.558 92.4879C310.851 92.6586 311.075 92.8906 311.23 93.1839C311.39 93.4773 311.47 93.7999 311.47 94.1519C311.47 94.5093 311.39 94.8346 311.23 95.1279C311.07 95.4213 310.843 95.6533 310.55 95.8239C310.262 95.9946 309.928 96.0799 309.55 96.0799ZM309.574 95.3759C309.883 95.3759 310.126 95.2613 310.302 95.0319C310.483 94.8026 310.574 94.5146 310.574 94.1679C310.574 93.8213 310.478 93.5306 310.286 93.2959C310.094 93.0559 309.84 92.9359 309.526 92.9359C309.222 92.9359 308.976 93.0533 308.79 93.2879C308.608 93.5226 308.518 93.8159 308.518 94.1679C308.518 94.5093 308.616 94.7973 308.814 95.0319C309.011 95.2613 309.264 95.3759 309.574 95.3759Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M297.776 85.71H299.554L302.634 92.78L305.728 85.71H307.492L302.746 96H302.536L297.776 85.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M216.457 25.0159H215.865V24.3279H216.457V23.5359C216.457 23.0559 216.572 22.6853 216.801 22.4239C217.036 22.1573 217.377 22.0239 217.825 22.0239C218.006 22.0239 218.212 22.0746 218.441 22.1759L218.273 22.9919C218.236 22.9493 218.177 22.9093 218.097 22.8719C218.022 22.8293 217.94 22.8079 217.849 22.8079C217.492 22.8079 217.31 23.0399 217.305 23.5039V24.3279H218.169V25.0159H217.305V27.9999H216.457V25.0159Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M213.23 28L211.158 24.108C210.729 24.1266 210.346 24.136 210.01 24.136H209.618V28H208.092V17.71H210.43C211.615 17.71 212.591 17.9573 213.356 18.452C214.121 18.9373 214.504 19.7306 214.504 20.832C214.504 21.5226 214.341 22.12 214.014 22.624C213.697 23.1186 213.221 23.5013 212.586 23.772L215.036 28H213.23ZM210.612 22.862C211.527 22.862 212.152 22.666 212.488 22.274C212.833 21.8726 213.006 21.3966 213.006 20.846C213.006 19.6233 212.189 19.012 210.556 19.012H209.618V22.862H210.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M182.897 155.92C182.625 155.92 182.356 155.883 182.089 155.808C181.828 155.733 181.641 155.664 181.529 155.6L181.721 154.8C182.073 155.029 182.457 155.144 182.873 155.144C183.193 155.144 183.462 155.067 183.681 154.912C183.9 154.757 184.012 154.456 184.017 154.008V153.352C183.905 153.56 183.724 153.733 183.473 153.872C183.222 154.011 182.945 154.08 182.641 154.08C182.321 154.08 182.028 154.003 181.761 153.848C181.494 153.688 181.284 153.461 181.129 153.168C180.974 152.875 180.897 152.533 180.897 152.144C180.897 151.771 180.969 151.44 181.113 151.152C181.262 150.859 181.473 150.632 181.745 150.472C182.017 150.312 182.334 150.232 182.697 150.232C182.91 150.232 183.11 150.269 183.297 150.344C183.484 150.419 183.641 150.512 183.769 150.624C183.902 150.731 183.99 150.837 184.033 150.944L184.049 150.328H184.865V153.976C184.865 154.6 184.705 155.08 184.385 155.416C184.065 155.752 183.569 155.92 182.897 155.92ZM182.881 153.352C183.185 153.352 183.441 153.248 183.649 153.04C183.857 152.827 183.961 152.549 183.961 152.208V152.152C183.961 151.923 183.913 151.717 183.817 151.536C183.721 151.355 183.59 151.213 183.425 151.112C183.26 151.011 183.078 150.96 182.881 150.96C182.54 150.96 182.276 151.072 182.089 151.296C181.902 151.515 181.809 151.8 181.809 152.152C181.809 152.509 181.9 152.8 182.081 153.024C182.268 153.243 182.534 153.352 182.881 153.352Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M178.23 154L176.158 150.108C175.729 150.127 175.346 150.136 175.01 150.136H174.618V154H173.092V143.71H175.43C176.615 143.71 177.591 143.957 178.356 144.452C179.121 144.937 179.504 145.731 179.504 146.832C179.504 147.523 179.341 148.12 179.014 148.624C178.697 149.119 178.221 149.501 177.586 149.772L180.036 154H178.23ZM175.612 148.862C176.527 148.862 177.152 148.666 177.488 148.274C177.833 147.873 178.006 147.397 178.006 146.846C178.006 145.623 177.189 145.012 175.556 145.012H174.618V148.862H175.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M96.5769 56.2079L97.4809 55.9519V61.9999H96.5769V56.2079Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M93.23 62L91.158 58.108C90.7287 58.1266 90.346 58.136 90.01 58.136H89.618V62H88.092V51.71H90.43C91.6154 51.71 92.5907 51.9573 93.356 52.452C94.1214 52.9373 94.504 53.7306 94.504 54.832C94.504 55.5226 94.3407 56.12 94.014 56.624C93.6967 57.1186 93.2207 57.5013 92.586 57.772L95.036 62H93.23ZM90.612 56.862C91.5267 56.862 92.152 56.666 92.488 56.274C92.8334 55.8726 93.006 55.3966 93.006 54.846C93.006 53.6233 92.1894 53.012 90.556 53.012H89.618V56.862H90.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M98.0889 91.5279C98.3396 91.1919 98.5476 90.8799 98.7129 90.5919C98.8836 90.3039 98.9689 90.0373 98.9689 89.7919C98.9689 89.4933 98.8889 89.2666 98.7289 89.1119C98.5742 88.9519 98.3396 88.8719 98.0249 88.8719C97.7369 88.8719 97.5049 88.9519 97.3289 89.1119C97.1529 89.2719 97.0062 89.4666 96.8889 89.6959L96.1449 89.2959C96.3316 88.9386 96.5769 88.6373 96.8809 88.3919C97.1849 88.1466 97.5742 88.0239 98.0489 88.0239C98.6409 88.0239 99.0942 88.1786 99.4089 88.4879C99.7236 88.7919 99.8809 89.1919 99.8809 89.6879C99.8809 90.3333 99.5609 91.0479 98.9209 91.8319L97.8329 93.2079H100.113V93.9999H96.1129L98.0889 91.5279Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <path d="M93.23 94L91.158 90.108C90.7287 90.1266 90.346 90.136 90.01 90.136H89.618V94H88.092V83.71H90.43C91.6154 83.71 92.5907 83.9573 93.356 84.452C94.1214 84.9373 94.504 85.7306 94.504 86.832C94.504 87.5226 94.3407 88.12 94.014 88.624C93.6967 89.1186 93.2207 89.5013 92.586 89.772L95.036 94H93.23ZM90.612 88.862C91.5267 88.862 92.152 88.666 92.488 88.274C92.8334 87.8726 93.006 87.3966 93.006 86.846C93.006 85.6233 92.1894 85.012 90.556 85.012H89.618V88.862H90.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                            <circle cx="160" cy="73" className={classVariant('schematics', ['fill-dark'])} r="4.5"/>
                            <circle cx="160" cy="105.5" className={classVariant('schematics', ['fill-dark'])} r="4.5"/>
                            <circle cx="259" cy="89" className={classVariant('schematics', ['fill-dark'])} r="4.5"/>
                            <path d="M184 123.327V54.6725L247.887 89L184 123.327Z" className={classVariant('schematics', ['stroke-dark'])}/>
                            <rect className={classVariant('schematics', ['fill-dark'])} height="2" width="10" x="188" y="72.5312"/>
                            <path clipRule="evenodd" d="M194 99.5312H192V103.531H188V105.531H192V109.531H194V105.531H198V103.531H194V99.5312Z" className={classVariant('schematics', ['fill-dark'])} fillRule="evenodd"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="160" x2="160" y1="38" y2="73"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="259" x2="259" y1="38" y2="88"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="248" x2="287" y1="89" y2="89"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="152" x2="168" y1="186.5" y2="186.5"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="154" x2="166" y1="190.5" y2="190.5"/>
                            <line className={classVariant('schematics', ['stroke-dark'])} x1="156" x2="164" y1="194.5" y2="194.5"/>
                            <path d="M160 105L160 187" className={classVariant('schematics', ['stroke-dark'])}/>
                            <rect height="44" className={classVariant('schematics', ['stroke-dark', 'fill-light'])} transform="rotate(180 167 170)" width="14" x="167" y="170"/>
                        </svg>
                    </div>
                    <div className="differential-op-amp__formula">
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
                                    <mrow>
                                    <mrow>
                                        <mo>(</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mi>f</mi>
                                        </msub>
                                        <mo>+</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mn>1</mn>
                                        </msub>
                                        <mo>)</mo>
                                    </mrow>
                                    <msub>
                                        <mi>R</mi>
                                        <mi>g</mi>
                                    </msub>
                                    </mrow>
                                    <mrow>
                                    <mrow>
                                        <mo>(</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mi>g</mi>
                                        </msub>
                                        <mo>+</mo>
                                        <msub>
                                        <mi>R</mi>
                                        <mn>2</mn>
                                        </msub>
                                        <mo>)</mo>
                                    </mrow>
                                    <msub>
                                        <mi>R</mi>
                                        <mn>1</mn>
                                    </msub>
                                    </mrow>
                                </mfrac>
                                <msub>
                                    <mi>V</mi>
                                    <mn>2</mn>
                                </msub>
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
                                <msub>
                                    <mi>V</mi>
                                    <mn>1</mn>
                                </msub>
                                </mrow>
                            </mstyle>
                        </math>
                    </div>
                    <div className="differential-op-amp__text">
                        <p>
                            Differential <em>Z<sub>in</sub></em> (between the two input pins) = <em>R<sub>1</sub> + R<sub>2</sub></em> 
                            &nbsp;(Note: this is approximate)
                        </p>
                        <p>
                            The circuit shown is used for finding the difference of two voltages 
                            each multiplied by some constant (determined by the resistors). The name 
                            <q>differential amplifier</q> should not be confused with the <q>differentiator</q>.
                        </p>
                        <p>
                            For common-mode rejection, anything done to one input must be done to 
                            the other. The addition of a compensation capacitor in parallel with Rf, 
                            for instance, must be balanced by an equivalent capacitor in parallel with Rg.
                        </p>
                    </div>
                </div>
            </SummaryFooter>
        </article>
    )
}
