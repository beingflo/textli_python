import React from 'react';
import './App.css';
import { Editor } from './Editor'
import { Sidebar } from './Sidebar'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const SidebarContainer = styled.div`
    width: 25%;
`;
    //overflow-y: scroll;
    // scrollbar-width: none;

const EditorContainer = styled.div`
    width: 75%;
`;

function App() {
    const [text, setText] = React.useState('');

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <SidebarContainer>
                        <Sidebar text={text} setText={setText} />
                    </SidebarContainer>
                    <EditorContainer>
                        <Editor text={text} setText={setText} />
                    </EditorContainer>
                </Container>
            </header>
        </div>
    );
}

export default App;
