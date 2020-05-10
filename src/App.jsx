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

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Container>
                <Sidebar />
                <Editor />
                </Container>
            </header>
        </div>
    );
}

export default App;
