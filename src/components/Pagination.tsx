import React from "react";
import styled from "styled-components";

import { PaginationItem } from "./PaginationItem";

const StyledPagination = styled.div`
  padding: 24px;
  display: flex;
  justify-content: center;
  .paginationitem {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background-color: var(--med-grey);
    color: var(--white);
    cursor: pointer;
  }
  .paginationitem--active {
    color: var(--primary);
    border: 1px solid red;
  }
  .paginationitem:last-child {
    margin: 0;
  }
`;

interface IProps {
  currentPage: number;
  currentPSlice: number[];
  first: () => void;
  last: () => void;
  next: () => void;
  previous: () => void;
  active: (arg0: number) => void;
  pNumbers: number[];
}

export const Pagination = ({
  currentPage,
  currentPSlice,
  first,
  next,
  previous,
  active,
  pNumbers,
  last,
}: IProps) => (
  <StyledPagination>
    {currentPage > 2 ? (
      <div className="paginationitem" onClick={first}>{`<<`}</div>
    ) : null}
    {currentPage > 1 ? (
      <div className="paginationitem" onClick={previous}>{`<`}</div>
    ) : null}
    {currentPSlice.map(
      (item) =>
        item !== null && (
          <PaginationItem
            content={item}
            currentPage={currentPage}
            key={item}
            onClick={active}
          />
        ),
    )}
    {currentPage < pNumbers.length ? (
      <div className="paginationitem" onClick={next}>{`>`}</div>
    ) : null}
    {currentPage < pNumbers.length - 1 ? (
      <div className="paginationitem" onClick={last}>{`>>`}</div>
    ) : null}
  </StyledPagination>
);
