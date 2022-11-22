import parse from "html-react-parser";

export default function Intro(props) {
    function parseDescription() {
        const parse = require('html-react-parser')
        return parse(props.description)
    }

    return (
        <div>
            <h1>{props.title}</h1>
            {parseDescription()}
        </div>
    );
}