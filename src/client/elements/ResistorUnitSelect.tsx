import React from "react";
import { LabelSelect, LabelSelectProps } from "./Form";

export default function ResistorUnitSelect (props: LabelSelectProps) {
    return (
        <LabelSelect {...props}>
            <option value={1}>Ω</option>
            <option value={Math.pow(10, 3)}>KΩ</option>
            <option value={Math.pow(10, 6)}>&nbsp;MΩ</option>
        </LabelSelect>
    )
}
