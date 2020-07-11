import React from 'react';
import './App.css';
import { Editor } from './Editor'
import { Sidebar } from './Sidebar'
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
//overflow-y: scroll;
// scrollbar-width: none;

const EditorContainer = styled.div`
  width: 75%;
`;

function App() {
  const [text, setText] = React.useState('');
  const [files, setFiles] = React.useState([])

  React.useEffect(() => {
    fetch(`http://${HOST}/list`).then(res => res.json()).then(res => setFiles(res.sort()))
  }, []);

  const loadFile = e => {
    const name = e.currentTarget.dataset.id;
    fetch(`http://${HOST}/read/${name}`).then(res => res.text()).then(res => setText(res));
  }

  const getFilename = content => {
    const firstLine = content.split('\n')[0]
    const noHash = firstLine.split('#').join('');
    const name = noHash.split(' ').join('');
    return `${name}.md`;
  }

  const saveFile = () => {
    const filename = getFilename(text);
    fetch(`http://${HOST}/create/${filename}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/text',
      },
      body: text,
    })
      .then(response => response.text()).then(data => console.log('Success: ', data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <SidebarContainer>
            <Sidebar files={files} onFileClick={loadFile} />
          </SidebarContainer>
          <EditorContainer>
            <Editor text={text} setText={setText} />
          </EditorContainer>
          <button onClick={saveFile}>Save</button>
        </Container>
      </header>
    </div>
  );
}

export default App;
