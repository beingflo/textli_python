import React from 'react';
import './App.css';
import { Editor } from './Editor'
import { Sidebar } from './Sidebar'
import { Button } from "semantic-ui-react";
import styled from 'styled-components';
import {getFile, getFiles, postFile, updateFile, deleteFile} from "./util";

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
  padding: 1.5% 0;
`;

function App() {
  const [text, setText] = React.useState('');
  const [files, setFiles] = React.useState([])
  const [currentId, setCurrentId] = React.useState(null);

  const [editorKey, setEditorKey] = React.useState(42);

  const forceEditorRerender = React.useCallback(() => {
    setEditorKey(editorKey +  1);
  }, [editorKey]);

  React.useEffect(() => {
    getFiles(setFiles);
  }, []);

  const loadFile = React.useCallback(e => {
    const id = e.currentTarget.dataset.id;
    getFile(id, setText, setCurrentId).then(() => forceEditorRerender());
  }, [forceEditorRerender]);

  const saveFile = React.useCallback(() => {
    if (currentId) {
      updateFile(text, currentId).then(() => getFiles(setFiles));
    } else {
      postFile(text, setCurrentId).then(() => getFiles(setFiles));
    }
  }, [currentId, text]);

  const newFile = React.useCallback(() => {
    setCurrentId(null);
    setText('');
    forceEditorRerender();
  }, [forceEditorRerender]);

  const delFile = React.useCallback(() => {
    if (!currentId) {
      newFile();
      return;
    }
    deleteFile(currentId).then(() => newFile()).then(() => getFiles(setFiles));
  }, [currentId, newFile]);

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <SidebarContainer>
            <Sidebar files={files} currentId={currentId} onFileClick={loadFile} />
          </SidebarContainer>
          <EditorContainer>
            <ButtonContainer>
              <Button onClick={newFile}>New</Button>
              <Button positive onClick={saveFile}>Save</Button>
              <Button negative onClick={delFile}>Delete</Button>
            </ButtonContainer>
            <Editor text={text} setText={setText} editorKey={editorKey} />
          </EditorContainer>
        </Container>
      </header>
    </div>
  );
}

export default App;
