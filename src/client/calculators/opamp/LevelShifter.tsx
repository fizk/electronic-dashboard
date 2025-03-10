import React, { useState, useContext, ReactNode } from 'react';
import { FormStack } from '../../elements/Form';
import { Table, TableBody, TableColumn, TableHeader, TableRow } from '../../elements/Table';
import { VoltageInput } from '../../elements/ValueInput';
import { Section, Variants } from "../../elements/Section";
import { SummaryFooter } from "../../elements/SummaryFooter";
import classVariant from '../../helpers/classVariant';
import { isEmptyString } from '../../helpers/isEmpty';
import { ResistorValuesContext } from '../../contexts/ResistorValuesContext';
import './Levelshifter.css';

interface Props {
    state?: State
    variants?: Variants
    header?: ReactNode
}

interface State {
    inMin: string
    inMinUnit: number
    inMax: string
    inMaxUnit: number
    outMin: string
    outMinUnit: number
    outMax: string
    outMaxUnit: number
    bias: string
    biasUnit: number
}

interface FixedResistor {
    active: number
    id: string
    text: string
    tolerance: string
    value: number
}

type ResultEntry = [number, FixedResistor | null];

type ResultEntryRow = [
    ResultEntry, 
    ResultEntry, 
    ResultEntry
];

type Computed = [number, number, number]

const defaultState = {
    inMin: '0',
    inMinUnit: 1,
    inMax: '0',
    inMaxUnit: 1,
    outMin: '0',
    outMinUnit: 1,
    outMax: '0',
    outMaxUnit: 1,
    bias: '12',
    biasUnit: 1,
};

