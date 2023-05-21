import HTMLReactParser from 'html-react-parser';
import React from 'react'

function TextExtractor() {
    const parser = input =>
        HTMLReactParser(input, {
            replace: domNode => {
                if (domNode instanceof Element && domNode.attribs.class === 'remove') {
                    return <></>;
                }
            }
        });

    return (
        <div>
            TextExtractor
            <div className="pt-5">
                {parser(`
            <h2 style="font-family: 'Lucida Grande';">
              HTMLReactParser<br class="remove"> loaded withCreate React App
            </h2>
          `)}
            </div>
        </div>
    )
}

export default TextExtractor