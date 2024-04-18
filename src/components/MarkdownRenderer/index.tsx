"use client";

import {marked} from "marked";
import React from "react";

interface Props {
    markdown: string
}

const MarkdownRenderer: React.FC<Props> = ({markdown}: Props) => {

    function getMarkdownText() {
        let rawMarkup = marked.parse(markdown);
        return {__html: rawMarkup};
    }

    return (
        <article className="md1 prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={getMarkdownText()}/>
        </article>
    )
}

export default MarkdownRenderer;