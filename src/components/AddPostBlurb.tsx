import React, { useState } from "react";
import styled from "styled-components";

import { Overlay } from "./Overlay";
import { AddPostModal } from "./AddPostModal";

const StyledAddPostBlurb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--secondary);
  background-color: var(--secondary);
  border-radius: 5px;
  height: 170px;
  font-size: 14px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: var(--white);
  }
  div.add {
    color: var(--primary);
    font-weight: bold;
  }
`;

export interface IProps {
  userId: number;
}

export const AddPostBlurb = ({ userId }: IProps) => {
  const [modal, setModal] = useState(false);

  const onClose = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    setModal(false);
  };

  return (
    <StyledAddPostBlurb onClick={() => setModal(true)}>
      <div className="add">+ Add new blog post</div>
      {modal && <Overlay />}
      {modal && (
        <AddPostModal onClose={onClose} userId={userId} setModal={setModal} />
      )}
    </StyledAddPostBlurb>
  );
};
