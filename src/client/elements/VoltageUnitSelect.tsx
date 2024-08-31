import React from "react";
import { LabelSelect, LabelSelectProps } from "./Form";

export default function VoltageUnitSelect (props: LabelSelectProps) {
    return (
        <LabelSelect {...props}>
            <option value={Math.pow(10, -6)} >µV</option>
            <option value={Math.pow(10, -3)} >mV</option>
            <option value={1}>&nbsp;V</option>
        </LabelSelect>
    )
}
