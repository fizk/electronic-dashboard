import React from "react";
import { FormRow, FormStack, LabelInput, LabelOutput, LabelSelect } from "../elements/Form";

export default function StyleGuide () {
    return (
        <div>
            <h1 style={{margin: '3rem 0 1.5rem 0'}}>Label Input</h1>
            <FormStack>
                <LabelInput placeholder="write..." />
                <LabelInput placeholder="write..." text="input" />
            </FormStack>

            <h1 style={{margin: '3rem 0 1.5rem 0'}}>Label Output</h1>
            <FormStack>
                <LabelOutput placeholder="write..." />
                <LabelOutput placeholder="write..." text="input" />
            </FormStack>

            <h1 style={{margin: '3rem 0 1.5rem 0'}}>Label Select</h1>
            <FormStack>
                <LabelSelect>
                    <option>option no 1</option>
                    <option>option no 2</option>
                    <option>option no 3</option>
                </LabelSelect>
                <LabelSelect text="make an option">
                    <option>option no 1</option>
                    <option>option no 2</option>
                    <option>option no 3</option>
                </LabelSelect>
            </FormStack>

            <h1 style={{margin: '3rem 0 1.5rem 0'}}>Form Row</h1>
            <FormStack>
                <FormRow variants={['stretch']}>
                    <LabelInput text="some text" placeholder="write..." />
                    <LabelSelect>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                </FormRow>
                <FormRow variants={['compact', 'stretch']}>
                    <LabelInput text="some text" placeholder="write..." />
                    <LabelSelect text="unit">
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                </FormRow>
                <FormRow variants={['compact', 'stretch']}>
                    <LabelInput text="some text" placeholder="write..." attached={['right']} />
                    <LabelSelect text="unit" attached={['left', 'right']}>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                    <LabelSelect text="unit" attached={['left']}>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                </FormRow>
                <FormRow variants={['compact', 'stretch']}>
                    <LabelInput text="some text" placeholder="write..." attached={['right']} />
                    <LabelSelect text="unit" attached={['left', 'right']}>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                    <LabelInput text="some text" placeholder="write..." attached={['left']} />
                </FormRow>
                <FormRow variants={['compact', 'stretch']}>
                    <LabelInput text="some text" placeholder="write..." attached={['right']} />
                    <LabelInput text="some text" placeholder="write..." attached={['left', 'right']} />
                    <LabelSelect text="unit" attached={['left']}>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                </FormRow>
                <FormRow variants={['compact', 'stretch']}>
                    <LabelInput text="some text" placeholder="write..." attached={['right']} />
                    <LabelInput placeholder="write..." attached={['left', 'right']} />
                    <LabelSelect text="unit" attached={['left']}>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                </FormRow>
                <FormRow variants={['compact', 'stretch']}>
                    <LabelOutput text="some text" placeholder="write..." attached={['right']} />
                    <LabelOutput placeholder="write..." attached={['left', 'right']} />
                    <LabelSelect text="unit" attached={['left']}>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                </FormRow>
                <FormRow>
                    <LabelInput text="some text" placeholder="write..." />
                    <LabelInput text="some text" placeholder="write..." />
                    <LabelSelect text="unit">
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                        <option>opt 1</option>
                    </LabelSelect>
                </FormRow>
            </FormStack>
        </div>
    )
}
