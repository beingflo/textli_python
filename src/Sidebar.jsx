import React from 'react';
import styled from 'styled-components';
import { Form } from "semantic-ui-react";

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
  padding-bottom: 30px;
  font-size: 28px;
`;

const ResultsContainer = styled.div`
  padding-left: 15px;
`;

const FileEntry = styled.div`
  color: ${props => props.isSelected ? 'blue' : 'black'};
  font-size: 18px;
  padding-bottom: 10px;
  cursor: pointer;
`;

export const Sidebar = (props) => {
  const { files, onFileClick, currentId, setSearchTerm, onSubmit, loading } = props;

  const onChange = (event, data) => {
    const { value } = data;
    setSearchTerm(value);
  };

  return (
    <SidebarContainer>
      <InputContainer>
        <Form onSubmit={onSubmit}>
          <Form.Input onChange={onChange} loading={loading} fluid icon="search" size="big" placeholder="Search notes ..." />
        </Form>
      </InputContainer>
      <ResultsContainer>
        {files.map(file =>
          <FileEntry key={file.id} isSelected={file.id === currentId} data-id={file.id} onClick={e => onFileClick(e)}>
            {file.name || '[no content]'}
          </FileEntry>
        )}
      </ResultsContainer>
    </SidebarContainer>
  );
}

export default Sidebar;