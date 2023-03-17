import React from "react";
import styled from "styled-components";

const StyledBtn = styled.div`
  margin-bottom: 2vh;
  font-weight: bold;
  display: inline-block;
`;

export const BackButton = () => <StyledBtn>{`<< Back to homepage`}</StyledBtn>;
