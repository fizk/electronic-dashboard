import React from "react";
import { Tab, TabItem } from "../elements/Tab";
import '../elements/Table.css'

export default function Eseries () {
    return (
        <Tab>
            <TabItem title="Overview" path="overview">
                <p>
                    The E series is a system of preferred numbers (also called preferred values) derived for use in electronic components. 
                    It consists of the E3, E6, E12, E24, E48, E96 and E192 series, where the number after the 'E' designates the quantity of 
                    logarithmic value "steps" per decade. Although it is theoretically possible to produce components of any value, in practice 
                    the need for inventory simplification has led the industry to settle on the E series for resistors, capacitors, inductors, 
                    and zener diodes. Other types of electrical components are either specified by the Renard series (for example fuses) or are 
                    defined in relevant product standards (for example IEC 60228 for wires).
                </p>
                <p>
                    The E series of preferred numbers was chosen such that when a component is manufactured it will end up in a range of roughly 
                    equally spaced values (geometric progression) on a logarithmic scale. Each E series subdivides each decade magnitude into steps 
                    of 3, 6, 12, 24, 48, 96, 192 values.[nb 1] Subdivisions of E3 to E192 ensure the maximum error will be divided in the order of 
                    40%, 20%, 10%, 5%, 2%, 1%, 0.5%. Also, the E192 series is used for 0.25% and 0.1% tolerance resistors.
                </p>
                <p>
                    Historically, the E series is split into two major groupings:
                </p>
                <ul>
                    <li>E3, E6, E12, E24 are subsets of E24. Values in this group are rounded to 2 significant figures.</li>
                    <li>E48, E96, E192 are subsets of E192. Values in this group are rounded to 3 significant figures.</li>
                </ul>
                <h4>Formula</h4>
                <p>
                    The formula for each value is determined by the m-th root, but unfortunately the calculated values don't match the official 
                    values of all E series.
                </p>
                <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <mstyle displaystyle="true" scriptlevel="0">
                        <msub>
                            <mi>V</mi>
                            <mi>n</mi>
                        </msub>
                        <mo>=</mo>
                        <mrow>
                            <mrow>
                                <mi mathvariant="normal">r</mi>
                            </mrow>
                            <mrow>
                                <mi mathvariant="normal">o</mi>
                            </mrow>
                            <mrow>
                                <mi mathvariant="normal">u</mi>
                            </mrow>
                            <mrow>
                                <mi mathvariant="normal">n</mi>
                            </mrow>
                            <mrow>
                                <mi mathvariant="normal">d</mi>
                            </mrow>
                        </mrow>
                        <mo form="prefix" stretchy="false">(</mo>
                        <mroot>
                            <mrow>
                                <mn>1</mn>
                                <msup>
                                    <mn>0</mn>
                                    <mi>n</mi>
                                </msup>
                            </mrow>
                            <mi>m</mi>
                        </mroot>
                        <mo form="postfix" stretchy="false">)</mo>
                    </mstyle>
                </math>
                <dl>
                    <dt>where:</dt>
                    <dd><em>V<sub>n</sub></em> is rounded to 2 significant figures (E3, E6, E12, E24) or 3 significant figures (E48, E96, E192),</dd>
                    <dd><em>m</em> is an integer of the E series group size (3, 6, 12, 24, 48, 96, 192),</dd>
                    <dd><em>n</em>  is an integer of <code>&#123; 0, 1,..., m - 1,  &#125; </code></dd>

                    <dt>exceptions</dt>
                    <dd>
                        The official values for E48 and E96 series match their calculated values, but all other series (E3 / E6 / E12 / E24 / E192) 
                        have one or more official values that don't match their calculated values (see subsets sections below).
                    </dd>
                </dl>
                <a href="https://en.wikipedia.org/wiki/E_series_of_preferred_numbers" target="__blank">source</a>
            </TabItem>
            <TabItem title="Lists" path="lists">
                <dl>
                    <dt>E3 values</dt>
                    <dd>(40% tolerance)</dd>
                    <dd>1.0, 2.2, 4.7</dd>

                    <dt>E6 values</dt>
                    <dd>(20% tolerance)</dd>
                    <dd>1.0, 1.5, 2.2, 3.3, 4.7, 6.8</dd>

                    <dt>E12 values</dt>
                    <dd>(10% tolerance)</dd>
                    <dd>1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2</dd>

                    <dt>E24 values</dt>
                    <dd>(5% tolerance)</dd>
                    <dd>1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1</dd>

                    <dt>E48 values</dt>
                    <dd>(2% tolerance)</dd>
                    <dd>1.00, 1.05, 1.10, 1.15, 1.21, 1.27, 1.33, 1.40, 1.47, 1.54, 1.62, 1.69, 1.78, 1.87, 1.96, 2.05, 2.15, 2.26, 2.37, 2.49, 2.61, 2.74, 2.87, 3.01, 3.16, 3.32, 3.48, 3.65, 3.83, 4.02, 4.22, 4.42, 4.64, 4.87, 5.11, 5.36, 5.62, 5.90, 6.19, 6.49, 6.81, 7.15, 7.50, 7.87, 8.25, 8.66, 9.09, 9.53</dd>

                    <dt>E96 values</dt>
                    <dd>(1% tolerance)</dd>
                    <dd>1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30, 1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76</dd>

                    <dt>E192 values</dt>
                    <dd>(0.5% and lower tolerance)</dd>
                    <dd>1.00, 1.01, 1.02, 1.04, 1.05, 1.06, 1.07, 1.09, 1.10, 1.11, 1.13, 1.14, 1.15, 1.17, 1.18, 1.20, 1.21, 1.23, 1.24, 1.26, 1.27, 1.29, 1.30, 1.32, 1.33, 1.35, 1.37, 1.38, 1.40, 1.42, 1.43, 1.45, 1.47, 1.49, 1.50, 1.52, 1.54, 1.56, 1.58, 1.60, 1.62, 1.64, 1.65, 1.67, 1.69, 1.72, 1.74, 1.76, 1.78, 1.80, 1.82, 1.84, 1.87, 1.89, 1.91, 1.93, 1.96, 1.98, 2.00, 2.03, 2.05, 2.08, 2.10, 2.13, 2.15, 2.18, 2.21, 2.23, 2.26, 2.29, 2.32, 2.34, 2.37, 2.40, 2.43, 2.46, 2.49, 2.52, 2.55, 2.58, 2.61, 2.64, 2.67, 2.71, 2.74, 2.77, 2.80, 2.84, 2.87, 2.91, 2.94, 2.98, 3.01, 3.05, 3.09, 3.12, 3.16, 3.20, 3.24, 3.28, 3.32, 3.36, 3.40, 3.44, 3.48, 3.52, 3.57, 3.61, 3.65, 3.70, 3.74, 3.79, 3.83, 3.88, 3.92, 3.97, 4.02, 4.07, 4.12, 4.17, 4.22, 4.27, 4.32, 4.37, 4.42, 4.48, 4.53, 4.59, 4.64, 4.70, 4.75, 4.81, 4.87, 4.93, 4.99, 5.05, 5.11, 5.17, 5.23, 5.30, 5.36, 5.42, 5.49, 5.56, 5.62, 5.69, 5.76, 5.83, 5.90, 5.97, 6.04, 6.12, 6.19, 6.26, 6.34, 6.42, 6.49, 6.57, 6.65, 6.73, 6.81, 6.90, 6.98, 7.06, 7.15, 7.23, 7.32, 7.41, 7.50, 7.59, 7.68, 7.77, 7.87, 7.96, 8.06, 8.16, 8.25, 8.35, 8.45, 8.56, 8.66, 8.76, 8.87, 8.98, 9.09, 9.20, 9.31, 9.42, 9.53, 9.65, 9.76, 9.88</dd>
                </dl>
            </TabItem>
            <TabItem title="Table" path="table">
                <table className="table table--stick table--full" style={{textAlign:'center'}}>
                    <thead className="table__head">
                        <tr>
                            <th scope="col" style={{backgroundColor:'#e2e2e2'}}>E3</th>
                            <th scope="col" style={{backgroundColor:'#ffe2e2'}}>E6</th>
                            <th scope="col" style={{backgroundColor:'#ffffe2'}}>E12</th>
                            <th scope="col" style={{backgroundColor:'#e2ffe2'}}>E24</th>
                            <th scope="col" style={{backgroundColor:'#e2ffff'}}>E48</th>
                            <th scope="col" style={{backgroundColor:'#e2e2ff'}}>E96</th>
                            <th scope="col" style={{backgroundColor:'#ffe2ff'}}>E192</th>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2e2'}}>1.0</td>
                            <td style={{backgroundColor:'#ffe2e2'}}>1.0</td>
                            <td style={{backgroundColor:'#ffffe2'}}>1.0</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>1.0</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.00</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.00</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.00</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={63} style={{backgroundColor:'#e2e2e2'}}></td>
                            <td rowSpan={31} style={{backgroundColor:'#ffe2e2'}}></td>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.01</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.02</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.02</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.04</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>1.05</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.05</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.05</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.06</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.07</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.07</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.09</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>1.1</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.10</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.10</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.10</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.11</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.13</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.13</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.14</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>1.15</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.15</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.15</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.17</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.18</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.18</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.20</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffffe2'}}>1.2</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>1.2</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.21</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.21</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.21</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.23</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.24</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.24</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.26</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>1.27</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.27</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.27</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.29</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.30</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.30</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.32</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>1.3</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.33</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.33</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.33</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.35</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.37</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.37</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.38</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>1.40</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.40</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.40</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.42</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.43</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.43</td>
                        </tr>
                        
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.45</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffe2e2'}}>1.5</td>
                            <td style={{backgroundColor:'#ffffe2'}}>1.5</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>1.5</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.47</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.47</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.47</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={31} style={{backgroundColor:'#ffe2e2'}}></td>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.49</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.50</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.50</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.52</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>1.54</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.54</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.54</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.56</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.58</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.58</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.60</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>1.6</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.62</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.62</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.62</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.64</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.65</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.65</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.67</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>1.69</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.69</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.69</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.72</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.74</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.74</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.76</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffffe2'}}>1.8</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>1.8</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.78</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.78</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.78</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.80</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.82</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.82</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.84</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>1.87</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.87</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.87</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.89</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.91</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.91</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.93</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>2.0</td>
                            <td style={{backgroundColor:'#e2ffff'}}>1.96</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>1.96</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.96</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>1.98</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.00</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.00</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.03</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>2.05</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.05</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.05</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.08</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.10</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.10</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.13</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2e2'}}>2.2</td>
                            <td style={{backgroundColor:'#ffe2e2'}}>2.2</td>
                            <td style={{backgroundColor:'#ffffe2'}}>2.2</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>2.2</td>
                            <td style={{backgroundColor:'#e2ffff'}}>2.15</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.15</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.15</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={63} style={{backgroundColor:'#e2e2e2'}}></td>
                            <td rowSpan={31} style={{backgroundColor:'#ffe2e2'}}></td>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.18</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.21</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.21</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.23</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>2.26</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.26</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.26</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.29</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.32</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.32</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.34</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>2.4</td>
                            <td style={{backgroundColor:'#e2ffff'}}>2.37</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.37</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.37</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.40</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.43</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.43</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.46</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>2.49</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.49</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.49</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.52</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.55</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.55</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.58</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffffe2'}}>2.7</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>2.7</td>
                            <td style={{backgroundColor:'#e2ffff'}}>2.61</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.61</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.61</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.64</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.67</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.67</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.71</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>2.74</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.74</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.74</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.77</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.80</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.80</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.84</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>3.0</td>
                            <td style={{backgroundColor:'#e2ffff'}}>2.87</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.87</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.87</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.91</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>2.94</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.94</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>2.98</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>3.01</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.01</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.01</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.05</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.09</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.09</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.12</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffe2e2'}}>3.3</td>
                            <td style={{backgroundColor:'#ffffe2'}}>3.3</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>3.3</td>
                            <td style={{backgroundColor:'#e2ffff'}}>3.16</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.16</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.16</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={31} style={{backgroundColor:'#ffe2e2'}}></td>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.20</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.24</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.24</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.28</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>3.32</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.32</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.32</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.36</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.40</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.40</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.44</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>3.6</td>
                            <td style={{backgroundColor:'#e2ffff'}}>3.48</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.48</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.48</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.52</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.57</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.57</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.61</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>3.65</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.65</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.65</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.70</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.74</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.74</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.79</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffffe2'}}>3.9</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>3.9</td>
                            <td style={{backgroundColor:'#e2ffff'}}>3.83</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.83</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.83</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.88</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>3.92</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.92</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>3.97</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>4.02</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.02</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.02</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.07</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.12</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.12</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.17</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>4.3</td>
                            <td style={{backgroundColor:'#e2ffff'}}>4.22</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.22</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.22</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.27</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.32</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.32</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.37</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>4.42</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.42</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.42</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.48</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.53</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.53</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.59</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2e2'}}>4.7</td>
                            <td style={{backgroundColor:'#ffe2e2'}}>4.7</td>
                            <td style={{backgroundColor:'#ffffe2'}}>4.7</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>4.7</td>
                            <td style={{backgroundColor:'#e2ffff'}}>4.64</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.64</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.64</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={63} style={{backgroundColor:'#e2e2e2'}}></td>
                            <td rowSpan={31} style={{backgroundColor:'#ffe2e2'}}></td>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.70</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.75</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.75</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.81</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>4.87</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.87</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.87</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.93</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>4.99</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>4.99</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.05</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>5.1</td>
                            <td style={{backgroundColor:'#e2ffff'}}>5.11</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>5.11</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.11</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.17</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>5.23</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.23</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.30</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>5.36</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>5.36</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.36</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.42</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>5.49</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.49</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.56</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffffe2'}}>5.6</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>5.6</td>
                            <td style={{backgroundColor:'#e2ffff'}}>5.62</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>5.62</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.62</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.69</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>5.76</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.76</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.83</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>5.90</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>5.90</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.90</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>5.97</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>6.04</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.04</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.12</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>6.2</td>
                            <td style={{backgroundColor:'#e2ffff'}}>6.19</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>6.19</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.19</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.26</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>6.34</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.34</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.42</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>6.49</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>6.49</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.49</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.57</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>6.65</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.65</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.73</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffe2e2'}}>6.8</td>
                            <td style={{backgroundColor:'#ffffe2'}}>6.8</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>6.8</td>
                            <td style={{backgroundColor:'#e2ffff'}}>6.81</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>6.81</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.81</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={31} style={{backgroundColor:'#ffe2e2'}}></td>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.90</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>6.98</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>6.98</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.06</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>7.15</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>7.15</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.15</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.23</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>7.32</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.32</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.41</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>7.5</td>
                            <td style={{backgroundColor:'#e2ffff'}}>7.50</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>7.50</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.50</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.59</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>7.68</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.68</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.77</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>7.87</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>7.87</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.87</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>7.96</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>8.06</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.06</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.16</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#ffffe2'}}>8.2</td>
                            <td style={{backgroundColor:'#e2ffe2'}}>8.2</td>
                            <td style={{backgroundColor:'#e2ffff'}}>8.25</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>8.25</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.25</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={15} style={{backgroundColor:'#ffffe2'}}></td>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.35</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>8.45</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.45</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.56</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>8.66</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>8.66</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.66</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.76</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>8.87</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.87</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>8.98</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffe2'}}>9.1</td>
                            <td style={{backgroundColor:'#e2ffff'}}>9.09</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>9.09</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.09</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={7} style={{backgroundColor:'#e2ffe2'}}></td>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.20</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>9.31</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.31</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.42</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2ffff'}}>9.53</td>
                            <td style={{backgroundColor:'#e2e2ff'}}>9.53</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.53</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td rowSpan={3} style={{backgroundColor:'#e2ffff'}}></td>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.65</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}>9.76</td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.76</td>
                        </tr>
                        <tr style={{verticalAlign: 'top'}}>
                            <td style={{backgroundColor:'#e2e2ff'}}></td>
                            <td style={{backgroundColor:'#ffe2ff'}}>9.88</td>
                        </tr>
                    </tbody>
                </table>

                
            </TabItem>
            
        </Tab>
    )
}
