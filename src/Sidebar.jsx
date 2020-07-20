import React from "react";
import styled from "styled-components";
import { Form, List } from "semantic-ui-react";

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
  padding-bottom: 20px;
  font-size: 28px;
`;

const FileEntry = styled.div`
  color: ${(props) => (props.isSelected ? 'darkgrey' : 'black')};
  font-size: 18px;
  cursor: pointer;
`;

export const Sidebar = (props) => {
  const {
    files,
    onFileClick,
    currentId,
    setSearchTerm,
    onSubmit,
    loading,
  } = props;

  const onChange = (event, data) => {
    const { value } = data;
    setSearchTerm(value);
  };

  return (
    <SidebarContainer>
      <InputContainer>
        <Form onSubmit={onSubmit}>
          <Form.Input
            onChange={onChange}
            loading={loading}
            fluid
            icon="search"
            size="big"
            placeholder="Search notes ..."
          />
        </Form>
      </InputContainer>
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
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
