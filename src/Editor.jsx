import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styled from "styled-components";

const TextContainer = styled.div`
  height: 85vh;
  font-size: 18px;
  font-weight: lighter;
`;

export const Editor = (props) => {
  const { text, setText, editorKey } = props;

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <TextContainer>
      <SimpleMDE
        id="mde"
        key={editorKey}
        onChange={handleChange}
        value={text}
        options={{
          autofocus: false,
          spellChecker: false,
          toolbar: false,
          minHeight: "85vh",
        }}
      />
    </TextContainer>
  );
};

export default Editor;
