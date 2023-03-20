import React, { useState } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { Btn } from "./Btn";

const StyledAddPostModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  background-color: var(--med-blue);
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 2;
  border-radius: 5px;
  border: 2px solid var(--med-blue);
  border-top: 6px solid var(--primary);
  font-size: 16px;
  p {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 5px;
  }
  textarea {
    font-size: 16px;
    resize: none;
    margin-bottom: 2vh;
  }
`;

interface IProps {
  onClose?: (event: { stopPropagation: () => void }) => void;
  userId: number;
}

export const AddPostModal = ({ onClose, userId }: IProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  return (
    <StyledAddPostModal>
      <p>Post title:</p>
      <textarea
        cols={50}
        onChange={(event) => setTitle(event.target.value)}
        rows={4}
        value={title}
      >
        {title}
      </textarea>
      <p>Post content:</p>
      <textarea
        className="body-text"
        cols={50}
        onChange={(event) => setBody(event.target.value)}
        rows={8}
        value={body}
      >
        {body}
      </textarea>
      <div>
        <Btn text="Submit post" type="save" />
        <Btn text="Cancel posting" type="alert" onClick={onClose} />
      </div>
    </StyledAddPostModal>
  );
};
