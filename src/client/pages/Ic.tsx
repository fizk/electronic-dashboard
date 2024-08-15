import React from "react";
import { Tab, TabItem } from "../elements/Tab";
import CD40106 from "../ics/CD40106";
import Lm358 from "../ics/Lm358";
import TL074 from "../ics/TL074";


export default function Ic () {
    return (
        <Tab>
            <TabItem title="CD 40106" path="40106">
                <CD40106 />
            </TabItem>
            <TabItem title="LM 358" path="358">
                <Lm358 />
            </TabItem>
            <TabItem title="TL 074" path="074">
                <TL074 />
            </TabItem>
        </Tab>
    )
}
