import React from "react";
import { LabelSelect, LabelSelectProps } from "./Form";

export default function CapacitorUnitSelect (props: LabelSelectProps) {
    return (
        <LabelSelect {...props}>
            <option value={Math.pow(10, -12)}>pF</option>
            <option value={Math.pow(10, -9)}>nF</option>
            <option value={Math.pow(10, -6)}>µF</option>
            <option value={1}>&nbsp;F</option>
        </LabelSelect>
    )
}
