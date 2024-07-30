import React from "react";
import classVariant from '../helpers/classVariant';
import '../elements/Table.css';
import './IcTL074.css';

export default function IcTL074 () {
    return (
        <article className="ictl074">
            <header className="ictl074__header">
                <h1>TL074 Quad Operational Amplifier</h1>
            </header>
            <section className="ictl074__content">
                <p>
                    TL074 is a JFET-input quad operational amplifier monolithic integrated circuit. This op-amp IC contains four OP-AMPs. 
                    It consists of high voltage junction field-effect transistors (JFETs) and Bi-polar junction transistors (BJTs). In addition,  
                    Input bias and bias currents are low. On the contrary,  the slew rate is very high. TL074 is highly recommended for audio 
                    pre-amplification as it has low noise and low harmonic distortion. Most importantly, input offset adjustment is possible 
                    externally making use of the specific circuits. Furthermore, frequency compensation is possible internally and the operation 
                    of TL074 is rendered as latch-up-free. TL071 and TL072 are the single and dual OP-AMP versions of the TL07X family.
                </p>
            </section>
            <section className="ictl074__props">
                <table className={classVariant('table', ['full', 'stick'])}>
                    <thead className="table__head">
                        <tr>
                            <td className={classVariant('table__data', ['end'])}>Parameters</td>
                            <td className={classVariant('table__data')}>TL074</td>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        <tr>
                            <td className={classVariant('table__data', ['end'])}>Input offset voltage (mV)</td>
                            <td className={classVariant('table__data', [])}>10</td>
                        </tr>
                        <tr>
                            <td className={classVariant('table__data', ['end'])}>Input bias current (nA)</td>
                            <td className={classVariant('table__data', [])}>200</td>
                        </tr>
                        <tr>
                            <td className="table__data">Input Offset Current (nA)</td>
                            <td className={classVariant('table__data', ['begin'])}>100</td>
                        </tr>
                        <tr>
                            <td className="table__data">Input Common-Mode Voltage Range (V)</td>
                            <td className={classVariant('table__data', ['begin'])}>-12 to +15</td>
                        </tr>
                        <tr>
                            <td className="table__data">Large signal voltage gain (V/mV)</td>
                            <td className={classVariant('table__data', ['begin'])}>200</td>
                        </tr>
                        <tr>
                            <td className="table__data">Supply&nbsp; current (mA)</td>
                            <td className={classVariant('table__data', ['begin'])}>2.5</td>
                        </tr>
                        <tr>
                            <td className="table__data">Common mode rejection ratio (dB)</td>
                            <td className={classVariant('table__data', ['begin'])}>86</td>
                        </tr>
                        <tr>
                            <td className="table__data">Supply Voltage Rejection Ratio (dB)</td>
                            <td className={classVariant('table__data', ['begin'])}>86</td>
                        </tr>
                        <tr>
                            <td className="table__data">Supply Voltage (V)</td>
                            <td className={classVariant('table__data', ['begin'])}>6-36</td>
                        </tr>
                        <tr>
                            <td className="table__data">Slew Rate (V/µs)</td>
                            <td className={classVariant('table__data', ['begin'])}>13</td>
                        </tr>
                        <tr>
                            <td className="table__data">Output short circuit current (mA)</td>
                            <td className={classVariant('table__data', ['begin'])}>60</td>
                        </tr>
                        <tr>
                            <td className="table__data">Power Dissipation (mW)</td>
                            <td className={classVariant('table__data', ['begin'])}>680</td>
                        </tr>
                        <tr>
                            <td className="table__data">Differential Input Voltage (V)</td>
                            <td className={classVariant('table__data', ['begin'])}>±30</td>
                        </tr>
                    </tbody>
                    <tbody className="table__body">
                        <tr>
                            <td className={classVariant('table__data', ['end'])}>Input offset voltage (mV)</td>
                            <td className={classVariant('table__data', [])}>10</td>
                        </tr>
                        <tr>
                            <td className={classVariant('table__data', ['end'])}>Input bias current (nA)</td>
                            <td className={classVariant('table__data', [])}>200</td>
                        </tr>
                        <tr>
                            <td className="table__data">Input Offset Current (nA)</td>
                            <td className={classVariant('table__data', ['begin'])}>100</td>
                        </tr>
                        <tr>
                            <td className="table__data">Input Common-Mode Voltage Range (V)</td>
                            <td className={classVariant('table__data', ['begin'])}>-12 to +15</td>
                        </tr>
                        <tr>
                            <td className="table__data">Large signal voltage gain (V/mV)</td>
                            <td className={classVariant('table__data', ['begin'])}>200</td>
                        </tr>
                        <tr>
                            <td className="table__data">Supply&nbsp; current (mA)</td>
                            <td className={classVariant('table__data', ['begin'])}>2.5</td>
                        </tr>
                        <tr>
                            <td className="table__data">Common mode rejection ratio (dB)</td>
                            <td className={classVariant('table__data', ['begin'])}>86</td>
                        </tr>
                        <tr>
                            <td className="table__data">Supply Voltage Rejection Ratio (dB)</td>
                            <td className={classVariant('table__data', ['begin'])}>86</td>
                        </tr>
                        <tr>
                            <td className="table__data">Supply Voltage (V)</td>
                            <td className={classVariant('table__data', ['begin'])}>6-36</td>
                        </tr>
                        <tr>
                            <td className="table__data">Slew Rate (V/µs)</td>
                            <td className={classVariant('table__data', ['begin'])}>13</td>
                        </tr>
                        <tr>
                            <td className="table__data">Output short circuit current (mA)</td>
                            <td className={classVariant('table__data', ['begin'])}>60</td>
                        </tr>
                        <tr>
                            <td className="table__data">Power Dissipation (mW)</td>
                            <td className={classVariant('table__data', ['begin'])}>680</td>
                        </tr>
                        <tr>
                            <td className="table__data">Differential Input Voltage (V)</td>
                            <td className={classVariant('table__data', ['begin'])}>±30</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <aside className="ictl074__aside">
                <svg width="190" height="281" viewBox="0 0 190 281" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_53_2)">
                    <rect width="190" height="281" fill="white"/>
                    <rect x="29.5" y="5.5" width="134" height="270" stroke="black" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M38.5 112.5V58.5L83 85L38.5 112.5Z" stroke="black" strokeWidth="3" strokeLinejoin="round"/>
                    <line x1="42" y1="95" x2="54" y2="95" stroke="black" strokeWidth="3"/>
                    <line x1="48" y1="89" x2="48" y2="101" stroke="black" strokeWidth="3"/>
                    <line x1="42" y1="74" x2="54" y2="74" stroke="black" strokeWidth="3"/>
                    <line x1="176" y1="138.5" x2="188" y2="138.5" stroke="black" strokeWidth="3"/>
                    <line x1="2" y1="140" x2="14" y2="140" stroke="black" strokeWidth="3"/>
                    <line x1="8" y1="134" x2="8" y2="146" stroke="black" strokeWidth="3"/>
                    <path d="M38.5 168V222L83 195.5L38.5 168Z" stroke="black" strokeWidth="3" strokeLinejoin="round"/>
                    <line y1="-1.5" x2="12" y2="-1.5" transform="matrix(1 0 0 -1 42 184)" stroke="black" strokeWidth="3"/>
                    <line y1="-1.5" x2="12" y2="-1.5" transform="matrix(-4.37115e-08 -1 -1 4.37115e-08 46.5 191.5)" stroke="black" strokeWidth="3"/>
                    <line y1="-1.5" x2="12" y2="-1.5" transform="matrix(1 0 0 -1 42 205)" stroke="black" strokeWidth="3"/>
                    <path d="M155.5 112.5V58.5L111 85L155.5 112.5Z" stroke="black" strokeWidth="3" strokeLinejoin="round"/>
                    <line y1="-1.5" x2="12" y2="-1.5" transform="matrix(-1 0 0 1 152 96.5)" stroke="black" strokeWidth="3"/>
                    <line y1="-1.5" x2="12" y2="-1.5" transform="matrix(4.37115e-08 1 1 -4.37115e-08 147.5 89)" stroke="black" strokeWidth="3"/>
                    <line y1="-1.5" x2="12" y2="-1.5" transform="matrix(-1 0 0 1 152 75.5)" stroke="black" strokeWidth="3"/>
                    <path d="M155.5 168V222L111 195.5L155.5 168Z" stroke="black" strokeWidth="3" strokeLinejoin="round"/>
                    <line x1="152" y1="185.5" x2="140" y2="185.5" stroke="black" strokeWidth="3"/>
                    <line x1="146" y1="191.5" x2="146" y2="179.5" stroke="black" strokeWidth="3"/>
                    <line x1="152" y1="206.5" x2="140" y2="206.5" stroke="black" strokeWidth="3"/>
                    <path d="M82.5 85H92.5V32H30.5" stroke="black" strokeWidth="3"/>
                    <path d="M82.5 195.5H92.5V248.5H30.5" stroke="black" strokeWidth="3"/>
                    <path d="M113 85H103V32H165" stroke="black" strokeWidth="3"/>
                    <path d="M113 195.5H103V248.5H165" stroke="black" strokeWidth="3"/>
                    <path d="M155.5 68H163.5" stroke="black" strokeWidth="3"/>
                    <path d="M30 68H38" stroke="black" strokeWidth="3"/>
                    <path d="M30 176H38" stroke="black" strokeWidth="3"/>
                    <path d="M155 176H163" stroke="black" strokeWidth="3"/>
                    <path d="M156 103H163.5" stroke="black" strokeWidth="3"/>
                    <path d="M30.5 103H38" stroke="black" strokeWidth="3"/>
                    <path d="M30.5 212H38" stroke="black" strokeWidth="3"/>
                    <path d="M155.5 212H163" stroke="black" strokeWidth="3"/>
                    <rect x="163.5" y="23.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="21.5" y="23.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="163.5" y="239.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="21.5" y="239.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="163.5" y="203.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="21.5" y="203.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="163.5" y="167.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="21.5" y="167.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="163.5" y="131.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="21.5" y="131.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="163.5" y="95.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="21.5" y="95.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="163.5" y="59.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <rect x="21.5" y="59.5" width="8" height="15" stroke="black" strokeWidth="3"/>
                    <mask id="path-47-inside-1_53_2" fill="white">
                    <path d="M117 4.5C117 6.92945 116.521 9.33512 115.592 11.5796C114.662 13.8242 113.299 15.8636 111.581 17.5815C109.864 19.2994 107.824 20.6621 105.58 21.5918C103.335 22.5215 100.929 23 98.5 23C96.0705 23 93.6649 22.5215 91.4204 21.5918C89.1758 20.6621 87.1364 19.2994 85.4185 17.5815C83.7006 15.8636 82.3379 13.8242 81.4082 11.5796C80.4785 9.33512 80 6.92945 80 4.5L98.5 4.5H117Z"/>
                    </mask>
                    <path d="M117 4.5C117 6.92945 116.521 9.33512 115.592 11.5796C114.662 13.8242 113.299 15.8636 111.581 17.5815C109.864 19.2994 107.824 20.6621 105.58 21.5918C103.335 22.5215 100.929 23 98.5 23C96.0705 23 93.6649 22.5215 91.4204 21.5918C89.1758 20.6621 87.1364 19.2994 85.4185 17.5815C83.7006 15.8636 82.3379 13.8242 81.4082 11.5796C80.4785 9.33512 80 6.92945 80 4.5L98.5 4.5H117Z" stroke="black" strokeWidth="6" mask="url(#path-47-inside-1_53_2)"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_53_2">
                    <rect width="190" height="281" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

            </aside>
            <footer></footer>
        </article>
    )
}
