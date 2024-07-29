import React from "react";
import classVariant from "../helpers/classVariant";

export function Section ({children, variant = []}) {
    return (
        <div className={classVariant('section', variant)}>{children}</div>
    )
}