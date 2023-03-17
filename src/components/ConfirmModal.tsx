import React from "react";
import styled from "styled-components";

import { Btn } from "../components/Btn";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 20vh;
  background-color: var(--light-yellow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 2;
  border-radius: 5px;
  border: 2px solid var(--med-yellow);
  border-top: 6px solid var(--dark-yellow);
  p {
    font-size: 18px;
    font-weight: bold;
    color: var(--dark-gray);
    text-align: center;
  }
  div {
    display: flex;
    margin-top: 10px;
  }
`;

interface IProps {
  onConfirm: (event: { stopPropagation: () => void }) => void;
  onCancel: () => void;
  text?: string;
}

export const ConfirmModal = ({ onConfirm, onCancel, text }: IProps) => (
  <StyledModal>
    <p>{text}</p>
    <div>
      <Btn large onClick={onConfirm} text="YES" type="alert" />
      <Btn large onClick={onCancel} text="NO" type="cancel" />
    </div>
  </StyledModal>
);
