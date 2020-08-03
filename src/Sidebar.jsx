import React from "react";
import styled from "styled-components";
import { Form, List, Icon } from "semantic-ui-react";

const SELECTION_COLOR = "dodgerblue";

const SidebarContainer = styled.div`
  background-color: #fafafa;
  height: 100vh;

  display: flex;
  flex-direction: column;
  padding-top: 5vh;
  padding-left: 8%;
  padding-right: 8%;
`;

const InputContainer = styled.div`
  font-size: 28px;
`;

const ResultsContainer = styled.div`
  overflow-y: scroll;
  margin: 30px 0;
  padding: 0 15px;
  scrollbar-width: none; 
  &:hover {
    scrollbar-width: thin; 
  },
`;

const FileEntry = styled.div`
  color: ${(props) => (props.isSelected ? SELECTION_COLOR : "black")};
  font-size: 18px;
  cursor: pointer;
`;

export const Sidebar = (props) => {
  const { files, onFileClick, currentId, onSubmit, loading } = props;

  const [inputValue, setInputValue] = React.useState("");

  const submit = React.useCallback(
    (value) => {
      onSubmit(value);
      setInputValue(value);
    },
    [setInputValue, onSubmit]
  );

  const onChange = (event, data) => {
    const { value } = data;
    setInputValue(value);
    submit(value);
  };

  return (
    <SidebarContainer>
      <InputContainer>
        <Form onSubmit={() => submit(inputValue)}>
          <Form.Input
            value={inputValue}
            onChange={onChange}
            loading={loading}
            fluid
            icon={
              inputValue === "" ? (
                <Icon name="search" link />
              ) : (
                <Icon name="x" link onClick={() => submit("")} />
              )
            }
            size="big"
            placeholder="Search notes..."
          />
        </Form>
      </InputContainer>
      <ResultsContainer>
        <List size="tiny" verticalAlign="middle">
          {files.map((file) => (
            <List.Item key={file.id} style={{ backgroundColor: file.id === currentId && "white"}}>
              <List.Icon verticalAlign="middle" name="file text outline" style={{ color: file.id === currentId ? SELECTION_COLOR : "grey" }} />
              <List.Content verticalAlign="middle">
                <FileEntry
                  key={file.id}
                  isSelected={file.id === currentId}
                  data-id={file.id}
                  onClick={(e) => onFileClick(e)}
                >
                  {file.name || "[no content]"}
                </FileEntry>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </ResultsContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
