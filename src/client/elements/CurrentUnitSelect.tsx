import React from "react";
import { LabelSelect, LabelSelectProps } from "./Form";

export default function CurrentUnitSelect (props: LabelSelectProps) {
    return (
        <LabelSelect {...props}>
            <option value={Math.pow(10, -6)}>µA</option>
            <option value={Math.pow(10, -3)}>mA</option>
            <option value={1}>&nbsp;A</option>
        </LabelSelect>
    )
}
