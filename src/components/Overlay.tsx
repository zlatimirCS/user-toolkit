import React from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--white);
  z-index: 1;
  opacity: 0.3;
`;

export const Overlay = () => <StyledOverlay />;
