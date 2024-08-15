import React, { ReactElement } from "react";
import './ArticleTemplate.css'

interface Props {
    header?: ReactElement
    children: ReactElement
}

export default function ArticleTemplate({children, header}: Props) {

    return (
        <article className="article-template">
            <header className="article-template__header">{header}</header>
            {children}
        </article>
    )
}
