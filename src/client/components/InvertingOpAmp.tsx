import React, {ChangeEvent, useState, MouseEvent} from "react";
import type {ValueItemEntry} from '../types.d';
import {LabelInput, LabelSelect, LabelOutput, Button} from '../styles/Form';
import './InvertingOpAmp.css';

interface Props {
    values: ValueItemEntry[]
    allValues: boolean
}

export default function InvertingOpAmp ({values = [], allValues}: Props) {
                                            //     v   rf   r2
    const [inputState, setInputState] = useState(['0', '0', '0']);
    const [outputState, setOutputState] = useState('0');
    const [gainState, setGainState] = useState('0');

    const handleVin = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputState([
            event.currentTarget.value,
            inputState.at(1)!,
            inputState.at(2)!,
        ]);

        if (event.currentTarget.value === '0' || event.currentTarget.value === '') {return}

        const gain = invertingGainFormula(
            parseFloat(inputState.at(1)!),
            parseFloat(inputState.at(2)!),
        );
        console.log(gain);
        const output = invertingOutputFormula(
            parseFloat(event.currentTarget.value), 
            gain
        );
        setGainState(gain.toFixed(2));
        setOutputState(output.toFixed(2));
    }

    const handleR1 = (event: ChangeEvent<HTMLSelectElement>): void => {
        setInputState([
            inputState.at(0)!,
            event.currentTarget.value,
            inputState.at(2)!,
        ]);

        const gain = invertingGainFormula(
            parseFloat(event.currentTarget.value),
            parseFloat(inputState.at(2)!),
        );
        console.log(gain);
        const output = invertingOutputFormula(
            parseFloat(inputState.at(0)!), 
            gain
        );
        setGainState(gain.toFixed(2));
        setOutputState(output.toFixed(2));
    }

    const handleR2 = (event: ChangeEvent<HTMLSelectElement>): void => {
        setInputState([
            inputState.at(0)!,
            inputState.at(1)!,
            event.currentTarget.value,
        ]);

        const gain = invertingGainFormula(
            parseFloat(inputState.at(1)!),
            parseFloat(event.currentTarget.value),
        );
        console.log(gain);
        const output = invertingOutputFormula(
            parseFloat(inputState.at(0)!),
            gain
        )
        setOutputState(output.toFixed(2));
        setGainState(gain.toFixed(2))
    }

    const handleSwitch = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setInputState([
            inputState.at(0)!,
            inputState.at(2)!,
            inputState.at(1)!,
        ]);

        const gain = invertingGainFormula(
            parseFloat(inputState.at(2)!),
            parseFloat(inputState.at(1)!),
        );
        const output = invertingOutputFormula(
            parseFloat(inputState.at(0)!), 
            gain
        );
        setGainState(gain.toFixed(2));
        setOutputState(output.toFixed(2));
    }

    const invertingGainFormula = (rf: number, r2: number): number => {
		return ((rf/r2)) * -1;
	}

    const invertingOutputFormula = (v: number, a: number): number => {
		return a * v;
	}

    return (
        <article className="inverting-op-amp">
            <header className="inverting-op-amp__header">
                <math display="block">
                    <msub>
                        <mi>A</mi>
                        <mn>(v)</mn>
                    </msub>
                    <mo>=</mo>
                    <mo>-</mo>

                    <mo>(</mo>
                    <mfrac>
                        <mrow>
                            <msub>
                                <mi>R</mi>
                                <mn>f</mn>
                            </msub>
                        </mrow>
                        <mrow>
                            <msub>
                                <mi>R</mi>
                                <mn>2</mn>
                            </msub>
                        </mrow>
                    </mfrac>
                    <mo>)</mo>
                </math>
                <math display="block">
                    <msub>
                        <mi>V</mi>
                        <mn>out</mn>
                    </msub>
                    <mo>=</mo>
                    <msub>
                        <mi>A</mi>
                        <mn>(v)</mn>
                    </msub>
                    <mo>×</mo>
                    <msub>
                        <mi>V</mi>
                        <mn>in</mn>
                    </msub>
                </math> 
            </header>
            <section className="inverting-op-amp__content">
                <div className="inverting-op-amp__form-row">
                    <LabelInput text={<>V<sub>in</sub></>} onChange={handleVin} value={inputState.at(0)} />
                </div>
                <div className="inverting-op-amp__form-row">
                    <LabelSelect text={<>R<sub>f</sub></>} onChange={handleR1} value={inputState.at(1)}>
                        {values.map(item => (
                            <option key={item.id} value={item.value} disabled={allValues ? false :!item.active}>{item.text}</option>
                        ))}
                    </LabelSelect>
                </div>
                <div className="inverting-op-amp__form-row">
                    <Button onClick={handleSwitch}>switch</Button>
                </div>
                <div className="inverting-op-amp__form-row">
                    <LabelSelect text={<>R<sub>2</sub></>} onChange={handleR2} value={inputState.at(2)}>
                        {values.map(item => (
                            <option key={item.id} value={item.value} disabled={allValues ? false :!item.active}>{item.text}</option>
                        ))}
                    </LabelSelect>
                </div>
            </section>
            <aside className="inverting-op-amp__aside">
                <svg width="347" height="171" viewBox="0 0 347 171" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="347" height="171" fill="white"></rect>
                    <line x1="31" y1="51.5312" x2="47" y2="51.5312" stroke="#263238" strokeWidth="2"></line>
                    <line x1="33" y1="55.5312" x2="45" y2="55.5312" stroke="#263238" strokeWidth="2"></line>
                    <line x1="35" y1="59.5312" x2="43" y2="59.5312" stroke="#263238" strokeWidth="2"></line>
                    <circle cx="299.5" cy="57" r="3.5" fill="white" stroke="#263238" strokeWidth="2"></circle>
                    <circle cx="245" cy="57" r="4.5" fill="#263238"></circle>
                    <circle cx="143" cy="77.0312" r="4.5" fill="#263238"></circle>
                    <circle cx="39.5" cy="77.0312" r="3.5" fill="white" stroke="#263238" strokeWidth="2"></circle>
                    <path d="M158 91.3275V22.6725L221.887 57L158 91.3275Z" stroke="#263238" strokeWidth="2"></path>
                    <path d="M169.094 38.3438V39.75H166.75V42.1094H165.344V39.75H163V38.3438H165.344V36H166.75V38.3438H169.094Z" fill="#263238"></path>
                    <path d="M168.703 76.3438V77.75H164V76.3438H168.703Z" fill="#263238"></path>
                    <line x1="222" y1="57" x2="296" y2="57" stroke="#263238" strokeWidth="2"></line>
                    <line x1="43" y1="76.5312" x2="157" y2="76.5312" stroke="#263238" strokeWidth="2"></line>
                    <line x1="39" y1="38.5312" x2="157" y2="38.5313" stroke="#263238" strokeWidth="2"></line>
                    <line x1="142" y1="124.531" x2="247" y2="124.531" stroke="#263238" strokeWidth="2"></line>
                    <line x1="143" y1="76.5313" x2="143" y2="125.531" stroke="#263238" strokeWidth="2"></line>
                    <line x1="39" y1="37.5312" x2="39" y2="51.5312" stroke="#263238" strokeWidth="2"></line>
                    <line x1="246" y1="57.5312" x2="246" y2="124.531" stroke="#263238" strokeWidth="2"></line>
                    <rect x="75" y="83.5312" width="14" height="44" transform="rotate(-90 75 83.5312)" fill="white" stroke="#263238" strokeWidth="2"></rect>
                    <rect x="172" y="132.531" width="14" height="44" transform="rotate(-90 172 132.531)" fill="white" stroke="#263238" strokeWidth="2"></rect>
                    <path d="M23.5469 76.5234V77.4492C23.6719 77.293 23.832 77.1367 24.0273 76.9805C24.2227 76.8164 24.4414 76.6797 24.6836 76.5703C24.9336 76.4609 25.1914 76.4062 25.457 76.4062C25.8555 76.4062 26.2188 76.4961 26.5469 76.6758C26.875 76.8477 27.1367 77.1133 27.332 77.4727C27.5273 77.8242 27.625 78.2695 27.625 78.8086V82.3828H26.6641L26.6523 78.9023C26.6523 78.3945 26.5391 78.0078 26.3125 77.7422C26.0938 77.4766 25.7539 77.3438 25.293 77.3438C24.9805 77.3438 24.668 77.4609 24.3555 77.6953C24.0508 77.9219 23.7812 78.1875 23.5469 78.4922V82.3828H22.5859V76.5234H23.5469Z" fill="#263238"></path>
                    <path d="M19.9141 73.7109C20.1406 73.7109 20.3281 73.793 20.4766 73.957C20.6328 74.1133 20.7109 74.2969 20.7109 74.5078C20.7109 74.7109 20.6328 74.8945 20.4766 75.0586C20.3281 75.2227 20.1406 75.3047 19.9141 75.3047C19.6875 75.3047 19.4961 75.2227 19.3398 75.0586C19.1914 74.8945 19.1172 74.7109 19.1172 74.5078C19.1172 74.2969 19.1914 74.1133 19.3398 73.957C19.4961 73.793 19.6875 73.7109 19.9141 73.7109ZM20.5117 76.5234V82.3828H19.5508V77.4258H18.625V76.5234H20.5117Z" fill="#263238"></path>
                    <path d="M17.8633 71.5312L14.1953 79.3828H13.668L10 71.5312H11.2656L13.9141 77.6016L16.5977 71.5312H17.8633Z" fill="#263238"></path>
                    <path d="M333.492 54.3047V55.9922H335.203V56.8945H333.492V60.3281C333.492 60.5703 333.555 60.7617 333.68 60.9023C333.805 61.043 333.996 61.1133 334.254 61.1133C334.488 61.1133 334.684 61.0859 334.84 61.0312C334.996 60.9688 335.133 60.9023 335.25 60.832V61.6172C335.094 61.7422 334.926 61.8398 334.746 61.9102C334.574 61.9883 334.34 62.0273 334.043 62.0273C333.543 62.0273 333.164 61.8789 332.906 61.582C332.656 61.2773 332.531 60.875 332.531 60.375V56.8945H331.406V56.6133C331.789 56.4414 332.109 56.1602 332.367 55.7695C332.625 55.3711 332.852 54.8828 333.047 54.3047H333.492Z" fill="#263238"></path>
                    <path d="M330.059 55.9922V59.4609C330.059 59.9766 329.949 60.4219 329.73 60.7969C329.512 61.1719 329.215 61.4609 328.84 61.6641C328.465 61.8672 328.043 61.9688 327.574 61.9688C327.105 61.9688 326.684 61.8672 326.309 61.6641C325.934 61.4609 325.637 61.1719 325.418 60.7969C325.199 60.4219 325.09 59.9766 325.09 59.4609V55.9922H326.086V59.4609C326.086 59.9688 326.234 60.3594 326.531 60.6328C326.836 60.8984 327.184 61.0312 327.574 61.0312C327.965 61.0312 328.309 60.8984 328.605 60.6328C328.91 60.3594 329.062 59.9688 329.062 59.4609V55.9922H330.059Z" fill="#263238"></path>
                    <path d="M320.625 55.875C321.219 55.875 321.746 56.0156 322.207 56.2969C322.668 56.5781 323.027 56.9531 323.285 57.4219C323.551 57.8906 323.684 58.4023 323.684 58.957C323.684 59.5117 323.551 60.0234 323.285 60.4922C323.027 60.9531 322.668 61.3242 322.207 61.6055C321.746 61.8867 321.219 62.0273 320.625 62.0273C320.031 62.0273 319.504 61.8867 319.043 61.6055C318.582 61.3242 318.219 60.9531 317.953 60.4922C317.695 60.0234 317.566 59.5117 317.566 58.957C317.566 58.4023 317.695 57.8906 317.953 57.4219C318.219 56.9531 318.582 56.5781 319.043 56.2969C319.504 56.0156 320.031 55.875 320.625 55.875ZM320.625 56.8125C320.211 56.8125 319.848 56.9141 319.535 57.1172C319.223 57.3125 318.98 57.5742 318.809 57.9023C318.645 58.2227 318.562 58.5742 318.562 58.957C318.562 59.332 318.645 59.6836 318.809 60.0117C318.98 60.332 319.223 60.5938 319.535 60.7969C319.848 60.9922 320.211 61.0898 320.625 61.0898C321.047 61.0898 321.41 60.9922 321.715 60.7969C322.027 60.5938 322.266 60.332 322.43 60.0117C322.602 59.6836 322.688 59.332 322.688 58.957C322.688 58.5742 322.602 58.2227 322.43 57.9023C322.266 57.5742 322.027 57.3125 321.715 57.1172C321.41 56.9141 321.047 56.8125 320.625 56.8125Z" fill="#263238"></path>
                    <path d="M316.863 51L313.195 58.8516H312.668L309 51H310.266L312.914 57.0703L315.598 51H316.863Z" fill="#263238"></path>
                    <path d="M100.164 92.3555C100.68 92.3555 101.133 92.4492 101.523 92.6367C101.914 92.8242 102.219 93.0938 102.438 93.4453C102.656 93.7891 102.766 94.1992 102.766 94.6758C102.766 95.1836 102.637 95.668 102.379 96.1289C102.121 96.582 101.754 97.0664 101.277 97.582C100.809 98.0977 100.25 98.707 99.6016 99.4102H102.824V100.383H97.9023V99.9609C98.6992 99.0703 99.3867 98.3164 99.9648 97.6992C100.543 97.0742 100.988 96.5391 101.301 96.0938C101.613 95.6484 101.77 95.2539 101.77 94.9102C101.77 94.4023 101.602 94.0234 101.266 93.7734C100.938 93.5156 100.539 93.3867 100.07 93.3867C99.6875 93.3867 99.3242 93.4844 98.9805 93.6797C98.6445 93.8672 98.3633 94.0625 98.1367 94.2656V93.1641C98.3398 92.9766 98.6172 92.7969 98.9688 92.625C99.3203 92.4453 99.7188 92.3555 100.164 92.3555Z" fill="#263238"></path>
                    <path d="M94.0117 89.5312C94.4648 89.5312 94.8984 89.6172 95.3125 89.7891C95.7266 89.9531 96.0664 90.2109 96.332 90.5625C96.6055 90.9062 96.7422 91.3477 96.7422 91.8867C96.7422 92.3711 96.6016 92.7812 96.3203 93.1172C96.0469 93.4531 95.6953 93.707 95.2656 93.8789C94.8438 94.043 94.4062 94.125 93.9531 94.125C93.8125 94.125 93.625 94.1172 93.3906 94.1016L97.0469 97.3828H95.4297L92.0547 94.1016V97.3828H91V89.5312H94.0117ZM92.0547 90.5273V93.0469C92.3125 93.1172 92.5938 93.1719 92.8984 93.2109C93.2031 93.25 93.5039 93.2695 93.8008 93.2695C94.3945 93.2695 94.8516 93.1445 95.1719 92.8945C95.5 92.6445 95.6641 92.3086 95.6641 91.8867C95.6641 91.4492 95.4844 91.1133 95.125 90.8789C94.7734 90.6445 94.3438 90.5273 93.8359 90.5273H92.0547Z" fill="#263238"></path>
                    <path d="M199.195 142.523V143.426H197.484V148.383H196.523V143.426H195.598V142.523H196.523V141.773C196.523 141.312 196.613 140.938 196.793 140.648C196.973 140.352 197.203 140.133 197.484 139.992C197.766 139.844 198.051 139.77 198.34 139.77C198.738 139.77 199.062 139.875 199.312 140.086V140.93C199.195 140.852 199.055 140.789 198.891 140.742C198.727 140.695 198.562 140.676 198.398 140.684C198.109 140.691 197.883 140.785 197.719 140.965C197.562 141.137 197.484 141.441 197.484 141.879V142.523H199.195Z" fill="#263238"></path>
                    <path d="M192.012 137.531C192.465 137.531 192.898 137.617 193.312 137.789C193.727 137.953 194.066 138.211 194.332 138.562C194.605 138.906 194.742 139.348 194.742 139.887C194.742 140.371 194.602 140.781 194.32 141.117C194.047 141.453 193.695 141.707 193.266 141.879C192.844 142.043 192.406 142.125 191.953 142.125C191.812 142.125 191.625 142.117 191.391 142.102L195.047 145.383H193.43L190.055 142.102V145.383H189V137.531H192.012ZM190.055 138.527V141.047C190.312 141.117 190.594 141.172 190.898 141.211C191.203 141.25 191.504 141.27 191.801 141.27C192.395 141.27 192.852 141.145 193.172 140.895C193.5 140.645 193.664 140.309 193.664 139.887C193.664 139.449 193.484 139.113 193.125 138.879C192.773 138.645 192.344 138.527 191.836 138.527H190.055Z" fill="#263238"></path>
                </svg>
            </aside>
            <footer className="inverting-op-amp__footer">
                <LabelOutput text={<>V<sub>out</sub></>} value={outputState} readOnly />
                <LabelOutput text={<>A<sub>(v)</sub></>} value={gainState} readOnly />
            </footer>
        </article>
    )
}