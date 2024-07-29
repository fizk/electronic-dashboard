import React, {ChangeEvent, useState, MouseEvent} from "react";
import {LabelInput, LabelSelect, LabelOutput, Button} from '../elements/Form';
import type {ValueItemEntry} from '../types.d';
import './NonInvertingOpAmp.css';

interface Props {
    values: ValueItemEntry[]
    allValues: boolean
}

export default function NonInvertingOpAmp ({values = []}: Props) {
                                            //     v   rf   r2
    const [inputState, setInputState] = useState(['0', '0', '0']);
    const [outputState, setOutputState] = useState('0');
    const [gainState, setGainState] = useState('0');

    const handleVin = (event: ChangeEvent<HTMLInputElement>) => {
        setInputState([
            event.currentTarget.value,
            inputState.at(1)!,
            inputState.at(2)!,
        ]);

        if (event.currentTarget.value === '0' || event.currentTarget.value === '') {return}

        const gain = nonInvertingGainFormula(
            parseFloat(inputState.at(1)!),
            parseFloat(inputState.at(2)!),
        );
        const output = nonInvertingOutputFormula(
            parseFloat(event.currentTarget.value), 
            gain
        );
        setGainState(gain.toFixed(2));
        setOutputState(output.toFixed(2));
    }

    const handleR1 = (event: ChangeEvent<HTMLSelectElement>) => {
        setInputState([
            inputState.at(0)!,
            event.currentTarget.value,
            inputState.at(2)!,
        ]);

        const gain = nonInvertingGainFormula(
            parseFloat(event.currentTarget.value),
            parseFloat(inputState.at(2)!),
        );
        const output = nonInvertingOutputFormula(
            parseFloat(inputState.at(0)!), 
            gain
        );
        setGainState(gain.toFixed(2));
        setOutputState(output.toFixed(2));
    }

    const handleR2 = (event: ChangeEvent<HTMLSelectElement>) => {
        setInputState([
            inputState.at(0)!,
            inputState.at(1)!,
            event.currentTarget.value,
        ]);

        const gain = nonInvertingGainFormula(
            parseFloat(inputState.at(1)!),
            parseFloat(event.currentTarget.value),
        );
        const output = nonInvertingOutputFormula(
            parseFloat(inputState.at(0)!),
            gain
        )
        setOutputState(output.toFixed(2));
        setGainState(gain.toFixed(2))
    }

    const handleSwitch = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setInputState([
            inputState.at(0)!,
            inputState.at(2)!,
            inputState.at(1)!,
        ]);

        const gain = nonInvertingGainFormula(
            parseFloat(inputState.at(2)!),
            parseFloat(inputState.at(1)!),
        );
        const output = nonInvertingOutputFormula(
            parseFloat(inputState.at(0)!), 
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
        <article className="non-inverting-op-amp">
            <header className="non-inverting-op-amp__header">
                <math display="block">
                    <msub>
                        <mi>A</mi>
                        <mn>(v)</mn>
                    </msub>
                    <mo>=</mo>
                    <mn>1</mn>
                    <mo>+</mo>
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
            <section className="non-inverting-op-amp__content">
                <div className="non-inverting-op-amp__form-row">
                    <LabelInput text={<>V<sub>in</sub></>} onChange={handleVin} value={inputState.at(0)} />
                </div>
                <div className="non-inverting-op-amp__form-row">
                    <LabelSelect text={<>R<sub>f</sub></>} onChange={handleR1} value={inputState.at(1)}>
                        {values.map(item => (
                            <option key={item.id} value={item.value} disabled={!item.active}>{item.text}</option>
                        ))}
                    </LabelSelect>
                </div>
                <div className="non-inverting-op-amp__form-row">
                    <Button onClick={handleSwitch}>switch</Button>
                </div>
                <div>
                    <LabelSelect text={<>R<sub>2</sub></>} onChange={handleR2} value={inputState.at(2)}>
                        {values.map(item => (
                            <option key={item.id} value={item.value} disabled={!item.active}>{item.text}</option>
                        ))}
                    </LabelSelect>
                </div>
            </section>
            <aside className="non-inverting-op-amp__aside">
                <svg width="347" height="171" viewBox="0 0 347 171" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="347" height="171" fill="white"/>
                    <line x1="66" y1="140.469" x2="82" y2="140.469" stroke="#263238" strokeWidth="2"/>
                    <line x1="68" y1="144.469" x2="80" y2="144.469" stroke="#263238" strokeWidth="2"/>
                    <line x1="70" y1="148.469" x2="78" y2="148.469" stroke="#263238" strokeWidth="2"/>
                    <circle cx="289.5" cy="101.469" r="3.5" fill="white" stroke="#263238" strokeWidth="2"/>
                    <circle cx="235" cy="101.469" r="4.5" fill="#263238"/>
                    <circle cx="133" cy="83.5" r="4.5" fill="#263238"/>
                    <circle cx="29.5" cy="82.9688" r="3.5" fill="white" stroke="#263238" strokeWidth="2"/>
                    <path d="M148 135.796V67.1413L211.887 101.469L148 135.796Z" stroke="#263238" strokeWidth="2"/>
                    <path d="M159.094 82.8125V84.2188H156.75V86.5781H155.344V84.2188H153V82.8125H155.344V80.4688H156.75V82.8125H159.094Z" fill="#263238"/>
                    <path d="M158.703 120.812V122.219H154V120.812H158.703Z" fill="#263238"/>
                    <line x1="212" y1="101.469" x2="286" y2="101.469" stroke="#263238" strokeWidth="2"/>
                    <line x1="132" y1="42.4688" x2="236" y2="42.4688" stroke="#263238" strokeWidth="2"/>
                    <line x1="73" y1="121.469" x2="147" y2="121.469" stroke="#263238" strokeWidth="2"/>
                    <line x1="33" y1="83.4688" x2="147" y2="83.4687" stroke="#263238" strokeWidth="2"/>
                    <line x1="133" y1="42.4688" x2="133" y2="83.4688" stroke="#263238" strokeWidth="2"/>
                    <line x1="74" y1="120.469" x2="74" y2="139.469" stroke="#263238" strokeWidth="2"/>
                    <line x1="235" y1="42.4688" x2="235" y2="101.469" stroke="#263238" strokeWidth="2"/>
                    <rect x="65" y="91.4687" width="14" height="44" transform="rotate(-90 65 91.4687)" fill="white" stroke="#263238" strokeWidth="2"/>
                    <rect x="162" y="49.4687" width="14" height="44" transform="rotate(-90 162 49.4687)" fill="white" stroke="#263238" strokeWidth="2"/>
                    <path d="M33.5469 67.4609V68.3867C33.6719 68.2305 33.832 68.0742 34.0273 67.918C34.2227 67.7539 34.4414 67.6172 34.6836 67.5078C34.9336 67.3984 35.1914 67.3438 35.457 67.3438C35.8555 67.3438 36.2188 67.4336 36.5469 67.6133C36.875 67.7852 37.1367 68.0508 37.332 68.4102C37.5273 68.7617 37.625 69.207 37.625 69.7461V73.3203H36.6641L36.6523 69.8398C36.6523 69.332 36.5391 68.9453 36.3125 68.6797C36.0938 68.4141 35.7539 68.2812 35.293 68.2812C34.9805 68.2812 34.668 68.3984 34.3555 68.6328C34.0508 68.8594 33.7812 69.125 33.5469 69.4297V73.3203H32.5859V67.4609H33.5469Z" fill="#263238"/>
                    <path d="M29.9141 64.6484C30.1406 64.6484 30.3281 64.7305 30.4766 64.8945C30.6328 65.0508 30.7109 65.2344 30.7109 65.4453C30.7109 65.6484 30.6328 65.832 30.4766 65.9961C30.3281 66.1602 30.1406 66.2422 29.9141 66.2422C29.6875 66.2422 29.4961 66.1602 29.3398 65.9961C29.1914 65.832 29.1172 65.6484 29.1172 65.4453C29.1172 65.2344 29.1914 65.0508 29.3398 64.8945C29.4961 64.7305 29.6875 64.6484 29.9141 64.6484ZM30.5117 67.4609V73.3203H29.5508V68.3633H28.625V67.4609H30.5117Z" fill="#263238"/>
                    <path d="M27.8633 62.4688L24.1953 70.3203H23.668L20 62.4688H21.2656L23.9141 68.5391L26.5977 62.4688H27.8633Z" fill="#263238"/>
                    <path d="M323.492 98.7734V100.461H325.203V101.363H323.492V104.797C323.492 105.039 323.555 105.23 323.68 105.371C323.805 105.512 323.996 105.582 324.254 105.582C324.488 105.582 324.684 105.555 324.84 105.5C324.996 105.438 325.133 105.371 325.25 105.301V106.086C325.094 106.211 324.926 106.309 324.746 106.379C324.574 106.457 324.34 106.496 324.043 106.496C323.543 106.496 323.164 106.348 322.906 106.051C322.656 105.746 322.531 105.344 322.531 104.844V101.363H321.406V101.082C321.789 100.91 322.109 100.629 322.367 100.238C322.625 99.8398 322.852 99.3516 323.047 98.7734H323.492Z" fill="#263238"/>
                    <path d="M320.059 100.461V103.93C320.059 104.445 319.949 104.891 319.73 105.266C319.512 105.641 319.215 105.93 318.84 106.133C318.465 106.336 318.043 106.438 317.574 106.438C317.105 106.438 316.684 106.336 316.309 106.133C315.934 105.93 315.637 105.641 315.418 105.266C315.199 104.891 315.09 104.445 315.09 103.93V100.461H316.086V103.93C316.086 104.438 316.234 104.828 316.531 105.102C316.836 105.367 317.184 105.5 317.574 105.5C317.965 105.5 318.309 105.367 318.605 105.102C318.91 104.828 319.062 104.438 319.062 103.93V100.461H320.059Z" fill="#263238"/>
                    <path d="M310.625 100.344C311.219 100.344 311.746 100.484 312.207 100.766C312.668 101.047 313.027 101.422 313.285 101.891C313.551 102.359 313.684 102.871 313.684 103.426C313.684 103.98 313.551 104.492 313.285 104.961C313.027 105.422 312.668 105.793 312.207 106.074C311.746 106.355 311.219 106.496 310.625 106.496C310.031 106.496 309.504 106.355 309.043 106.074C308.582 105.793 308.219 105.422 307.953 104.961C307.695 104.492 307.566 103.98 307.566 103.426C307.566 102.871 307.695 102.359 307.953 101.891C308.219 101.422 308.582 101.047 309.043 100.766C309.504 100.484 310.031 100.344 310.625 100.344ZM310.625 101.281C310.211 101.281 309.848 101.383 309.535 101.586C309.223 101.781 308.98 102.043 308.809 102.371C308.645 102.691 308.562 103.043 308.562 103.426C308.562 103.801 308.645 104.152 308.809 104.48C308.98 104.801 309.223 105.062 309.535 105.266C309.848 105.461 310.211 105.559 310.625 105.559C311.047 105.559 311.41 105.461 311.715 105.266C312.027 105.062 312.266 104.801 312.43 104.48C312.602 104.152 312.688 103.801 312.688 103.426C312.688 103.043 312.602 102.691 312.43 102.371C312.266 102.043 312.027 101.781 311.715 101.586C311.41 101.383 311.047 101.281 310.625 101.281Z" fill="#263238"/>
                    <path d="M306.863 95.4688L303.195 103.32H302.668L299 95.4688H300.266L302.914 101.539L305.598 95.4688H306.863Z" fill="#263238"/>
                    <path d="M90.1641 64.8242C90.6797 64.8242 91.1328 64.918 91.5234 65.1055C91.9141 65.293 92.2188 65.5625 92.4375 65.9141C92.6562 66.2578 92.7656 66.668 92.7656 67.1445C92.7656 67.6523 92.6367 68.1367 92.3789 68.5977C92.1211 69.0508 91.7539 69.5352 91.2773 70.0508C90.8086 70.5664 90.25 71.1758 89.6016 71.8789H92.8242V72.8516H87.9023V72.4297C88.6992 71.5391 89.3867 70.7852 89.9648 70.168C90.543 69.543 90.9883 69.0078 91.3008 68.5625C91.6133 68.1172 91.7695 67.7227 91.7695 67.3789C91.7695 66.8711 91.6016 66.4922 91.2656 66.2422C90.9375 65.9844 90.5391 65.8555 90.0703 65.8555C89.6875 65.8555 89.3242 65.9531 88.9805 66.1484C88.6445 66.3359 88.3633 66.5312 88.1367 66.7344V65.6328C88.3398 65.4453 88.6172 65.2656 88.9688 65.0938C89.3203 64.9141 89.7188 64.8242 90.1641 64.8242Z" fill="#263238"/>
                    <path d="M84.0117 62C84.4648 62 84.8984 62.0859 85.3125 62.2578C85.7266 62.4219 86.0664 62.6797 86.332 63.0312C86.6055 63.375 86.7422 63.8164 86.7422 64.3555C86.7422 64.8398 86.6016 65.25 86.3203 65.5859C86.0469 65.9219 85.6953 66.1758 85.2656 66.3477C84.8438 66.5117 84.4062 66.5938 83.9531 66.5938C83.8125 66.5938 83.625 66.5859 83.3906 66.5703L87.0469 69.8516H85.4297L82.0547 66.5703V69.8516H81V62H84.0117ZM82.0547 62.9961V65.5156C82.3125 65.5859 82.5938 65.6406 82.8984 65.6797C83.2031 65.7188 83.5039 65.7383 83.8008 65.7383C84.3945 65.7383 84.8516 65.6133 85.1719 65.3633C85.5 65.1133 85.6641 64.7773 85.6641 64.3555C85.6641 63.918 85.4844 63.582 85.125 63.3477C84.7734 63.1133 84.3438 62.9961 83.8359 62.9961H82.0547Z" fill="#263238"/>
                    <path d="M189.195 25.9922V26.8945H187.484V31.8516H186.523V26.8945H185.598V25.9922H186.523V25.2422C186.523 24.7812 186.613 24.4062 186.793 24.1172C186.973 23.8203 187.203 23.6016 187.484 23.4609C187.766 23.3125 188.051 23.2383 188.34 23.2383C188.738 23.2383 189.062 23.3438 189.312 23.5547V24.3984C189.195 24.3203 189.055 24.2578 188.891 24.2109C188.727 24.1641 188.562 24.1445 188.398 24.1523C188.109 24.1602 187.883 24.2539 187.719 24.4336C187.562 24.6055 187.484 24.9102 187.484 25.3477V25.9922H189.195Z" fill="#263238"/>
                    <path d="M182.012 21C182.465 21 182.898 21.0859 183.312 21.2578C183.727 21.4219 184.066 21.6797 184.332 22.0312C184.605 22.375 184.742 22.8164 184.742 23.3555C184.742 23.8398 184.602 24.25 184.32 24.5859C184.047 24.9219 183.695 25.1758 183.266 25.3477C182.844 25.5117 182.406 25.5938 181.953 25.5938C181.812 25.5938 181.625 25.5859 181.391 25.5703L185.047 28.8516H183.43L180.055 25.5703V28.8516H179V21H182.012ZM180.055 21.9961V24.5156C180.312 24.5859 180.594 24.6406 180.898 24.6797C181.203 24.7188 181.504 24.7383 181.801 24.7383C182.395 24.7383 182.852 24.6133 183.172 24.3633C183.5 24.1133 183.664 23.7773 183.664 23.3555C183.664 22.918 183.484 22.582 183.125 22.3477C182.773 22.1133 182.344 21.9961 181.836 21.9961H180.055Z" fill="#263238"/>
                </svg> 
            </aside>
            <footer className="non-inverting-op-amp__footer">
                <LabelOutput text={<>V<sub>out</sub></>} value={outputState} readOnly />
                <LabelOutput text={<>A<sub>(v)</sub></>} value={gainState} readOnly />
            </footer>
        </article>
    )
}