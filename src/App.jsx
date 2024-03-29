import React from "react";
import "./App.css";
import { Editor } from "./Editor";
import { Sidebar } from "./Sidebar";
import { Button, Confirm } from "semantic-ui-react";
import styled from "styled-components";
import {getFile, getFiles, postFile, updateFile, deleteFile, handleError} from "./util";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastStyle } from "./ToastComponents";
import Login from "./Login";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 25%;
`;

const EditorContainer = styled.div`
  width: 75%;
  padding: 0 2%;
  overflow-y: scroll;
  scrollbar-width: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5% 0;
`;

function App() {
  const [text, setText] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(null);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showLoginScreen, setShowLoginScreen] = React.useState(false);

  const [editorKey, setEditorKey] = React.useState(42);

  const forceEditorRerender = React.useCallback(() => {
    setEditorKey(editorKey + 1);
  }, [editorKey]);

  const getInitialFiles = () => {
    getFiles(setFiles, "").catch((err) => handleError(err, setShowLoginScreen));
  }

  React.useEffect(() => getInitialFiles(), []);

  const loadFile = React.useCallback(
    (e) => {
      const id = e.currentTarget.dataset.id;
      getFile(id)
        .then((res) => {
          setText(res.content);
          setCurrentId(id);
        })
        .then(() => forceEditorRerender())
        .catch((err) => handleError(err, setShowLoginScreen));
    },
    [forceEditorRerender]
  );

  const saveFile = React.useCallback(() => {
    if (text === "") {
      return;
    }

    let savePromise;

    if (currentId) {
      savePromise = updateFile(text, currentId);
    } else {
      savePromise = postFile(text).then((res) =>
        setCurrentId(res.file.id.toString())
      );
    }

    savePromise
      .then(() => getFiles(setFiles, searchTerm))
      .then(() => toast.success(<ToastStyle>File saved</ToastStyle>))
      .catch((err) => handleError(err, setShowLoginScreen));
  }, [currentId, text, searchTerm]);

  const newFile = React.useCallback(() => {
    setCurrentId(null);
    setText("");
    forceEditorRerender();
  }, [forceEditorRerender]);

  const delFile = React.useCallback(() => {
    if (!currentId) {
      newFile();
      return;
    }
    deleteFile(currentId)
      .then(() => newFile())
      .then(() => getFiles(setFiles, searchTerm))
      .then(() => toast.success(<ToastStyle>File deleted</ToastStyle>))
      .catch((err) => handleError(err, setShowLoginScreen));
  }, [currentId, newFile, searchTerm]);

  const onSubmit = (inputValue) => {
    setSearchTerm(inputValue);
    setSearchLoading(true);
    getFiles(setFiles, inputValue)
      .then(() => setSearchLoading(false))
      .catch((err) => handleError(err, setShowLoginScreen));
  };

  const onConfirmDelete = () => {
    setShowConfirm(false);
    delFile();
  };

  const onCancelDelete = () => {
    setShowConfirm(false);
  };

  if(showLoginScreen) {
    return <Login setShowLogin={setShowLoginScreen} getInitialFiles={() => getInitialFiles()}/>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            transition={Slide}
            hideProgressBar
            closeOnClick
          />
          <SidebarContainer>
            <Sidebar
              loading={searchLoading}
              onSubmit={onSubmit}
              files={files}
              currentId={currentId}
              onFileClick={loadFile}
            />
          </SidebarContainer>
          <EditorContainer>
            <ButtonContainer>
              <div>
                <Button size="large" onClick={newFile}>
                  New
                </Button>
                <Button size="large" positive onClick={saveFile}>
                  Save
                </Button>
              </div>
              <div>
                <Button
                  size="large"
                  negative
                  onClick={() => setShowConfirm(true)}
                >
                  Delete
                </Button>
              </div>
            </ButtonContainer>
            <Confirm
              open={showConfirm}
              content="Do you want to delete this file?"
              onConfirm={onConfirmDelete}
              confirmButton="Delete"
              cancelButton="Cancel"
              onCancel={onCancelDelete}
              size="mini"
            />
            <Editor text={text} setText={setText} editorKey={editorKey} />
          </EditorContainer>
        </Container>
      </header>
    </div>
  );
}

export default App;
