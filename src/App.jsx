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
    const [files, setFiles] = React.useState([])

    React.useEffect(() => {
        fetch('http://192.168.0.157:5000/getfiles').then(res => res.json()).then(res => setFiles(res.sort()))
    }, []);

    const handleClick = e => {
        const name = e.currentTarget.dataset.id;
        fetch(`http://192.168.0.157:5000/read/${name}`).then(res => res.text()).then(res => setText(res))
    }

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <SidebarContainer>
                        <Sidebar files={files} onFileClick={handleClick} />
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
