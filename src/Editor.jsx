import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styled from 'styled-components';

const TextContainer = styled.div`
    height: 85vh;
    fontSize: 20px;
    padding: 3% 5% 0 5%;
`;

export const Editor = () => {
    return (
        <TextContainer>
            <SimpleMDE options={{
                autofocus: true,
                spellChecker: false,
                toolbar: false,
                minHeight: '85vh',
            }} />
        </TextContainer>
    );
}

export default Editor;