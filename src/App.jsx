import React from 'react';
import './App.css';
import { Editor } from './Editor'
import { Sidebar } from './Sidebar'
import { Button } from "semantic-ui-react";
import styled from 'styled-components';

const HOST = 'localhost:5000';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 25%;
`;

// overflow-y: scroll;
// scrollbar-width: none;

const EditorContainer = styled.div`
  width: 75%;
  padding: 0 2%;
`;

const ButtonContainer = styled.div`
  padding: 1% 0;
`;

function App() {
  const [text, setText] = React.useState('');
  const [files, setFiles] = React.useState([])
  const [currentId, setCurrentId] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://${HOST}/files`).then(res => res.json()).then(res => setFiles(res.files))
  }, []);

  const loadFile = e => {
    const id = e.currentTarget.dataset.id;
    fetch(`http://${HOST}/files/${id}`).then(res => res.json()).then(res => { setText(res.content); setCurrentId(id) });
  }

  const saveFile = () => {
    if (currentId) {
      fetch(`http://${HOST}/files/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/text',
        },
        body: text,
      })
        .then(response => response.json()).then(res => setCurrentId(res.file.id));
    } else {
      fetch(`http://${HOST}/files`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/text',
        },
        body: text,
      })
        .then(response => response.json()).then(res => setCurrentId(res.file.id));

    }
  }

  const deleteFile = () => {};
  const newFile = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <SidebarContainer>
            <Sidebar files={files} onFileClick={loadFile} />
          </SidebarContainer>
          <EditorContainer>
            <ButtonContainer>
              <Button onClick={newFile}>New</Button>
              <Button positive onClick={saveFile}>Save</Button>
              <Button negative onClick={deleteFile}>Delete</Button>
            </ButtonContainer>
            <Editor text={text} setText={setText} />
          </EditorContainer>
        </Container>
      </header>
    </div>
  );
}

export default App;
