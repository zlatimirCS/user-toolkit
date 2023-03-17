import React from "react";
import styled from "styled-components";

const StyledNotification = styled.div`
  .alert {
    position: fixed;
    top: 1vh;
    right: 0px;
    padding: 10px;
    border-radius: 5px;
    background-color: var(--light-blue);
    transform: translateX(105%);
    transition: all 0.3s;
    border: 1px solid var(--blue);
    border-left: 4px solid var(--blue);
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    z-index: 99;
    &--active {
      transform: translateX(-24px);
    }
    p {
      margin-left: 5px;
    }
  }
`;

export interface IProps {
  text: string;
  alert?: boolean;
}

export const Notification = ({ text, alert }: IProps) => (
  <StyledNotification>
    <div className={`alert ${alert ? "alert--active" : "alert"}`}>
      <svg
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"
          fill="rgba(7,68,207,1)"
        />
      </svg>
      <p>{text}</p>
    </div>
  </StyledNotification>
);
