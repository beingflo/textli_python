import React from "react";
import styled from "styled-components";
import { Form, List, Icon } from "semantic-ui-react";

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
  padding-bottom: 40px;
  font-size: 28px;
`;

const ScrollPadding = styled.div`
  height: 30px;
`;

const ResultsContainer = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
`;

const FileEntry = styled.div`
  color: ${(props) => (props.isSelected ? "darkgrey" : "black")};
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
        <List size="mini" divided verticalAlign="middle">
          {files.map((file) => (
            <List.Item key={file.id}>
              <List.Icon name="file text outline" style={{ color: "grey" }} />
              <List.Content>
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
          <ScrollPadding />
        </List>
      </ResultsContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
