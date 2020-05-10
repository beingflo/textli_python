import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styled from 'styled-components';

const TextContainer = styled.div`
    height: 85vh;
    font-size: 20px;
    padding: 3% 5% 0 5%;
`;

export const Editor = () => {
    const [text, setText] = React.useState('');
    const handleChange = value => {
        setText(value);
    };

    return (
        <TextContainer>
            <SimpleMDE onChange={handleChange} value={text} options={{
                autofocus: text ? false : true,
                spellChecker: false,
                toolbar: false,
                minHeight: '85vh',
            }} />
        </TextContainer>
    );
}

export default Editor;