export default function Levelshifter ({
    state = defaultState,
    variants = [],
    header
}: Props) {
    const resistorValues = useContext(ResistorValuesContext);
    
    const e24Series = [
        1.0,
        1.1,
        1.2,
        1.3,
        1.5,
        1.6,
        1.8,
        2.0,
        2.2,
        2.4,
        2.7,
        3.0,
        3.3,
        3.6,
        3.9,
        4.3,
        4.7,
        5.1,
        5.6,
        6.2,
        6.8,
        7.5,
        8.2,
        9.1,
    ];
    
    const [internalState, setInternalState] = useState<State>(state);
    const [outputTable, setOutputTable] = useState<ResultEntryRow[]>([])
    
    const compute = (inMin: number, inMax: number, outMin: number, outMax: number, bias: number, baseValues: number[]): Computed[] => {
        const K = (outMax - outMin - inMax + inMin) / (inMax - inMin);
    
        const S = baseValues.map(b => {
    
            return [b, 
    
                (inMax * (1+ K) - outMax) === 0 
                    ? 1E+99
                    : (	(K   	*	bias  *	b)	/	(	(	(	inMax  *   (	1	+   K		)	)	-	outMax	)	)	-	b	)
            ];
        }).map(([b, s]) => {
            const one = b;
            const two = s;
            const three = inMax * (1+ K)-outMax === 0
                ? K * b
                : (	K 	*   b       *  s )   /   (  b       +   s);
            return [one, three, two];
        }).map(([a,b,c]) => {
            return [a, b, c === 1E+99 ? 'no bias' : c]
        });
    
        const ones: Computed[] = S.map(([a,b,c]) => [(a as number) * 1000, (b as number) * 1000, (c as number) * 1000]);
        const tens: Computed[] = S.map(([a,b,c]) => [(a as number) * 10*1000, (b as number) * 10*1000, (c as number) * 10*1000]);
    
        return [...ones, ...tens];
    }

    const compare = (table: Computed[], values): ResultEntryRow[] => {
        return table.map(([ground, feedback, bias]) => {
            const groundRange1 = [ ground-(ground*0.01), ground+(ground*0.01) ];
            const groundRange5 = [ ground-(ground*0.05), ground+(ground*0.05) ];
            const groundRange10 = [ ground-(ground*0.1), ground+(ground*0.1) ];
    
            const feedbackRange1 = [ feedback-(feedback*0.01), feedback+(feedback*0.01) ];
            const feedbackRange5 = [ feedback-(feedback*0.05), feedback+(feedback*0.05) ];
            const feedbackRange10 = [ feedback-(feedback*0.1), feedback+(feedback*0.1) ];
    
    
            const biasRange1 = [ bias-(bias*0.01), bias+(bias*0.01) ];
            const biasRange5 = [ bias-(bias*0.05), bias+(bias*0.05) ];
            const biasRange10 = [ bias-(bias*0.1), bias+(bias*0.1) ];
    
            const g: ResultEntry = [ground, null];
    
            for (let item of values) {
                if (item.value === ground) {
                    g[1] = {...item, tolerance: '0%'};
    
                } else if (item.value >= groundRange1[0] && item.value <= groundRange1[1]) {
                    if (g[1] !== null) {
    
                        if (Math.abs(g[0] - g[1].value) > Math.abs( g[0] - item.value)) {
                            g[1] = {...item, tolerance: '1%'};	
                        }
                    } else {
                        g[1] = {...item, tolerance: '1%'};	
                    }
                    
                } else if (item.value >= groundRange5[0] && item.value <= groundRange5[1]) {
                    if (g[1] !== null) {
                        if (Math.abs(g[0] - g[1].value) > Math.abs( g[0] - item.value)) {
                            g[1] = {...item, tolerance: '5%'};	
                        }
                    } else {
                        g[1] = {...item, tolerance: '5%'};	
                    }
    
                } else if (item.value >= groundRange10[0] && item.value <= groundRange10[1]) {
                    if (g[1] !== null) {
                        if (Math.abs(g[0] - g[1].value) > Math.abs( g[0] - item.value)) {
                            g[1] = {...item, tolerance: '10%'};	
                        }
                    } else {
                        g[1] = {...item, tolerance: '10%'};	
                    }
    
                }
                
            }
    
            const f: ResultEntry = [feedback, null];
    
            for (let item of values) {
                if (item.value === feedback) {
                    f[1] = {...item, tolerance: '0%'};	
    
                } else if (item.value >= feedbackRange1[0] && item.value <= feedbackRange1[1]) {
                    if (f[1] !== null) {
                        if (Math.abs(f[0] - f[1].value) > Math.abs( f[0] - item.value)) {
                            f[1] = {...item, tolerance: '1%'};	
                        }
                    } else {
                        f[1] = {...item, tolerance: '1%'};	
                    }
    
                } else if (item.value >= feedbackRange5[0] && item.value <= feedbackRange5[1]) {
                    if (f[1] !== null) {
                        if (Math.abs(f[0] - f[1].value) > Math.abs( f[0] - item.value)) {
                            f[1] = {...item, tolerance: '5%'};	
                        }
                    } else {
                        f[1] = {...item, tolerance: '5%'};	
                    }

                } else if (item.value >= feedbackRange10[0] && item.value <= feedbackRange10[1]) {
                    if (f[1] !== null) {
                        if (Math.abs(f[0] - f[1].value) > Math.abs( f[0] - item.value)) {
                            f[1] = {...item, tolerance: '10%'};	
                        }
                    } else {
                        f[1] = {...item, tolerance: '10%'};	
                    }
                } else {
                    continue;
                }
                
            }
    
            const b: ResultEntry = [bias, null];
    
            for (let item of values) {
    
                if (item.value === bias) {
                    b[1] = {...item, tolerance: '0%'};
    
                } else if (item.value >= biasRange1[0] && item.value <= biasRange1[1]) {
                    if (b[1] !== null) {
                        if (Math.abs(b[0] - b[1].value) > Math.abs( b[0] - item.value)) {
                            b[1] = {...item, tolerance: '1%'};	
                        }
                    } else {
                        b[1] = {...item, tolerance: '1%'};	
                    }
    
                } else if (item.value >= biasRange5[0] && item.value <= biasRange5[1]) {
                    if (b[1] !== null) {
                        if (Math.abs(b[0] - b[1].value) > Math.abs( b[0] - item.value)) {
                            b[1] = {...item, tolerance: '10%'};	
                        }
                    } else {
                        b[1] = {...item, tolerance: '10%'};	
                    }
    
                } else if (item.value >= biasRange10[0] && item.value <= biasRange10[1]) {
                    if (b[1] !== null) {
                        if (Math.abs(b[0] - b[1].value) > Math.abs( b[0] - item.value)) {
                            b[1] = {...item, tolerance: '10%'};	
                        }
                    } else {
                        b[1] = {...item, tolerance: '10%'};	
                    }
    
                } else {
                    continue;
                }
                
            }
    
            return [g, f, b];
    
        });
    }

    const handleInMinValueChange = (value: string) => setState({
        ...internalState,
        inMin: value,
    });

    const handleInMinUnitChange = (value: string) => setState({
        ...internalState,
        inMinUnit: parseFloat(value),
    });

    const handleInMaxValueChange = (value: string) => setState({
        ...internalState,
        inMax: value,
    });

    const handleInMaxUnitChange = (value: string) => setState({
        ...internalState,
        inMaxUnit: parseFloat(value),
    });

    const handleOutMinValueChange = (value: string) => setState({
        ...internalState,
        outMin: value,
    });

    const handleOutMinUnitChange = (value: string) => setState({
        ...internalState,
        outMinUnit: parseFloat(value),
    });

    const handleOutMaxValueChange = (value: string) => setState({
        ...internalState,
        outMax: value,
    });

    const handleOutMaxUnitChange = (value: string) => setState({
        ...internalState,
        outMaxUnit: parseFloat(value),
    });
    
    const handleBiasValueChange = (value: string) => setState({
        ...internalState,
        bias: value,
    });
    
    const handleBiasUnitChange = (value: string) => setState({
        ...internalState,
        biasUnit: parseFloat(value),
    });

    const setState = (state: State) => {
        setInternalState(state);

        const isSomeEmpty = [
            state.inMin, state.inMax, state.outMin, state.outMax, state.bias
        ].some(isEmptyString);

        if (isSomeEmpty) return;
        
        const table = compute(
            parseFloat(state.inMin) * state.inMinUnit,
            parseFloat(state.inMax) * state.inMaxUnit,
            parseFloat(state.outMin) * state.outMinUnit,
            parseFloat(state.outMax) * state.outMaxUnit,
            parseFloat(state.bias) * state.biasUnit,
            e24Series
        );
        
        setOutputTable(compare(table, resistorValues));
    }
    
    return (
        <article>
            {header && (
                <header>{header}</header>
            )}
            <Section variant={variants}>
                <form className="level-shifter__form">
                    <fieldset className="level-shifter__fieldset">
                        <legend>In</legend>
                        <FormStack>
                            <VoltageInput value={internalState.inMin} 
                                text={<>V<sub>min</sub></>}
                                unit={internalState.inMinUnit}
                                onValueChange={handleInMinValueChange} 
                                onUnitChange={handleInMinUnitChange}
                            />
                            <VoltageInput value={internalState.inMax} 
                                text={<>V<sub>max</sub></>}
                                unit={internalState.inMaxUnit}
                                onValueChange={handleInMaxValueChange} 
                                onUnitChange={handleInMaxUnitChange}
                            />
                        </FormStack>
                    </fieldset>
                    <fieldset className="level-shifter__fieldset">
                        <legend>Out</legend>
                        <FormStack>
                            <VoltageInput value={internalState.outMin} 
                                unit={internalState.outMinUnit}
                                text={<>V<sub>min</sub></>}
                                onValueChange={handleOutMinValueChange} 
                                onUnitChange={handleOutMinUnitChange}
                            />
                            <VoltageInput value={internalState.outMax} 
                                text={<>V<sub>max</sub></>}
                                unit={internalState.outMaxUnit}
                                onValueChange={handleOutMaxValueChange} 
                                onUnitChange={handleOutMaxUnitChange} 
                            />
                        </FormStack>
                    </fieldset>
                    <fieldset className="level-shifter__fieldset">
                        <legend>Bias</legend>
                        <FormStack>
                            <VoltageInput value={internalState.bias} 
                                text={<>V<sub>bias</sub></>}
                                unit={internalState.biasUnit}
                                onValueChange={handleBiasValueChange}  
                                onUnitChange={handleBiasUnitChange}
                            />
                        </FormStack>
                    </fieldset>
                </form>
            </Section>
            
            <section className="level-shifter__output">
                <Table variants={['full', 'stick']}>
                    <TableHeader>
                        <TableRow>
                            <TableColumn>R<sub>ground</sub></TableColumn>
                            <TableColumn colSpan={3} variants={['begin', 'end']}>R<sub>feedback</sub></TableColumn>
                            <TableColumn colSpan={3}>R<sub>bias</sub></TableColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="table__body">
                        {outputTable.map(item => (
                            <TableRow key={`${item.at(0)}${item.at(1)}${item.at(2)}`}>
                                <TableColumn variants={(item.at(0)?.at(1) as FixedResistor)?.active ? ['active'] : []}>
                                    <strong>{((item.at(0)?.at(0) as number) / 1000).toFixed(1) + 'k'}</strong>
                                </TableColumn>

                                {isNaN( item.at(1)?.at(0) as number ) && (
                                    <TableColumn variants={['begin', 'end']} colSpan={3}>no value</TableColumn>
                                )}
                                {( item.at(1)?.at(0) as number ) <= 0 && (
                                    <TableColumn variants={['begin', 'end']} colSpan={3}>negtive value</TableColumn>
                                )}
                                {!isNaN( item.at(1)?.at(0) as number ) && ( item.at(1)?.at(0) as number ) > 0 && (
                                    <>
                                        <TableColumn variants={(item.at(1)?.at(1) as FixedResistor)?.active ? ['active', 'begin'] : ['begin']}>
                                            <small>{((item.at(1)?.at(0) as number / 1000).toFixed(3) + 'k')}</small>
                                        </TableColumn>
                                        <TableColumn variants={(item.at(1)?.at(1) as FixedResistor)?.active ? ['active'] : []}>
                                            <strong>{(item.at(1)?.at(1) as FixedResistor)?.text}</strong>
                                        </TableColumn>
                                        <TableColumn variants={(item.at(1)?.at(1) as FixedResistor)?.active ? ['active', 'end'] : ['end']}>
                                            <small>({(item.at(1)?.at(1) as FixedResistor)?.tolerance})</small>
                                        </TableColumn>
                                    </>
                                )}

                                {isNaN( item.at(2)?.at(0) as number ) && (
                                    <TableColumn variants={['begin', 'end']} colSpan={3}>no value</TableColumn>
                                )}
                                {( item.at(2)?.at(0) as number ) <= 0 && (
                                    <TableColumn variants={['begin', 'end']} colSpan={3}>negtive value</TableColumn>
                                )}
                                {!isNaN( item.at(2)?.at(0) as number ) && ( item.at(2)?.at(0) as number ) > 0 && (
                                    <>
                                        <TableColumn variants={(item.at(2)?.at(1) as FixedResistor)?.active ? ['active', 'begin'] : ['begin']}>
                                            <small>{((item.at(2)?.at(0) as number / 1000).toFixed(3) + 'k')}</small>
                                        </TableColumn>
                                        <TableColumn variants={(item.at(2)?.at(1) as FixedResistor)?.active ? ['active'] : []}>
                                            <strong>{(item.at(2)?.at(1) as FixedResistor)?.text}</strong>
                                        </TableColumn>
                                        <TableColumn variants={(item.at(2)?.at(1) as FixedResistor)?.active ? ['active', 'end'] : ['end']}>
                                            <small>({(item.at(2)?.at(1) as FixedResistor)?.tolerance})</small>
                                        </TableColumn>
                                    </>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <SummaryFooter label="Description">

                <svg width="325" height="261" viewBox="0 0 325 261" fill="none" className="schematics">
                    <circle cx="44.5" cy="34.9688" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <circle cx="284.5" cy="51" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <circle cx="124.1" cy="222.5" r="3.5" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <path d="M33.9938 35.3279H34.8418L34.8498 35.9999C34.9511 35.7759 35.1111 35.5919 35.3298 35.4479C35.5484 35.3039 35.8044 35.2319 36.0978 35.2319C36.4764 35.2319 36.7671 35.3119 36.9698 35.4719C37.1724 35.6266 37.3084 35.8453 37.3778 36.1279C37.4471 36.4106 37.4818 36.7786 37.4818 37.2319V38.9999H36.6178V37.2559C36.6178 36.7919 36.5724 36.4586 36.4818 36.2559C36.3911 36.0479 36.2044 35.9439 35.9218 35.9439C35.7618 35.9439 35.5991 35.9946 35.4338 36.0959C35.2684 36.1919 35.1298 36.3333 35.0178 36.5199C34.9111 36.7066 34.8578 36.9253 34.8578 37.1759V38.9999H33.9938V35.3279Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M31.9016 35.328H32.7976V39H31.9016V35.328ZM32.3416 34.64C32.1762 34.64 32.0376 34.584 31.9256 34.472C31.8136 34.36 31.7576 34.2213 31.7576 34.056C31.7576 33.9066 31.8136 33.7786 31.9256 33.672C32.0376 33.5653 32.1762 33.512 32.3416 33.512C32.5016 33.512 32.6376 33.5653 32.7496 33.672C32.8616 33.7786 32.9176 33.9066 32.9176 34.056C32.9176 34.2213 32.8616 34.36 32.7496 34.472C32.6429 34.584 32.5069 34.64 32.3416 34.64Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M21.776 28.71H23.554L26.634 35.78L29.728 28.71H31.492L26.746 39H26.536L21.776 28.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M311.158 55.032H310.51V54.328H311.158V52.832L312.03 52.64V54.328H312.878V55.032H312.03V58H311.158V55.032Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M307.664 58.08C307.158 58.08 306.808 57.9307 306.616 57.632C306.43 57.3333 306.336 56.9173 306.336 56.384V54.328H307.2V56.168C307.2 56.472 307.216 56.7093 307.248 56.88C307.286 57.0453 307.355 57.168 307.456 57.248C307.563 57.328 307.72 57.368 307.928 57.368C308.078 57.368 308.222 57.3253 308.36 57.24C308.499 57.1547 308.611 57.04 308.696 56.896C308.787 56.7467 308.832 56.584 308.832 56.408V54.328H309.688V58H308.984L308.888 57.464C308.755 57.672 308.587 57.8267 308.384 57.928C308.187 58.0293 307.947 58.08 307.664 58.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M303.55 58.0799C303.171 58.0799 302.835 57.9946 302.542 57.8239C302.248 57.6533 302.022 57.4213 301.862 57.1279C301.702 56.8346 301.622 56.5093 301.622 56.1519C301.622 55.7999 301.699 55.4773 301.854 55.1839C302.014 54.8906 302.24 54.6586 302.534 54.4879C302.827 54.3173 303.166 54.2319 303.55 54.2319C303.934 54.2319 304.27 54.3173 304.558 54.4879C304.851 54.6586 305.075 54.8906 305.23 55.1839C305.39 55.4773 305.47 55.7999 305.47 56.1519C305.47 56.5093 305.39 56.8346 305.23 57.1279C305.07 57.4213 304.843 57.6533 304.55 57.8239C304.262 57.9946 303.928 58.0799 303.55 58.0799ZM303.574 57.3759C303.883 57.3759 304.126 57.2613 304.302 57.0319C304.483 56.8026 304.574 56.5146 304.574 56.1679C304.574 55.8213 304.478 55.5306 304.286 55.2959C304.094 55.0559 303.84 54.9359 303.526 54.9359C303.222 54.9359 302.976 55.0533 302.79 55.2879C302.608 55.5226 302.518 55.8159 302.518 56.1679C302.518 56.5093 302.616 56.7973 302.814 57.0319C303.011 57.2613 303.264 57.3759 303.574 57.3759Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M291.776 47.71H293.554L296.634 54.78L299.728 47.71H301.492L296.746 58H296.536L291.776 47.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <circle cx="231" cy="51" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                    <line x1="208" y1="51" x2="281" y2="51" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="145" y1="35" x2="47" y2="35" className={classVariant('schematics', ['stroke-dark'])}/>
                    <path d="M145 85.3275V16.6725L208.887 51L145 85.3275Z" className={classVariant('schematics', ['stroke-dark'])}/>
                    <rect x="149" y="65.5312" width="10" height="2" className={classVariant('schematics', ['fill-dark'])}/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M155 30.5312H153V34.5312H149V36.5312H153V40.5312H155V36.5312H159V34.5312H155V30.5312Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <line x1="25" y1="116" x2="231" y2="116" className={classVariant('schematics', ['stroke-dark'])}/>
                    <rect x="156" y="123" width="14" height="44" transform="rotate(-90 156 123)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <rect x="47" y="123" width="14" height="44" transform="rotate(-90 47 123)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <path d="M198.347 105H197.331L196.587 103.8L196.379 103.392L195.899 103.912V105H195.067V99.12H195.891V102.344L195.875 102.968L197.275 101.328H198.339L196.955 102.864L198.347 105Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M193.012 105.08C192.65 105.08 192.322 105.003 192.028 104.848C191.74 104.688 191.511 104.461 191.34 104.168C191.17 103.869 191.084 103.52 191.084 103.12C191.084 102.741 191.162 102.411 191.316 102.128C191.476 101.84 191.698 101.619 191.98 101.464C192.268 101.309 192.599 101.232 192.972 101.232C193.255 101.232 193.498 101.269 193.7 101.344C193.908 101.413 194.071 101.501 194.188 101.608L193.804 102.304C193.58 102.08 193.327 101.968 193.044 101.968C192.703 101.968 192.442 102.072 192.26 102.28C192.084 102.488 191.996 102.765 191.996 103.112C191.996 103.507 192.087 103.813 192.268 104.032C192.455 104.251 192.714 104.36 193.044 104.36C193.21 104.36 193.37 104.336 193.524 104.288C193.684 104.24 193.807 104.184 193.892 104.12L194.204 104.728C194.087 104.819 193.922 104.901 193.708 104.976C193.5 105.045 193.268 105.08 193.012 105.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M188.003 105.08C187.672 105.08 187.365 105.003 187.083 104.848C186.805 104.688 186.581 104.464 186.411 104.176C186.245 103.883 186.163 103.541 186.163 103.152C186.163 102.768 186.235 102.432 186.379 102.144C186.528 101.856 186.739 101.632 187.011 101.472C187.283 101.312 187.603 101.232 187.971 101.232C188.184 101.232 188.384 101.269 188.571 101.344C188.757 101.419 188.915 101.512 189.043 101.624C189.171 101.731 189.256 101.837 189.299 101.944L189.315 101.328H190.139V105H189.323L189.307 104.352C189.216 104.544 189.051 104.715 188.811 104.864C188.571 105.008 188.301 105.08 188.003 105.08ZM188.147 104.36C188.451 104.36 188.707 104.256 188.915 104.048C189.123 103.835 189.227 103.557 189.227 103.216V103.16C189.227 102.931 189.179 102.725 189.083 102.544C188.987 102.363 188.856 102.221 188.691 102.12C188.525 102.019 188.344 101.968 188.147 101.968C187.805 101.968 187.541 102.08 187.355 102.304C187.168 102.523 187.075 102.808 187.075 103.16C187.075 103.517 187.165 103.808 187.347 104.032C187.533 104.251 187.8 104.36 188.147 104.36Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M183.617 105.08C183.318 105.08 183.049 105.008 182.809 104.864C182.574 104.715 182.412 104.544 182.321 104.352L182.305 105H181.473V99.12H182.321V101.384L182.281 102.008C182.372 101.795 182.548 101.613 182.809 101.464C183.076 101.309 183.364 101.232 183.673 101.232C184.036 101.232 184.35 101.315 184.617 101.48C184.889 101.64 185.097 101.867 185.241 102.16C185.385 102.448 185.457 102.784 185.457 103.168C185.457 103.557 185.372 103.896 185.201 104.184C185.036 104.472 184.812 104.693 184.529 104.848C184.252 105.003 183.948 105.08 183.617 105.08ZM183.473 104.36C183.82 104.36 184.086 104.251 184.273 104.032C184.46 103.808 184.553 103.52 184.553 103.168C184.553 102.811 184.46 102.523 184.273 102.304C184.092 102.08 183.825 101.968 183.473 101.968C183.169 101.968 182.913 102.075 182.705 102.288C182.497 102.496 182.393 102.771 182.393 103.112V103.168C182.393 103.397 182.441 103.603 182.537 103.784C182.638 103.965 182.769 104.107 182.929 104.208C183.094 104.309 183.276 104.36 183.473 104.36Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M178.151 105.08C177.82 105.08 177.514 105.003 177.231 104.848C176.954 104.688 176.73 104.464 176.559 104.176C176.394 103.883 176.311 103.541 176.311 103.152C176.311 102.571 176.474 102.107 176.799 101.76C177.124 101.408 177.564 101.232 178.119 101.232C178.428 101.232 178.711 101.309 178.967 101.464C179.223 101.613 179.396 101.795 179.487 102.008L179.447 101.384V99.12H180.295V105H179.471L179.455 104.352C179.364 104.544 179.199 104.715 178.959 104.864C178.719 105.008 178.45 105.08 178.151 105.08ZM178.295 104.352C178.599 104.352 178.855 104.248 179.063 104.04C179.271 103.827 179.375 103.549 179.375 103.208V103.152C179.375 102.923 179.327 102.717 179.231 102.536C179.135 102.355 179.004 102.213 178.839 102.112C178.674 102.011 178.492 101.96 178.295 101.96C177.954 101.96 177.69 102.072 177.503 102.296C177.316 102.515 177.223 102.8 177.223 103.152C177.223 103.509 177.314 103.8 177.495 104.024C177.682 104.243 177.948 104.352 178.295 104.352Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M174.005 105.08C173.568 105.08 173.203 104.995 172.909 104.824C172.616 104.648 172.4 104.416 172.261 104.128C172.123 103.835 172.053 103.515 172.053 103.168C172.053 102.779 172.133 102.437 172.293 102.144C172.459 101.851 172.685 101.627 172.973 101.472C173.261 101.312 173.587 101.232 173.949 101.232C174.515 101.232 174.933 101.389 175.205 101.704C175.483 102.013 175.621 102.451 175.621 103.016C175.621 103.16 175.613 103.309 175.597 103.464H172.957C173.016 103.789 173.131 104.024 173.301 104.168C173.477 104.312 173.72 104.384 174.029 104.384C174.285 104.384 174.496 104.363 174.661 104.32C174.827 104.277 174.979 104.219 175.117 104.144L175.381 104.76C175.248 104.845 175.067 104.92 174.837 104.984C174.608 105.048 174.331 105.08 174.005 105.08ZM174.781 102.864C174.787 102.533 174.715 102.301 174.565 102.168C174.416 102.029 174.203 101.96 173.925 101.96C173.365 101.96 173.043 102.261 172.957 102.864H174.781Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M169.747 105.08C169.31 105.08 168.945 104.995 168.651 104.824C168.358 104.648 168.142 104.416 168.003 104.128C167.865 103.835 167.795 103.515 167.795 103.168C167.795 102.779 167.875 102.437 168.035 102.144C168.201 101.851 168.427 101.627 168.715 101.472C169.003 101.312 169.329 101.232 169.691 101.232C170.257 101.232 170.675 101.389 170.947 101.704C171.225 102.013 171.363 102.451 171.363 103.016C171.363 103.16 171.355 103.309 171.339 103.464H168.699C168.758 103.789 168.873 104.024 169.043 104.168C169.219 104.312 169.462 104.384 169.771 104.384C170.027 104.384 170.238 104.363 170.403 104.32C170.569 104.277 170.721 104.219 170.859 104.144L171.123 104.76C170.99 104.845 170.809 104.92 170.579 104.984C170.35 105.048 170.073 105.08 169.747 105.08ZM170.523 102.864C170.529 102.533 170.457 102.301 170.307 102.168C170.158 102.029 169.945 101.96 169.667 101.96C169.107 101.96 168.785 102.261 168.699 102.864H170.523Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M165.457 102.016H164.865V101.328H165.457V100.536C165.457 100.056 165.572 99.6853 165.801 99.4239C166.036 99.1573 166.377 99.0239 166.825 99.0239C167.006 99.0239 167.212 99.0746 167.441 99.1759L167.273 99.9919C167.236 99.9493 167.177 99.9093 167.097 99.8719C167.022 99.8293 166.94 99.8079 166.849 99.8079C166.492 99.8079 166.31 100.04 166.305 100.504V101.328H167.169V102.016H166.305V105H165.457V102.016Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M162.23 105L160.158 101.108C159.729 101.127 159.346 101.136 159.01 101.136H158.618V105H157.092V94.71H159.43C160.615 94.71 161.591 94.9573 162.356 95.452C163.121 95.9373 163.504 96.7306 163.504 97.832C163.504 98.5226 163.341 99.12 163.014 99.624C162.697 100.119 162.221 100.501 161.586 100.772L164.036 105H162.23ZM159.612 99.862C160.527 99.862 161.152 99.666 161.488 99.274C161.833 98.8726 162.006 98.3966 162.006 97.846C162.006 96.6233 161.189 96.012 159.556 96.012H158.618V99.862H159.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M157.393 176.08C157.137 176.08 156.87 176.048 156.593 175.984C156.321 175.915 156.126 175.835 156.009 175.744L156.297 175.064C156.617 175.288 156.982 175.4 157.393 175.4C157.803 175.4 158.009 175.28 158.009 175.04C158.009 174.933 157.966 174.851 157.881 174.792C157.795 174.733 157.643 174.664 157.425 174.584L157.121 174.472C156.801 174.344 156.547 174.192 156.361 174.016C156.174 173.835 156.081 173.597 156.081 173.304C156.081 172.968 156.211 172.707 156.473 172.52C156.739 172.328 157.094 172.232 157.537 172.232C157.755 172.232 157.969 172.256 158.177 172.304C158.39 172.352 158.553 172.413 158.665 172.488L158.353 173.176C158.283 173.107 158.171 173.048 158.017 173C157.867 172.947 157.699 172.92 157.513 172.92C157.134 172.92 156.945 173.035 156.945 173.264C156.945 173.392 156.995 173.491 157.097 173.56C157.198 173.624 157.363 173.696 157.593 173.776C157.614 173.781 157.697 173.811 157.841 173.864C158.182 173.997 158.435 174.149 158.601 174.32C158.766 174.491 158.849 174.709 158.849 174.976C158.849 175.339 158.71 175.613 158.433 175.8C158.161 175.987 157.814 176.08 157.393 176.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M152.831 176.08C152.5 176.08 152.193 176.003 151.911 175.848C151.633 175.688 151.409 175.464 151.239 175.176C151.073 174.883 150.991 174.541 150.991 174.152C150.991 173.768 151.063 173.432 151.207 173.144C151.356 172.856 151.567 172.632 151.839 172.472C152.111 172.312 152.431 172.232 152.799 172.232C153.012 172.232 153.212 172.269 153.399 172.344C153.585 172.419 153.743 172.512 153.871 172.624C153.999 172.731 154.084 172.837 154.127 172.944L154.143 172.328H154.967V176H154.151L154.135 175.352C154.044 175.544 153.879 175.715 153.639 175.864C153.399 176.008 153.129 176.08 152.831 176.08ZM152.975 175.36C153.279 175.36 153.535 175.256 153.743 175.048C153.951 174.835 154.055 174.557 154.055 174.216V174.16C154.055 173.931 154.007 173.725 153.911 173.544C153.815 173.363 153.684 173.221 153.519 173.12C153.353 173.019 153.172 172.968 152.975 172.968C152.633 172.968 152.369 173.08 152.183 173.304C151.996 173.523 151.903 173.808 151.903 174.16C151.903 174.517 151.993 174.808 152.175 175.032C152.361 175.251 152.628 175.36 152.975 175.36Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M149.114 172.328H150.01V176H149.114V172.328ZM149.554 171.64C149.389 171.64 149.25 171.584 149.138 171.472C149.026 171.36 148.97 171.221 148.97 171.056C148.97 170.907 149.026 170.779 149.138 170.672C149.25 170.565 149.389 170.512 149.554 170.512C149.714 170.512 149.85 170.565 149.962 170.672C150.074 170.779 150.13 170.907 150.13 171.056C150.13 171.221 150.074 171.36 149.962 171.472C149.856 171.584 149.72 171.64 149.554 171.64Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M146.289 176.08C145.99 176.08 145.721 176.008 145.481 175.864C145.246 175.715 145.084 175.544 144.993 175.352L144.977 176H144.145V170.12H144.993V172.384L144.953 173.008C145.044 172.795 145.22 172.613 145.481 172.464C145.748 172.309 146.036 172.232 146.345 172.232C146.708 172.232 147.022 172.315 147.289 172.48C147.561 172.64 147.769 172.867 147.913 173.16C148.057 173.448 148.129 173.784 148.129 174.168C148.129 174.557 148.044 174.896 147.873 175.184C147.708 175.472 147.484 175.693 147.201 175.848C146.924 176.003 146.62 176.08 146.289 176.08ZM146.145 175.36C146.492 175.36 146.758 175.251 146.945 175.032C147.132 174.808 147.225 174.52 147.225 174.168C147.225 173.811 147.132 173.523 146.945 173.304C146.764 173.08 146.497 172.968 146.145 172.968C145.841 172.968 145.585 173.075 145.377 173.288C145.169 173.496 145.065 173.771 145.065 174.112V174.168C145.065 174.397 145.113 174.603 145.209 174.784C145.31 174.965 145.441 175.107 145.601 175.208C145.766 175.309 145.948 175.36 146.145 175.36Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M141.23 176L139.158 172.108C138.729 172.127 138.346 172.136 138.01 172.136H137.618V176H136.092V165.71H138.43C139.615 165.71 140.591 165.957 141.356 166.452C142.121 166.937 142.504 167.731 142.504 168.832C142.504 169.523 142.341 170.12 142.014 170.624C141.697 171.119 141.221 171.501 140.586 171.772L143.036 176H141.23ZM138.612 170.862C139.527 170.862 140.152 170.666 140.488 170.274C140.833 169.873 141.006 169.397 141.006 168.846C141.006 167.623 140.189 167.012 138.556 167.012H137.618V170.862H138.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M134.117 242.08C133.861 242.08 133.594 242.048 133.317 241.984C133.045 241.915 132.85 241.835 132.733 241.744L133.021 241.064C133.341 241.288 133.706 241.4 134.117 241.4C134.528 241.4 134.733 241.28 134.733 241.04C134.733 240.933 134.69 240.851 134.605 240.792C134.52 240.733 134.368 240.664 134.149 240.584L133.845 240.472C133.525 240.344 133.272 240.192 133.085 240.016C132.898 239.835 132.805 239.597 132.805 239.304C132.805 238.968 132.936 238.707 133.197 238.52C133.464 238.328 133.818 238.232 134.261 238.232C134.48 238.232 134.693 238.256 134.901 238.304C135.114 238.352 135.277 238.413 135.389 238.488L135.077 239.176C135.008 239.107 134.896 239.048 134.741 239C134.592 238.947 134.424 238.92 134.237 238.92C133.858 238.92 133.669 239.035 133.669 239.264C133.669 239.392 133.72 239.491 133.821 239.56C133.922 239.624 134.088 239.696 134.317 239.776C134.338 239.781 134.421 239.811 134.565 239.864C134.906 239.997 135.16 240.149 135.325 240.32C135.49 240.491 135.573 240.709 135.573 240.976C135.573 241.339 135.434 241.613 135.157 241.8C134.885 241.987 134.538 242.08 134.117 242.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M129.555 242.08C129.225 242.08 128.918 242.003 128.635 241.848C128.358 241.688 128.134 241.464 127.963 241.176C127.798 240.883 127.715 240.541 127.715 240.152C127.715 239.768 127.787 239.432 127.931 239.144C128.081 238.856 128.291 238.632 128.563 238.472C128.835 238.312 129.155 238.232 129.523 238.232C129.737 238.232 129.937 238.269 130.123 238.344C130.31 238.419 130.467 238.512 130.595 238.624C130.723 238.731 130.809 238.837 130.851 238.944L130.867 238.328H131.691V242H130.875L130.859 241.352C130.769 241.544 130.603 241.715 130.363 241.864C130.123 242.008 129.854 242.08 129.555 242.08ZM129.699 241.36C130.003 241.36 130.259 241.256 130.467 241.048C130.675 240.835 130.779 240.557 130.779 240.216V240.16C130.779 239.931 130.731 239.725 130.635 239.544C130.539 239.363 130.409 239.221 130.243 239.12C130.078 239.019 129.897 238.968 129.699 238.968C129.358 238.968 129.094 239.08 128.907 239.304C128.721 239.523 128.627 239.808 128.627 240.16C128.627 240.517 128.718 240.808 128.899 241.032C129.086 241.251 129.353 241.36 129.699 241.36Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M125.839 238.328H126.735V242H125.839V238.328ZM126.279 237.64C126.114 237.64 125.975 237.584 125.863 237.472C125.751 237.36 125.695 237.221 125.695 237.056C125.695 236.907 125.751 236.779 125.863 236.672C125.975 236.565 126.114 236.512 126.279 236.512C126.439 236.512 126.575 236.565 126.687 236.672C126.799 236.779 126.855 236.907 126.855 237.056C126.855 237.221 126.799 237.36 126.687 237.472C126.58 237.584 126.444 237.64 126.279 237.64Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M123.014 242.08C122.715 242.08 122.446 242.008 122.206 241.864C121.971 241.715 121.808 241.544 121.718 241.352L121.702 242H120.87V236.12H121.718V238.384L121.678 239.008C121.768 238.795 121.944 238.613 122.206 238.464C122.472 238.309 122.76 238.232 123.07 238.232C123.432 238.232 123.747 238.315 124.014 238.48C124.286 238.64 124.494 238.867 124.638 239.16C124.782 239.448 124.854 239.784 124.854 240.168C124.854 240.557 124.768 240.896 124.598 241.184C124.432 241.472 124.208 241.693 123.926 241.848C123.648 242.003 123.344 242.08 123.014 242.08ZM122.87 241.36C123.216 241.36 123.483 241.251 123.67 241.032C123.856 240.808 123.95 240.52 123.95 240.168C123.95 239.811 123.856 239.523 123.67 239.304C123.488 239.08 123.222 238.968 122.87 238.968C122.566 238.968 122.31 239.075 122.102 239.288C121.894 239.496 121.79 239.771 121.79 240.112V240.168C121.79 240.397 121.838 240.603 121.934 240.784C122.035 240.965 122.166 241.107 122.326 241.208C122.491 241.309 122.672 241.36 122.87 241.36Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M110.776 231.71H112.554L115.634 238.78L118.728 231.71H120.492L115.746 242H115.536L110.776 231.71Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M83.0729 105.08C82.7422 105.08 82.4356 105.003 82.1529 104.848C81.8756 104.688 81.6516 104.464 81.4809 104.176C81.3156 103.883 81.2329 103.541 81.2329 103.152C81.2329 102.571 81.3956 102.107 81.7209 101.76C82.0462 101.408 82.4862 101.232 83.0409 101.232C83.3502 101.232 83.6329 101.309 83.8889 101.464C84.1449 101.613 84.3182 101.795 84.4089 102.008L84.3689 101.384V99.12H85.2169V105H84.3929L84.3769 104.352C84.2862 104.544 84.1209 104.715 83.8809 104.864C83.6409 105.008 83.3716 105.08 83.0729 105.08ZM83.2169 104.352C83.5209 104.352 83.7769 104.248 83.9849 104.04C84.1929 103.827 84.2969 103.549 84.2969 103.208V103.152C84.2969 102.923 84.2489 102.717 84.1529 102.536C84.0569 102.355 83.9262 102.213 83.7609 102.112C83.5956 102.011 83.4142 101.96 83.2169 101.96C82.8756 101.96 82.6116 102.072 82.4249 102.296C82.2382 102.515 82.1449 102.8 82.1449 103.152C82.1449 103.509 82.2356 103.8 82.4169 104.024C82.6036 104.243 82.8702 104.352 83.2169 104.352Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M76.8473 101.328H77.6953L77.7033 102C77.8046 101.776 77.9646 101.592 78.1833 101.448C78.402 101.304 78.658 101.232 78.9513 101.232C79.33 101.232 79.6206 101.312 79.8233 101.472C80.026 101.627 80.162 101.845 80.2313 102.128C80.3006 102.411 80.3353 102.779 80.3353 103.232V105H79.4713V103.256C79.4713 102.792 79.426 102.459 79.3353 102.256C79.2446 102.048 79.058 101.944 78.7753 101.944C78.6153 101.944 78.4526 101.995 78.2873 102.096C78.122 102.192 77.9833 102.333 77.8713 102.52C77.7646 102.707 77.7113 102.925 77.7113 103.176V105H76.8473V101.328Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M73.6741 105.08C73.1674 105.08 72.8181 104.931 72.6261 104.632C72.4394 104.333 72.3461 103.917 72.3461 103.384V101.328H73.2101V103.168C73.2101 103.472 73.2261 103.709 73.2581 103.88C73.2954 104.045 73.3647 104.168 73.4661 104.248C73.5727 104.328 73.7301 104.368 73.9381 104.368C74.0874 104.368 74.2314 104.325 74.3701 104.24C74.5087 104.155 74.6207 104.04 74.7061 103.896C74.7967 103.747 74.8421 103.584 74.8421 103.408V101.328H75.6981V105H74.9941L74.8981 104.464C74.7647 104.672 74.5967 104.827 74.3941 104.928C74.1967 105.029 73.9567 105.08 73.6741 105.08Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M69.5593 105.08C69.1807 105.08 68.8447 104.995 68.5513 104.824C68.258 104.653 68.0313 104.421 67.8713 104.128C67.7113 103.835 67.6313 103.509 67.6313 103.152C67.6313 102.8 67.7087 102.477 67.8633 102.184C68.0233 101.891 68.25 101.659 68.5433 101.488C68.8367 101.317 69.1753 101.232 69.5593 101.232C69.9433 101.232 70.2793 101.317 70.5673 101.488C70.8607 101.659 71.0847 101.891 71.2393 102.184C71.3993 102.477 71.4793 102.8 71.4793 103.152C71.4793 103.509 71.3993 103.835 71.2393 104.128C71.0793 104.421 70.8527 104.653 70.5593 104.824C70.2713 104.995 69.938 105.08 69.5593 105.08ZM69.5833 104.376C69.8927 104.376 70.1353 104.261 70.3113 104.032C70.4927 103.803 70.5833 103.515 70.5833 103.168C70.5833 102.821 70.4873 102.531 70.2953 102.296C70.1033 102.056 69.85 101.936 69.5353 101.936C69.2313 101.936 68.986 102.053 68.7993 102.288C68.618 102.523 68.5273 102.816 68.5273 103.168C68.5273 103.509 68.626 103.797 68.8233 104.032C69.0207 104.261 69.274 104.376 69.5833 104.376Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M64.9484 101.328H65.8124V102.048C65.8977 101.803 66.0364 101.605 66.2284 101.456C66.4204 101.307 66.639 101.232 66.8844 101.232C67.055 101.232 67.1724 101.248 67.2364 101.28L67.1164 102.152C67.0684 102.12 66.9644 102.104 66.8044 102.104C66.5537 102.104 66.3244 102.184 66.1164 102.344C65.9137 102.504 65.8124 102.76 65.8124 103.112V105H64.9484V101.328Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M61.897 106.92C61.625 106.92 61.3556 106.883 61.089 106.808C60.8276 106.733 60.641 106.664 60.529 106.6L60.721 105.8C61.073 106.029 61.457 106.144 61.873 106.144C62.193 106.144 62.4623 106.067 62.681 105.912C62.8996 105.757 63.0116 105.456 63.017 105.008V104.352C62.905 104.56 62.7236 104.733 62.473 104.872C62.2223 105.011 61.945 105.08 61.641 105.08C61.321 105.08 61.0276 105.003 60.761 104.848C60.4943 104.688 60.2836 104.461 60.129 104.168C59.9743 103.875 59.897 103.533 59.897 103.144C59.897 102.771 59.969 102.44 60.113 102.152C60.2623 101.859 60.473 101.632 60.745 101.472C61.017 101.312 61.3343 101.232 61.697 101.232C61.9103 101.232 62.1103 101.269 62.297 101.344C62.4836 101.419 62.641 101.512 62.769 101.624C62.9023 101.731 62.9903 101.837 63.033 101.944L63.049 101.328H63.865V104.976C63.865 105.6 63.705 106.08 63.385 106.416C63.065 106.752 62.569 106.92 61.897 106.92ZM61.881 104.352C62.185 104.352 62.441 104.248 62.649 104.04C62.857 103.827 62.961 103.549 62.961 103.208V103.152C62.961 102.923 62.913 102.717 62.817 102.536C62.721 102.355 62.5903 102.213 62.425 102.112C62.2596 102.011 62.0783 101.96 61.881 101.96C61.5396 101.96 61.2756 102.072 61.089 102.296C60.9023 102.515 60.809 102.8 60.809 103.152C60.809 103.509 60.8996 103.8 61.081 104.024C61.2676 104.243 61.5343 104.352 61.881 104.352Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <path d="M57.23 105L55.158 101.108C54.7287 101.127 54.346 101.136 54.01 101.136H53.618V105H52.092V94.71H54.43C55.6154 94.71 56.5907 94.9573 57.356 95.452C58.1214 95.9373 58.504 96.7306 58.504 97.832C58.504 98.5226 58.3407 99.12 58.014 99.624C57.6967 100.119 57.2207 100.501 56.586 100.772L59.036 105H57.23ZM54.612 99.862C55.5267 99.862 56.152 99.666 56.488 99.274C56.8334 98.8726 57.006 98.3966 57.006 97.846C57.006 96.6233 56.1894 96.012 54.556 96.012H53.618V99.862H54.612Z" className={classVariant('schematics', ['fill-dark'])}/>
                    <circle cx="124" cy="116" r="4.5" className={classVariant('schematics', ['fill-dark'])}/>
                    <line x1="124" y1="66" x2="124" y2="220" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="231" y1="52" x2="231" y2="117" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="18" y1="144.5" x2="34" y2="144.5" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="20" y1="148.5" x2="32" y2="148.5" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="22" y1="152.5" x2="30" y2="152.5" className={classVariant('schematics', ['stroke-dark'])}/>
                    <line x1="26" y1="116" x2="26" y2="144" className={classVariant('schematics', ['stroke-dark'])}/>
                    <rect x="131" y="192" width="14" height="44" transform="rotate(180 131 192)" className={classVariant('schematics', ['stroke-dark', 'fill-light'])}/>
                    <line x1="124" y1="67" x2="145" y2="67" className={classVariant('schematics', ['stroke-dark'])}/>
                </svg>
                <p>
                    Columns for R<sub>feedback</sub> and R<sub>bias</sub> have three section.
                </p>
                <ul>
                    <li>The first is the actual resistor value required</li>
                    <li>The second is the closest standard resistor value</li>
                    <li>The third tells if the recomended resistor values deviates from the required value by 1%, 5% or 10% </li>
                </ul>
                <p>
                    This circuit will buffer, amplify and level-shift any unipolar or bipolar signal, without inverting it.
                </p>
                <p>
                    In the first region, begin by entering the minimum and maximum voltages of the input signal 
                    (In Min and In Max), then the minimum and maximum voltages of the desired output signal (Out min and Out max).
                </p>
                <p>
                    Then enter a convenient bias voltage available, Bias. Typically this will be one of the supply rails, e.g., −12V or +12V.
                </p>
                <p>
                    Computed possibilities of the three resistors will be shown in table above.
                </p>
                <p>
                    The values of R<sub>ground</sub> are the mantissas of the standard 5% resistor values, running from 1.0 to 9.1. The mantissas 
                    of the associated resistors R<sub>feedback</sub> and R<sub>bias</sub> are shown, rounded to two decimal places.
                </p>
                <p>
                    Choose the trio whose members come closest to standard resistor values.
                </p>
                <p>
                    Finally, should negative numbers appear, reverse the polarity of the bias voltage, V<sub>bias</sub>, and try again.
                </p>
                <p>
                    Be aware that not every desired output-versus-input is possible, and this is indicated when you are unable to shake off the negative numbers.
                </p>
                <h3>Sources and notes</h3>
                <a href="https://modwiggler.com/forum/viewtopic.php?f=17&t=253062">
                    Buffer, level-shift and scale with one op-amp | Post by Thomas Henry
                </a>
                <a href="https://www.ti.com/lit/an/sloa097/sloa097.pdf">
                    Designing Gain and Offset in Thirty Seconds
                </a>
                <h3>The algorithm</h3>
                The analysis of this technique is due to Bernie Hutchins, Electronotes Application Note #235, October 25, 1981. 
                Thomas Henry then coded a TI83+ calculator program to automate the process. Mod Wiggler user, “pjbulls,” 
                translated that to spreadsheet form. Finally, Thomas Henry added instructions and a schematic to the spreadsheet version.
                <pre>
                    {`
                        Fix 2:Eng
                        Repeat G=45
                        ClrHome
                        Disp "LEVEL SHIFTING"
                        Disp " "
                        Input "MAX IN: ",A
                        Input "MIN IN: ",B
                        Input "MAX OUT: ",C
                        Input "MIN OUT: ",D
                        Input "BIAS V: ",V
                        Input "R TO GND: ",R
                        (C-D-A+B)/(A-B)→K
                        If A(1+K)-C=0
                        Then
                        1E99→S
                        KR→T
                        Else
                        (KVR)/(A(1+K)-C)-R→S
                        (KRS)/(R+S)→T
                        End
                        ClrHome
                        Disp "R TO GROUND IS ",R
                        Disp "R FEEDBACK IS ",T
                        If S=1E99
                        Then
                        Disp "NO R BIAS"
                        Else
                        Disp "R BIAS IS ",S
                        End
                        Output(8,2,"CLEAR TO QUIT")
                        Repeat G≠0
                        getKey→G
                        End
                        End
                        Normal:Float
                        DelVar A:DelVar B
                        DelVar C:DelVar D
                        DelVar K:DelVar S
                        DelVar T:DelVar V
                        DelVar G
                    `}
                </pre>
            </SummaryFooter>
        </article>
    );
}
