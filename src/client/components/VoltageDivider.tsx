import React, {ChangeEvent, useState, MouseEvent} from "react";
import {LabelInput, LabelSelect, LabelOutput, Button} from '../elements/Form';
import type {ValueItemEntry} from '../types.d'
import './VoltageDivider.css';

interface Props {
    values: ValueItemEntry[]
    allValues: boolean
}

export default function VoltageDivider ({values = []}: Props) {
                                            //    v  r1 r2
    const [inputState, setInputState] = useState(['0', '0', '0']);
    const [outputState, setOutputState] = useState('0');

    const handleVin = (event: ChangeEvent<HTMLInputElement>): void => {
        const v = event.currentTarget.value;
        const r1 = inputState.at(1)!;
        const r2 = inputState.at(2)!;

        setInputState([v,r1,r2,]);

        if (v === '0' || v === '' ) {return}

        const calculation = calculateVoltage(parseFloat(v), parseFloat(r1), parseFloat(r2),);

        if (isNaN(calculation)) {return;}

        setOutputState(calculation.toFixed(2));
    }

    const handleR1 = (event: ChangeEvent<HTMLSelectElement>): void => {
        const v = inputState.at(0)!;
        const r1 = event.currentTarget.value;
        const r2 = inputState.at(2)!;

        setInputState([v,r1,r2,]);

        if (v === '0' || v === '' ) {return}

        const calculation = calculateVoltage(
            parseFloat(v), 
            parseFloat(r1), 
            parseFloat(r2)
        );
        
        if (isNaN(calculation)) {return;}
        
        setOutputState(calculation.toFixed(2));
    }

    const handleR2 = (event: ChangeEvent<HTMLSelectElement>): void => {
        const v = inputState.at(0)!;
        const r1 = inputState.at(1)!;
        const r2 = event.currentTarget.value;

        setInputState([v,r1,r2,]);

        if (v === '0' || v === '' ) {return}

        const calculation = calculateVoltage(
            parseFloat(v), 
            parseFloat(r1), 
            parseFloat(r2)
        );
        
        if (isNaN(calculation)) {return;}

        setOutputState(calculation.toFixed(2));
    }

    const handleSwitch = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        
        const v = inputState.at(0)!;
        const r1 = inputState.at(2)!;
        const r2 = inputState.at(1)!;

        setInputState([v,r1,r2,]);

        const calculation = calculateVoltage(
            parseFloat(v), 
            parseFloat(r1), 
            parseFloat(r2)
        );

        if (isNaN(calculation)) {return;}

        setOutputState(calculation.toFixed(2));
    }

    const calculateVoltage = (v: number, r1: number, r2: number): number => {
        return (r2 / (r1 + r2)) * v;
    }

    return (
        <div className="voltage-divider">
            <header className="voltage-divider__header">
                <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <mfenced>
                        <mfrac>
                            <mrow>
                                <mi>r</mi>
                                <mn>2</mn>
                            </mrow>
                            <mrow>
                                <mi>r</mi>
                                <mn>1</mn>
                                <mo>+</mo>
                                <mi>r</mi>
                                <mn>2</mn>
                            </mrow>
                        </mfrac>
                    </mfenced>
                    <mo>&#xd7;</mo>
                    <mi>V</mi>
                    <mi>in</mi>
                </math>
            </header>
            <aside className="voltage-divider__aside">
                <svg width="251" height="201" viewBox="0 0 251 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="251" height="201" fill="white"></rect>
                    <rect x="115.5" y="49.5" width="13" height="34" fill="white" stroke="black"></rect>
                    <rect x="115.5" y="113.5" width="13" height="34" fill="white" stroke="black"></rect>
                    <mask id="path-3-inside-1_1_2" fill="white">
                    <path fillRule="evenodd" clipRule="evenodd" d="M121.5 32.5H85V31.5H122H122.5V32V49H121.5V32.5ZM121.5 113V84H122.5V113H121.5ZM121.5 148V159H122.5V148H121.5Z"></path>
                    </mask>
                    <path fillRule="evenodd" clipRule="evenodd" d="M121.5 32.5H85V31.5H122H122.5V32V49H121.5V32.5ZM121.5 113V84H122.5V113H121.5ZM121.5 148V159H122.5V148H121.5Z" fill="black"></path>
                    <path d="M85 32.5H84V33.5H85V32.5ZM121.5 32.5H122.5V31.5H121.5V32.5ZM85 31.5V30.5H84V31.5H85ZM122.5 31.5H123.5V30.5H122.5V31.5ZM122.5 49V50H123.5V49H122.5ZM121.5 49H120.5V50H121.5V49ZM121.5 84V83H120.5V84H121.5ZM121.5 113H120.5V114H121.5V113ZM122.5 84H123.5V83H122.5V84ZM122.5 113V114H123.5V113H122.5ZM121.5 148V147H120.5V148H121.5ZM121.5 159H120.5V160H121.5V159ZM122.5 159V160H123.5V159H122.5ZM122.5 148H123.5V147H122.5V148ZM85 33.5H121.5V31.5H85V33.5ZM84 31.5V32.5H86V31.5H84ZM122 30.5H85V32.5H122V30.5ZM122.5 30.5H122V32.5H122.5V30.5ZM123.5 32V31.5H121.5V32H123.5ZM123.5 49V32H121.5V49H123.5ZM121.5 50H122.5V48H121.5V50ZM120.5 32.5V49H122.5V32.5H120.5ZM120.5 84V113H122.5V84H120.5ZM122.5 83H121.5V85H122.5V83ZM123.5 113V84H121.5V113H123.5ZM121.5 114H122.5V112H121.5V114ZM120.5 148V159H122.5V148H120.5ZM121.5 160H122.5V158H121.5V160ZM123.5 159V148H121.5V159H123.5ZM122.5 147H121.5V149H122.5V147Z" fill="black" mask="url(#path-3-inside-1_1_2)"></path>
                    <path d="M85 32.5H84V33.5H85V32.5ZM121.5 32.5H122.5V31.5H121.5V32.5ZM85 31.5V30.5H84V31.5H85ZM122.5 31.5H123.5V30.5H122.5V31.5ZM122.5 49V50H123.5V49H122.5ZM121.5 49H120.5V50H121.5V49ZM121.5 84V83H120.5V84H121.5ZM121.5 113H120.5V114H121.5V113ZM122.5 84H123.5V83H122.5V84ZM122.5 113V114H123.5V113H122.5ZM121.5 148V147H120.5V148H121.5ZM121.5 159H120.5V160H121.5V159ZM122.5 159V160H123.5V159H122.5ZM122.5 148H123.5V147H122.5V148ZM85 33.5H121.5V31.5H85V33.5ZM84 31.5V32.5H86V31.5H84ZM122 30.5H85V32.5H122V30.5ZM122.5 30.5H122V32.5H122.5V30.5ZM123.5 32V31.5H121.5V32H123.5ZM123.5 49V32H121.5V49H123.5ZM121.5 50H122.5V48H121.5V50ZM120.5 32.5V49H122.5V32.5H120.5ZM120.5 84V113H122.5V84H120.5ZM122.5 83H121.5V85H122.5V83ZM123.5 113V84H121.5V113H123.5ZM121.5 114H122.5V112H121.5V114ZM120.5 148V159H122.5V148H120.5ZM121.5 160H122.5V158H121.5V160ZM123.5 159V148H121.5V159H123.5ZM122.5 147H121.5V149H122.5V147Z" fill="black" fillOpacity="0.2" mask="url(#path-3-inside-1_1_2)"></path>
                    <line x1="122" y1="96.5" x2="151" y2="96.5" stroke="black"></line>
                    <circle cx="122" cy="97" r="2.5" fill="black"></circle>
                    <line x1="115" y1="159.5" x2="129" y2="159.5" stroke="black"></line>
                    <line x1="117" y1="162.5" x2="127" y2="162.5" stroke="black"></line>
                    <line x1="119" y1="165.5" x2="125" y2="165.5" stroke="black"></line>
                    <path d="M102.6 60.3C103.208 60.3 103.748 60.408 104.22 60.624C104.692 60.832 105.06 61.14 105.324 61.548C105.596 61.948 105.732 62.444 105.732 63.036C105.732 63.38 105.68 63.72 105.576 64.056C105.472 64.392 105.304 64.696 105.072 64.968C104.848 65.24 104.544 65.46 104.16 65.628C103.784 65.788 103.32 65.868 102.768 65.868H101.484V69H100.236V60.3H102.6ZM102.744 64.656C103.192 64.656 103.536 64.572 103.776 64.404C104.024 64.228 104.196 64.02 104.292 63.78C104.388 63.532 104.436 63.3 104.436 63.084C104.436 62.924 104.408 62.756 104.352 62.58C104.296 62.396 104.204 62.224 104.076 62.064C103.956 61.896 103.792 61.764 103.584 61.668C103.376 61.564 103.12 61.512 102.816 61.512H101.484V64.656H102.744ZM104.208 65.4L106.464 69H105L102.708 65.424L104.208 65.4Z" fill="black"></path>
                    <path d="M156.968 91.3L159.788 98.344L159.068 98.2L161.708 91.3H163.196L159.332 100.408L155.468 91.3H156.968Z" fill="black"></path>
                    <path d="M72.968 27.3L75.788 34.344L75.068 34.2L77.708 27.3H79.196L75.332 36.408L71.468 27.3H72.968Z" fill="black"></path>
                    <path d="M102.6 123.3C103.208 123.3 103.748 123.408 104.22 123.624C104.692 123.832 105.06 124.14 105.324 124.548C105.596 124.948 105.732 125.444 105.732 126.036C105.732 126.38 105.68 126.72 105.576 127.056C105.472 127.392 105.304 127.696 105.072 127.968C104.848 128.24 104.544 128.46 104.16 128.628C103.784 128.788 103.32 128.868 102.768 128.868H101.484V132H100.236V123.3H102.6ZM102.744 127.656C103.192 127.656 103.536 127.572 103.776 127.404C104.024 127.228 104.196 127.02 104.292 126.78C104.388 126.532 104.436 126.3 104.436 126.084C104.436 125.924 104.408 125.756 104.352 125.58C104.296 125.396 104.204 125.224 104.076 125.064C103.956 124.896 103.792 124.764 103.584 124.668C103.376 124.564 103.12 124.512 102.816 124.512H101.484V127.656H102.744ZM104.208 128.4L106.464 132H105L102.708 128.424L104.208 128.4Z" fill="black"></path>
                    <path d="M107.318 67.046H108.374V71H107.744V67.652H107.318V67.046Z" fill="black"></path>
                    <path d="M163.258 100.722C163.258 100.47 163.318 100.244 163.438 100.044C163.558 99.84 163.724 99.68 163.936 99.564C164.148 99.448 164.39 99.39 164.662 99.39C164.938 99.39 165.178 99.448 165.382 99.564C165.59 99.68 165.75 99.84 165.862 100.044C165.978 100.244 166.036 100.47 166.036 100.722C166.036 100.974 165.978 101.202 165.862 101.406C165.746 101.606 165.584 101.766 165.376 101.886C165.172 102.002 164.93 102.06 164.65 102.06C164.386 102.06 164.148 102.006 163.936 101.898C163.728 101.79 163.562 101.636 163.438 101.436C163.318 101.232 163.258 100.994 163.258 100.722ZM163.87 100.728C163.87 100.884 163.904 101.026 163.972 101.154C164.04 101.278 164.132 101.378 164.248 101.454C164.368 101.526 164.5 101.562 164.644 101.562C164.872 101.562 165.058 101.482 165.202 101.322C165.35 101.162 165.424 100.964 165.424 100.728C165.424 100.492 165.35 100.294 165.202 100.134C165.058 99.97 164.872 99.888 164.644 99.888C164.496 99.888 164.364 99.926 164.248 100.002C164.132 100.078 164.04 100.18 163.972 100.308C163.904 100.436 163.87 100.576 163.87 100.728Z" fill="black"></path>
                    <path d="M167.571 102.102C167.339 102.102 167.149 102.032 167.001 101.892C166.853 101.752 166.775 101.572 166.767 101.352V99.492H167.373V101.136C167.381 101.268 167.419 101.374 167.487 101.454C167.555 101.534 167.663 101.578 167.811 101.586C167.947 101.586 168.069 101.546 168.177 101.466C168.285 101.382 168.369 101.268 168.429 101.124C168.493 100.98 168.525 100.818 168.525 100.638V99.492H169.131V102H168.585L168.537 101.412L168.561 101.508C168.485 101.68 168.357 101.822 168.177 101.934C168.001 102.046 167.799 102.102 167.571 102.102Z" fill="black"></path>
                    <path d="M170.323 98.394H170.935V99.498H171.607V99.972H170.935V102H170.323V99.972H169.879V99.498H170.323V98.394Z" fill="black"></path>
                    <path d="M79.474 35.492H80.08V38H79.474V35.492ZM79.444 34.592C79.444 34.5 79.48 34.422 79.552 34.358C79.628 34.294 79.71 34.262 79.798 34.262C79.886 34.262 79.966 34.294 80.038 34.358C80.11 34.422 80.146 34.5 80.146 34.592C80.146 34.692 80.11 34.772 80.038 34.832C79.966 34.892 79.886 34.922 79.798 34.922C79.71 34.922 79.628 34.892 79.552 34.832C79.48 34.772 79.444 34.692 79.444 34.592Z" fill="black"></path>
                    <path d="M81.5727 35.492L81.6267 36.074L81.6027 35.99C81.6827 35.81 81.8107 35.666 81.9867 35.558C82.1667 35.45 82.3767 35.396 82.6167 35.396C82.8527 35.396 83.0467 35.466 83.1987 35.606C83.3507 35.742 83.4287 35.922 83.4327 36.146V38H82.8267V36.356C82.8227 36.228 82.7847 36.124 82.7127 36.044C82.6407 35.96 82.5287 35.916 82.3767 35.912C82.1647 35.912 81.9867 36 81.8427 36.176C81.7027 36.352 81.6327 36.578 81.6327 36.854V38H81.0267V35.492H81.5727Z" fill="black"></path>
                    <path d="M107.324 134C107.572 133.748 107.812 133.504 108.044 133.268C108.28 133.032 108.49 132.804 108.674 132.584C108.858 132.36 109.004 132.142 109.112 131.93C109.22 131.718 109.274 131.514 109.274 131.318C109.274 131.154 109.24 131.02 109.172 130.916C109.104 130.808 109.014 130.73 108.902 130.682C108.794 130.63 108.678 130.604 108.554 130.604C108.386 130.604 108.25 130.638 108.146 130.706C108.046 130.774 107.972 130.858 107.924 130.958C107.876 131.054 107.852 131.148 107.852 131.24C107.852 131.372 107.872 131.49 107.912 131.594C107.952 131.698 108.01 131.788 108.086 131.864L107.696 132.218C107.6 132.158 107.518 132.072 107.45 131.96C107.382 131.844 107.33 131.724 107.294 131.6C107.258 131.472 107.24 131.358 107.24 131.258C107.24 131.038 107.294 130.834 107.402 130.646C107.51 130.454 107.67 130.298 107.882 130.178C108.094 130.058 108.352 129.998 108.656 129.998C108.912 129.998 109.134 130.058 109.322 130.178C109.51 130.294 109.656 130.448 109.76 130.64C109.868 130.832 109.922 131.042 109.922 131.27C109.922 131.53 109.856 131.784 109.724 132.032C109.592 132.28 109.426 132.524 109.226 132.764C109.026 133.004 108.822 133.244 108.614 133.484L108.332 133.394H110.042V134H107.324Z" fill="black"></path>
                </svg>
            </aside>
            <section className="voltage-divider__content">
                <div className="voltage-divider__form-row">
                    <LabelInput text={<>V<sub>in</sub></>} onChange={handleVin} value={inputState.at(0)} />
                </div>
                <div className="voltage-divider__form-row">
                    <LabelSelect text={<>R<sub>1</sub></>} onChange={handleR1} value={inputState.at(1)}>
                        {values.map(item => (
                            <option key={item.id} value={item.value} disabled={!item.active}>{item.text}</option>
                        ))}
                    </LabelSelect>
                </div>
                <div className="voltage-divider__form-row">
                    <Button onClick={handleSwitch}>switch</Button>
                </div>
                <div className="voltage-divider__form-row">
                    <LabelSelect text={<>R<sub>2</sub></>} onChange={handleR2} value={inputState.at(2)}>
                        {values.map(item => (
                            <option key={item.id} value={item.value} disabled={!item.active}>{item.text}</option>
                        ))}
                    </LabelSelect>
                </div>
            </section>
            <footer className="voltage-divider__footer">
                <LabelOutput text={<>V<sub>out</sub></>} value={outputState} readOnly />
            </footer>
        </div>
    )
}