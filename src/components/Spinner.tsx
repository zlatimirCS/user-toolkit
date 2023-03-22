import React from "react";
import styled from "styled-components";

const StyledSpinner = styled.div`
  margin-top: 3vh;
  .loader {
    border: 16px solid var(--med-grey);
    border-radius: 50%;
    border-top: 16px solid var(--primary);
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => (
  <StyledSpinner>
    <div className="loader"></div>
  </StyledSpinner>
);
