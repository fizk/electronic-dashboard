import React from "react";
import '../elements/Schematics.css';
import './Transistor.css';


export default function Transistor () {
    return (
        <>
            <article className="transistor__article">
                <header className="transistor__header">
                    <h1 className="transistor__title">Common Collector</h1>
                </header>
                <section className="transistor__scematic">
                    <svg className="schematics" width="189" height="167" viewBox="0 0 189 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="70" y1="59" x2="70" y2="87" className="schematics--stroke-dark" strokeWidth="4"/>
                        <line x1="70" y1="74" x2="24" y2="74" className="schematics--stroke-dark"/>
                        <path d="M70.0822 65.5491L89.7419 51.7833L89.7415 20.5" className="schematics--stroke-dark"/>
                        <path d="M70.009 80.249L89.6687 94.0149L89.6684 113" className="schematics--stroke-dark"/>
                        <path d="M90.2571 94.4521L85.5886 86.3L81 92.8533L90.2571 94.4521Z" className="schematics--fill-dark"/>
                        <line x1="89" y1="112" x2="155" y2="112" className="schematics--stroke-dark"/>
                        <line x1="24" y1="36" x2="155" y2="36" className="schematics--stroke-dark"/>
                        <path d="M155 38L152.113 43L157.887 43L155 38ZM155 110L157.887 105L152.113 105L155 110ZM154.5 42.5L154.5 105.5L155.5 105.5L155.5 42.5L154.5 42.5Z" className="schematics--fill-middle"/>
                        <path d="M24 38L21.1132 43L26.8868 43L24 38ZM24 72L26.8868 67L21.1132 67L24 72ZM23.5 42.5L23.5 67.5L24.5 67.5L24.5 42.5L23.5 42.5Z" className="schematics--fill-middle"/>
                        <circle cx="90" cy="36" r="4.5" className="schematics--fill-dark"/>
                        <line x1="98" y1="20" x2="82" y2="20" className="schematics--stroke-dark"/>
                        <line x1="96" y1="16" x2="84" y2="16" className="schematics--stroke-dark"/>
                        <line x1="94" y1="12" x2="86" y2="12" className="schematics--stroke-dark"/>
                        <path d="M4.474 54.246H5.146V57H4.474V54.246ZM4.804 53.73C4.68 53.73 4.576 53.688 4.492 53.604C4.408 53.52 4.366 53.416 4.366 53.292C4.366 53.18 4.408 53.084 4.492 53.004C4.576 52.924 4.68 52.884 4.804 52.884C4.924 52.884 5.026 52.924 5.11 53.004C5.194 53.084 5.236 53.18 5.236 53.292C5.236 53.416 5.194 53.52 5.11 53.604C5.03 53.688 4.928 53.73 4.804 53.73ZM6.04319 54.246H6.67919L6.68519 54.75C6.76119 54.582 6.88119 54.444 7.04519 54.336C7.20919 54.228 7.40119 54.174 7.62119 54.174C7.90519 54.174 8.12319 54.234 8.27519 54.354C8.42719 54.47 8.52919 54.634 8.58119 54.846C8.63319 55.058 8.65919 55.334 8.65919 55.674V57H8.01119V55.692C8.01119 55.344 7.97719 55.094 7.90919 54.942C7.84119 54.786 7.70119 54.708 7.48919 54.708C7.36919 54.708 7.24719 54.746 7.12319 54.822C6.99919 54.894 6.89519 55 6.81119 55.14C6.73119 55.28 6.69119 55.444 6.69119 55.632V57H6.04319V54.246ZM9.50636 54.246H10.1304V54.756C10.3504 54.368 10.6944 54.174 11.1624 54.174C11.5504 54.174 11.8644 54.298 12.1044 54.546C12.3444 54.79 12.4644 55.144 12.4644 55.608C12.4644 55.896 12.4044 56.15 12.2844 56.37C12.1684 56.59 12.0084 56.76 11.8044 56.88C11.6044 57 11.3804 57.06 11.1324 57.06C10.9004 57.06 10.6984 57.02 10.5264 56.94C10.3584 56.856 10.2264 56.738 10.1304 56.586L10.1364 58.458H9.50636V54.246ZM10.9824 56.514C11.2424 56.514 11.4424 56.432 11.5824 56.268C11.7224 56.1 11.7924 55.886 11.7924 55.626C11.7924 55.354 11.7224 55.138 11.5824 54.978C11.4464 54.814 11.2464 54.732 10.9824 54.732C10.8384 54.732 10.7024 54.768 10.5744 54.84C10.4504 54.908 10.3504 55.008 10.2744 55.14C10.2024 55.268 10.1664 55.418 10.1664 55.59V55.632C10.1664 55.804 10.2024 55.958 10.2744 56.094C10.3504 56.226 10.4504 56.33 10.5744 56.406C10.6984 56.478 10.8344 56.514 10.9824 56.514ZM14.1105 57.06C13.7305 57.06 13.4685 56.948 13.3245 56.724C13.1845 56.5 13.1145 56.188 13.1145 55.788V54.246H13.7625V55.626C13.7625 55.854 13.7745 56.032 13.7985 56.16C13.8265 56.284 13.8785 56.376 13.9545 56.436C14.0345 56.496 14.1525 56.526 14.3085 56.526C14.4205 56.526 14.5285 56.494 14.6325 56.43C14.7365 56.366 14.8205 56.28 14.8845 56.172C14.9525 56.06 14.9865 55.938 14.9865 55.806V54.246H15.6285V57H15.1005L15.0285 56.598C14.9285 56.754 14.8025 56.87 14.6505 56.946C14.5025 57.022 14.3225 57.06 14.1105 57.06ZM16.7305 54.774H16.2445V54.246H16.7305V53.124L17.3845 52.98V54.246H18.0205V54.774H17.3845V57H16.7305V54.774Z" className="schematics--fill-dark"/>
                        <path d="M163.71 75.06C163.426 75.06 163.174 74.996 162.954 74.868C162.734 74.74 162.564 74.566 162.444 74.346C162.324 74.126 162.264 73.882 162.264 73.614C162.264 73.35 162.322 73.108 162.438 72.888C162.558 72.668 162.728 72.494 162.948 72.366C163.168 72.238 163.422 72.174 163.71 72.174C163.998 72.174 164.25 72.238 164.466 72.366C164.686 72.494 164.854 72.668 164.97 72.888C165.09 73.108 165.15 73.35 165.15 73.614C165.15 73.882 165.09 74.126 164.97 74.346C164.85 74.566 164.68 74.74 164.46 74.868C164.244 74.996 163.994 75.06 163.71 75.06ZM163.728 74.532C163.96 74.532 164.142 74.446 164.274 74.274C164.41 74.102 164.478 73.886 164.478 73.626C164.478 73.366 164.406 73.148 164.262 72.972C164.118 72.792 163.928 72.702 163.692 72.702C163.464 72.702 163.28 72.79 163.14 72.966C163.004 73.142 162.936 73.362 162.936 73.626C162.936 73.882 163.01 74.098 163.158 74.274C163.306 74.446 163.496 74.532 163.728 74.532ZM166.796 75.06C166.416 75.06 166.154 74.948 166.01 74.724C165.87 74.5 165.8 74.188 165.8 73.788V72.246H166.448V73.626C166.448 73.854 166.46 74.032 166.484 74.16C166.512 74.284 166.564 74.376 166.64 74.436C166.72 74.496 166.838 74.526 166.994 74.526C167.106 74.526 167.214 74.494 167.318 74.43C167.422 74.366 167.506 74.28 167.57 74.172C167.638 74.06 167.672 73.938 167.672 73.806V72.246H168.314V75H167.786L167.714 74.598C167.614 74.754 167.488 74.87 167.336 74.946C167.188 75.022 167.008 75.06 166.796 75.06ZM169.416 72.774H168.93V72.246H169.416V71.124L170.07 70.98V72.246H170.706V72.774H170.07V75H169.416V72.774ZM171.245 72.246H171.869V72.756C172.089 72.368 172.433 72.174 172.901 72.174C173.289 72.174 173.603 72.298 173.843 72.546C174.083 72.79 174.203 73.144 174.203 73.608C174.203 73.896 174.143 74.15 174.023 74.37C173.907 74.59 173.747 74.76 173.543 74.88C173.343 75 173.119 75.06 172.871 75.06C172.639 75.06 172.437 75.02 172.265 74.94C172.097 74.856 171.965 74.738 171.869 74.586L171.875 76.458H171.245V72.246ZM172.721 74.514C172.981 74.514 173.181 74.432 173.321 74.268C173.461 74.1 173.531 73.886 173.531 73.626C173.531 73.354 173.461 73.138 173.321 72.978C173.185 72.814 172.985 72.732 172.721 72.732C172.577 72.732 172.441 72.768 172.313 72.84C172.189 72.908 172.089 73.008 172.013 73.14C171.941 73.268 171.905 73.418 171.905 73.59V73.632C171.905 73.804 171.941 73.958 172.013 74.094C172.089 74.226 172.189 74.33 172.313 74.406C172.437 74.478 172.573 74.514 172.721 74.514ZM175.849 75.06C175.469 75.06 175.207 74.948 175.063 74.724C174.923 74.5 174.853 74.188 174.853 73.788V72.246H175.501V73.626C175.501 73.854 175.513 74.032 175.537 74.16C175.565 74.284 175.617 74.376 175.693 74.436C175.773 74.496 175.891 74.526 176.047 74.526C176.159 74.526 176.267 74.494 176.371 74.43C176.475 74.366 176.559 74.28 176.623 74.172C176.691 74.06 176.725 73.938 176.725 73.806V72.246H177.367V75H176.839L176.767 74.598C176.667 74.754 176.541 74.87 176.389 74.946C176.241 75.022 176.061 75.06 175.849 75.06ZM178.469 72.774H177.983V72.246H178.469V71.124L179.123 70.98V72.246H179.759V72.774H179.123V75H178.469V72.774Z" className="schematics--fill-dark"/>
                    </svg>
                </section>
                <section className="transistor__description">
                    <p>
                        In electronics, a <strong>common collector</strong> amplifier (also known as an <strong>emitter follower</strong>) is one of three 
                        basic single-stage bipolar junction transistor (BJT) amplifier topologies, typically used as a voltage buffer.
                    </p>
                    <p>
                        In this circuit the base terminal of the transistor serves as the input, the emitter is the output, and the collector is common to both 
                        (for example, it may be tied to ground reference or a power supply rail), hence its name. The analogous field-effect transistor circuit is the 
                        common drain amplifier and the analogous tube circuit is the cathode follower.
                    </p>
                    <p>
                        <q><a href="https://en.wikipedia.org/wiki/Common_collector">Wikipedia</a></q>
                    </p>
                </section>
            </article>

            <article className="transistor__article">
                <header className="transistor__header">
                    <h1 className="transistor__title">Common Emitter</h1>
                </header>
                <section className="transistor__scematic">
                    <svg className="schematics" width="189" height="167" viewBox="0 0 189 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="70" y1="59" x2="70" y2="87" className="schematics--stroke-dark" strokeWidth="4"/>
                        <line x1="70" y1="74" x2="24" y2="74" className="schematics--stroke-dark"/>
                        <path d="M70.0818 65.5485L89.7415 51.7827L89.7415 34.9999" className="schematics--stroke-dark"/>
                        <path d="M70.009 80.249L89.6687 94.0149L89.6687 125.5" className="schematics--stroke-dark"/>
                        <path d="M90.2571 94.4521L85.5886 86.3L81 92.8533L90.2571 94.4521Z" className="schematics--fill-dark"/>
                        <line x1="24" y1="112" x2="155" y2="112" className="schematics--stroke-dark"/>
                        <line x1="89" y1="36" x2="155" y2="36" className="schematics--stroke-dark"/>
                        <path d="M155 38L152.113 43L157.887 43L155 38ZM155 110L157.887 105L152.113 105L155 110ZM154.5 42.5L154.5 105.5L155.5 105.5L155.5 42.5L154.5 42.5Z" className="schematics--fill-middle"/>
                        <path d="M24 76L21.1132 81L26.8868 81L24 76ZM24 110L26.8868 105L21.1132 105L24 110ZM23.5 80.5L23.5 105.5L24.5 105.5L24.5 80.5L23.5 80.5Z" className="schematics--fill-middle"/>
                        <circle cx="89.7" cy="112" r="4.5" className="schematics--fill-dark"/>
                        <line x1="81.5" y1="126" x2="97.5" y2="126" className="schematics--stroke-dark"/>
                        <line x1="83.5" y1="130" x2="95.5" y2="130" className="schematics--stroke-dark"/>
                        <line x1="85.5" y1="134" x2="93.5" y2="134" className="schematics--stroke-dark"/>
                        <path d="M4.474 92.246H5.146V95H4.474V92.246ZM4.804 91.73C4.68 91.73 4.576 91.688 4.492 91.604C4.408 91.52 4.366 91.416 4.366 91.292C4.366 91.18 4.408 91.084 4.492 91.004C4.576 90.924 4.68 90.884 4.804 90.884C4.924 90.884 5.026 90.924 5.11 91.004C5.194 91.084 5.236 91.18 5.236 91.292C5.236 91.416 5.194 91.52 5.11 91.604C5.03 91.688 4.928 91.73 4.804 91.73ZM6.04319 92.246H6.67919L6.68519 92.75C6.76119 92.582 6.88119 92.444 7.04519 92.336C7.20919 92.228 7.40119 92.174 7.62119 92.174C7.90519 92.174 8.12319 92.234 8.27519 92.354C8.42719 92.47 8.52919 92.634 8.58119 92.846C8.63319 93.058 8.65919 93.334 8.65919 93.674V95H8.01119V93.692C8.01119 93.344 7.97719 93.094 7.90919 92.942C7.84119 92.786 7.70119 92.708 7.48919 92.708C7.36919 92.708 7.24719 92.746 7.12319 92.822C6.99919 92.894 6.89519 93 6.81119 93.14C6.73119 93.28 6.69119 93.444 6.69119 93.632V95H6.04319V92.246ZM9.50636 92.246H10.1304V92.756C10.3504 92.368 10.6944 92.174 11.1624 92.174C11.5504 92.174 11.8644 92.298 12.1044 92.546C12.3444 92.79 12.4644 93.144 12.4644 93.608C12.4644 93.896 12.4044 94.15 12.2844 94.37C12.1684 94.59 12.0084 94.76 11.8044 94.88C11.6044 95 11.3804 95.06 11.1324 95.06C10.9004 95.06 10.6984 95.02 10.5264 94.94C10.3584 94.856 10.2264 94.738 10.1304 94.586L10.1364 96.458H9.50636V92.246ZM10.9824 94.514C11.2424 94.514 11.4424 94.432 11.5824 94.268C11.7224 94.1 11.7924 93.886 11.7924 93.626C11.7924 93.354 11.7224 93.138 11.5824 92.978C11.4464 92.814 11.2464 92.732 10.9824 92.732C10.8384 92.732 10.7024 92.768 10.5744 92.84C10.4504 92.908 10.3504 93.008 10.2744 93.14C10.2024 93.268 10.1664 93.418 10.1664 93.59V93.632C10.1664 93.804 10.2024 93.958 10.2744 94.094C10.3504 94.226 10.4504 94.33 10.5744 94.406C10.6984 94.478 10.8344 94.514 10.9824 94.514ZM14.1105 95.06C13.7305 95.06 13.4685 94.948 13.3245 94.724C13.1845 94.5 13.1145 94.188 13.1145 93.788V92.246H13.7625V93.626C13.7625 93.854 13.7745 94.032 13.7985 94.16C13.8265 94.284 13.8785 94.376 13.9545 94.436C14.0345 94.496 14.1525 94.526 14.3085 94.526C14.4205 94.526 14.5285 94.494 14.6325 94.43C14.7365 94.366 14.8205 94.28 14.8845 94.172C14.9525 94.06 14.9865 93.938 14.9865 93.806V92.246H15.6285V95H15.1005L15.0285 94.598C14.9285 94.754 14.8025 94.87 14.6505 94.946C14.5025 95.022 14.3225 95.06 14.1105 95.06ZM16.7305 92.774H16.2445V92.246H16.7305V91.124L17.3845 90.98V92.246H18.0205V92.774H17.3845V95H16.7305V92.774Z" className="schematics--fill-dark"/>
                        <path d="M162.71 75.06C162.426 75.06 162.174 74.996 161.954 74.868C161.734 74.74 161.564 74.566 161.444 74.346C161.324 74.126 161.264 73.882 161.264 73.614C161.264 73.35 161.322 73.108 161.438 72.888C161.558 72.668 161.728 72.494 161.948 72.366C162.168 72.238 162.422 72.174 162.71 72.174C162.998 72.174 163.25 72.238 163.466 72.366C163.686 72.494 163.854 72.668 163.97 72.888C164.09 73.108 164.15 73.35 164.15 73.614C164.15 73.882 164.09 74.126 163.97 74.346C163.85 74.566 163.68 74.74 163.46 74.868C163.244 74.996 162.994 75.06 162.71 75.06ZM162.728 74.532C162.96 74.532 163.142 74.446 163.274 74.274C163.41 74.102 163.478 73.886 163.478 73.626C163.478 73.366 163.406 73.148 163.262 72.972C163.118 72.792 162.928 72.702 162.692 72.702C162.464 72.702 162.28 72.79 162.14 72.966C162.004 73.142 161.936 73.362 161.936 73.626C161.936 73.882 162.01 74.098 162.158 74.274C162.306 74.446 162.496 74.532 162.728 74.532ZM165.796 75.06C165.416 75.06 165.154 74.948 165.01 74.724C164.87 74.5 164.8 74.188 164.8 73.788V72.246H165.448V73.626C165.448 73.854 165.46 74.032 165.484 74.16C165.512 74.284 165.564 74.376 165.64 74.436C165.72 74.496 165.838 74.526 165.994 74.526C166.106 74.526 166.214 74.494 166.318 74.43C166.422 74.366 166.506 74.28 166.57 74.172C166.638 74.06 166.672 73.938 166.672 73.806V72.246H167.314V75H166.786L166.714 74.598C166.614 74.754 166.488 74.87 166.336 74.946C166.188 75.022 166.008 75.06 165.796 75.06ZM168.416 72.774H167.93V72.246H168.416V71.124L169.07 70.98V72.246H169.706V72.774H169.07V75H168.416V72.774ZM170.245 72.246H170.869V72.756C171.089 72.368 171.433 72.174 171.901 72.174C172.289 72.174 172.603 72.298 172.843 72.546C173.083 72.79 173.203 73.144 173.203 73.608C173.203 73.896 173.143 74.15 173.023 74.37C172.907 74.59 172.747 74.76 172.543 74.88C172.343 75 172.119 75.06 171.871 75.06C171.639 75.06 171.437 75.02 171.265 74.94C171.097 74.856 170.965 74.738 170.869 74.586L170.875 76.458H170.245V72.246ZM171.721 74.514C171.981 74.514 172.181 74.432 172.321 74.268C172.461 74.1 172.531 73.886 172.531 73.626C172.531 73.354 172.461 73.138 172.321 72.978C172.185 72.814 171.985 72.732 171.721 72.732C171.577 72.732 171.441 72.768 171.313 72.84C171.189 72.908 171.089 73.008 171.013 73.14C170.941 73.268 170.905 73.418 170.905 73.59V73.632C170.905 73.804 170.941 73.958 171.013 74.094C171.089 74.226 171.189 74.33 171.313 74.406C171.437 74.478 171.573 74.514 171.721 74.514ZM174.849 75.06C174.469 75.06 174.207 74.948 174.063 74.724C173.923 74.5 173.853 74.188 173.853 73.788V72.246H174.501V73.626C174.501 73.854 174.513 74.032 174.537 74.16C174.565 74.284 174.617 74.376 174.693 74.436C174.773 74.496 174.891 74.526 175.047 74.526C175.159 74.526 175.267 74.494 175.371 74.43C175.475 74.366 175.559 74.28 175.623 74.172C175.691 74.06 175.725 73.938 175.725 73.806V72.246H176.367V75H175.839L175.767 74.598C175.667 74.754 175.541 74.87 175.389 74.946C175.241 75.022 175.061 75.06 174.849 75.06ZM177.469 72.774H176.983V72.246H177.469V71.124L178.123 70.98V72.246H178.759V72.774H178.123V75H177.469V72.774Z" className="schematics--fill-dark"/>
                    </svg>
                </section>
                <section className="transistor__description">
                    <p>
                        In electronics, a <strong>common-emitter</strong> amplifier is one of three basic single-stage bipolar-junction-transistor (BJT) amplifier topologies, 
                        typically used as a voltage amplifier. It offers high current gain (typically 200), medium input resistance and a high output resistance. 
                        The output of a common emitter amplifier is inverted; i.e. for a sine wave input signal, the output signal is 180 degrees out of phase with 
                        respect to the input.
                    </p>
                    <p>
                        In this circuit, the base terminal of the transistor serves as the input, the collector is the output, and the emitter is common to both 
                        (for example, it may be tied to ground reference or a power supply rail), hence its name. The analogous FET circuit is the common-source amplifier, 
                        and the analogous tube circuit is the common-cathode amplifier.
                    </p>
                    <p>
                        <q><a href="https://en.wikipedia.org/wiki/Common_emitter">Wikipedia</a></q>
                    </p>
                </section>
            </article>

            <article className="transistor__article">
                <header className="transistor__header">
                    <h1 className="transistor__title">Common Base</h1>
                </header>
                <section className="transistor__scematic">
                    <svg className="schematics" width="189" height="167" viewBox="0 0 189 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="70" y1="59" x2="70" y2="87" className="schematics--stroke-dark" strokeWidth="4"/>
                        <line x1="70" y1="74" x2="11" y2="74" className="schematics--stroke-dark"/>
                        <path d="M70.0818 65.5485L89.7415 51.7827L89.7415 34.9999" className="schematics--stroke-dark"/>
                        <path d="M70.009 80.249L89.6687 94.0149L89.6684 113" className="schematics--stroke-dark"/>
                        <path d="M90.2571 94.4521L85.5886 86.3L81 92.8533L90.2571 94.4521Z" className="schematics--fill-dark"/>
                        <path d="M88 35L83 32.1132V37.8868L88 35ZM26 35L31 37.8868V32.1132L26 35ZM83.5 34.5L30.5 34.5V35.5L83.5 35.5V34.5Z" className="schematics--fill-middle"/>
                        <path d="M88 113L83 110.113V115.887L88 113ZM26 113L31 115.887V110.113L26 113ZM83.5 112.5H30.5V113.5H83.5V112.5Z" className="schematics--fill-middle"/>
                        <circle cx="24" cy="74" r="4.5" className="schematics--fill-dark"/>
                        <line x1="24" y1="35" x2="24" y2="113" className="schematics--stroke-dark"/>
                        <line x1="11" y1="66" x2="11" y2="82" className="schematics--stroke-dark"/>
                        <line x1="7" y1="68" x2="7" y2="80" className="schematics--stroke-dark"/>
                        <line x1="3" y1="70" x2="3" y2="78" className="schematics--stroke-dark"/>
                        <path d="M47.474 118.246H48.146V121H47.474V118.246ZM47.804 117.73C47.68 117.73 47.576 117.688 47.492 117.604C47.408 117.52 47.366 117.416 47.366 117.292C47.366 117.18 47.408 117.084 47.492 117.004C47.576 116.924 47.68 116.884 47.804 116.884C47.924 116.884 48.026 116.924 48.11 117.004C48.194 117.084 48.236 117.18 48.236 117.292C48.236 117.416 48.194 117.52 48.11 117.604C48.03 117.688 47.928 117.73 47.804 117.73ZM49.0432 118.246H49.6792L49.6852 118.75C49.7612 118.582 49.8812 118.444 50.0452 118.336C50.2092 118.228 50.4012 118.174 50.6212 118.174C50.9052 118.174 51.1232 118.234 51.2752 118.354C51.4272 118.47 51.5292 118.634 51.5812 118.846C51.6332 119.058 51.6592 119.334 51.6592 119.674V121H51.0112V119.692C51.0112 119.344 50.9772 119.094 50.9092 118.942C50.8412 118.786 50.7012 118.708 50.4892 118.708C50.3692 118.708 50.2472 118.746 50.1232 118.822C49.9992 118.894 49.8952 119 49.8112 119.14C49.7312 119.28 49.6912 119.444 49.6912 119.632V121H49.0432V118.246ZM52.5064 118.246H53.1304V118.756C53.3504 118.368 53.6944 118.174 54.1624 118.174C54.5504 118.174 54.8644 118.298 55.1044 118.546C55.3444 118.79 55.4644 119.144 55.4644 119.608C55.4644 119.896 55.4044 120.15 55.2844 120.37C55.1684 120.59 55.0084 120.76 54.8044 120.88C54.6044 121 54.3804 121.06 54.1324 121.06C53.9004 121.06 53.6984 121.02 53.5264 120.94C53.3584 120.856 53.2264 120.738 53.1304 120.586L53.1364 122.458H52.5064V118.246ZM53.9824 120.514C54.2424 120.514 54.4424 120.432 54.5824 120.268C54.7224 120.1 54.7924 119.886 54.7924 119.626C54.7924 119.354 54.7224 119.138 54.5824 118.978C54.4464 118.814 54.2464 118.732 53.9824 118.732C53.8384 118.732 53.7024 118.768 53.5744 118.84C53.4504 118.908 53.3504 119.008 53.2744 119.14C53.2024 119.268 53.1664 119.418 53.1664 119.59V119.632C53.1664 119.804 53.2024 119.958 53.2744 120.094C53.3504 120.226 53.4504 120.33 53.5744 120.406C53.6984 120.478 53.8344 120.514 53.9824 120.514ZM57.1105 121.06C56.7305 121.06 56.4685 120.948 56.3245 120.724C56.1845 120.5 56.1145 120.188 56.1145 119.788V118.246H56.7625V119.626C56.7625 119.854 56.7745 120.032 56.7985 120.16C56.8265 120.284 56.8785 120.376 56.9545 120.436C57.0345 120.496 57.1525 120.526 57.3085 120.526C57.4205 120.526 57.5285 120.494 57.6325 120.43C57.7365 120.366 57.8205 120.28 57.8845 120.172C57.9525 120.06 57.9865 119.938 57.9865 119.806V118.246H58.6285V121H58.1005L58.0285 120.598C57.9285 120.754 57.8025 120.87 57.6505 120.946C57.5025 121.022 57.3225 121.06 57.1105 121.06ZM59.7305 118.774H59.2445V118.246H59.7305V117.124L60.3845 116.98V118.246H61.0205V118.774H60.3845V121H59.7305V118.774Z" className="schematics--fill-dark"/>
                        <path d="M48.71 29.06C48.426 29.06 48.174 28.996 47.954 28.868C47.734 28.74 47.564 28.566 47.444 28.346C47.324 28.126 47.264 27.882 47.264 27.614C47.264 27.35 47.322 27.108 47.438 26.888C47.558 26.668 47.728 26.494 47.948 26.366C48.168 26.238 48.422 26.174 48.71 26.174C48.998 26.174 49.25 26.238 49.466 26.366C49.686 26.494 49.854 26.668 49.97 26.888C50.09 27.108 50.15 27.35 50.15 27.614C50.15 27.882 50.09 28.126 49.97 28.346C49.85 28.566 49.68 28.74 49.46 28.868C49.244 28.996 48.994 29.06 48.71 29.06ZM48.728 28.532C48.96 28.532 49.142 28.446 49.274 28.274C49.41 28.102 49.478 27.886 49.478 27.626C49.478 27.366 49.406 27.148 49.262 26.972C49.118 26.792 48.928 26.702 48.692 26.702C48.464 26.702 48.28 26.79 48.14 26.966C48.004 27.142 47.936 27.362 47.936 27.626C47.936 27.882 48.01 28.098 48.158 28.274C48.306 28.446 48.496 28.532 48.728 28.532ZM51.796 29.06C51.416 29.06 51.154 28.948 51.01 28.724C50.87 28.5 50.8 28.188 50.8 27.788V26.246H51.448V27.626C51.448 27.854 51.46 28.032 51.484 28.16C51.512 28.284 51.564 28.376 51.64 28.436C51.72 28.496 51.838 28.526 51.994 28.526C52.106 28.526 52.214 28.494 52.318 28.43C52.422 28.366 52.506 28.28 52.57 28.172C52.638 28.06 52.672 27.938 52.672 27.806V26.246H53.314V29H52.786L52.714 28.598C52.614 28.754 52.488 28.87 52.336 28.946C52.188 29.022 52.008 29.06 51.796 29.06ZM54.416 26.774H53.93V26.246H54.416V25.124L55.07 24.98V26.246H55.706V26.774H55.07V29H54.416V26.774ZM56.2446 26.246H56.8686V26.756C57.0886 26.368 57.4326 26.174 57.9006 26.174C58.2886 26.174 58.6026 26.298 58.8426 26.546C59.0826 26.79 59.2026 27.144 59.2026 27.608C59.2026 27.896 59.1426 28.15 59.0226 28.37C58.9066 28.59 58.7466 28.76 58.5426 28.88C58.3426 29 58.1186 29.06 57.8706 29.06C57.6386 29.06 57.4366 29.02 57.2646 28.94C57.0966 28.856 56.9646 28.738 56.8686 28.586L56.8746 30.458H56.2446V26.246ZM57.7206 28.514C57.9806 28.514 58.1806 28.432 58.3206 28.268C58.4606 28.1 58.5306 27.886 58.5306 27.626C58.5306 27.354 58.4606 27.138 58.3206 26.978C58.1846 26.814 57.9846 26.732 57.7206 26.732C57.5766 26.732 57.4406 26.768 57.3126 26.84C57.1886 26.908 57.0886 27.008 57.0126 27.14C56.9406 27.268 56.9046 27.418 56.9046 27.59V27.632C56.9046 27.804 56.9406 27.958 57.0126 28.094C57.0886 28.226 57.1886 28.33 57.3126 28.406C57.4366 28.478 57.5726 28.514 57.7206 28.514ZM60.8488 29.06C60.4688 29.06 60.2068 28.948 60.0628 28.724C59.9228 28.5 59.8528 28.188 59.8528 27.788V26.246H60.5008V27.626C60.5008 27.854 60.5128 28.032 60.5368 28.16C60.5648 28.284 60.6168 28.376 60.6928 28.436C60.7728 28.496 60.8908 28.526 61.0468 28.526C61.1588 28.526 61.2668 28.494 61.3708 28.43C61.4748 28.366 61.5588 28.28 61.6228 28.172C61.6908 28.06 61.7248 27.938 61.7248 27.806V26.246H62.3668V29H61.8388L61.7668 28.598C61.6668 28.754 61.5408 28.87 61.3888 28.946C61.2408 29.022 61.0608 29.06 60.8488 29.06ZM63.4687 26.774H62.9827V26.246H63.4687V25.124L64.1227 24.98V26.246H64.7587V26.774H64.1227V29H63.4687V26.774Z" className="schematics--fill-dark"/>
                    </svg>
                </section>
                <section className="transistor__description">
                    <p>
                        In electronics, a <strong>common-base</strong> (also known as <strong>grounded-base</strong>) amplifier is one of three basic single-stage bipolar junction transistor (BJT) 
                        amplifier topologies, typically used as a current buffer or voltage amplifier.
                    </p>
                    <p>
                        In this circuit the emitter terminal of the transistor serves as the input, the collector as the output, and the base is connected to ground, 
                        or "common", hence its name. The analogous field-effect transistor circuit is the common-gate amplifier.
                    </p>
                    <p>
                        <q><a href="https://en.wikipedia.org/wiki/Common_base">Wikipedia</a></q>
                    </p>
                </section>
            </article>
        </>
    )
}
