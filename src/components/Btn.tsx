import React from "react";
import styled from "styled-components";

const StyledBtn = styled.div`
  display: inline-block;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
  .btn {
    padding: 8px;
    font-size: 12px;
    border-radius: 5px;
    color: var(--white);
    width: fit-content;
    cursor: pointer;
    font-weight: 700;
    &--alert {
      background-color: var(--primary);
    }
    &--view {
      background-color: var(--dark-grey);
    }
    &--cancel {
      background-color: var(--light-green);
    }
    &--save {
      background-color: var(--blue);
    }
    &--large {
      font-size: 14px;
    }
  }
`;

interface IProps {
  type: string;
  text: string;
  onClick?: (event: { stopPropagation: () => void }) => void;
  large?: boolean;
}

export const Btn = ({ text, onClick, type, large }: IProps) => (
  <StyledBtn onClick={onClick}>
    <div
      className={`${large ? "btn btn--large" : ""} ${
        type === "alert"
          ? "btn btn--alert"
          : type === "view"
          ? "btn btn--view"
          : type === "cancel"
          ? "btn btn--cancel"
          : type === "save"
          ? "btn btn--save"
          : "btn"
      }`}
    >
      {text}
    </div>
  </StyledBtn>
);
