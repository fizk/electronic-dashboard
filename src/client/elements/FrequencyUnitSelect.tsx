import React from "react";
import { LabelSelect, LabelSelectProps } from "./Form";

export default function FrequencyUnitSelect (props: LabelSelectProps) {
    return (
        <LabelSelect {...props}>
            <option value={1}>Hz</option>
            <option value={Math.pow(10, 3)}>KHz</option>
            <option value={Math.pow(10, 6)}>MHz</option>
            <option value={Math.pow(10, 9)}>GHz</option>
        </LabelSelect>
    )
}
