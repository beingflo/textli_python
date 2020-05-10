import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styled from 'styled-components';

const TextContainer = styled.div`
    width: 80%;
    height: 80vh;
    fontSize: 20px;
`;

export const Editor = () => {
    return (
        <TextContainer>
            <SimpleMDE options={{
                autofocus: true,
                spellChecker: false,
                toolbar: false,
                minHeight: '80vh',
            }} />
        </TextContainer>
    );
}

export default Editor;