import React from 'react';
import './App.css';
import { Editor } from './Editor'
import { Sidebar } from './Sidebar'
import { Button } from "semantic-ui-react";
import styled from 'styled-components';
import {getFile, getFiles, postFile, updateFile} from "./util";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 20%;
`;

// overflow-y: scroll;
// scrollbar-width: none;

const EditorContainer = styled.div`
  width: 80%;
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
    getFiles(setFiles);
  }, []);

  const loadFile = React.useCallback(e => {
    const id = e.currentTarget.dataset.id;
    getFile(id, setText, setCurrentId);
  }, [setText, setCurrentId]);

  const saveFile = () => {
    if (currentId) {
      updateFile(text, currentId);
    } else {
      postFile(text, setCurrentId);
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
