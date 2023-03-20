import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Pagination } from "../components/Pagination";
import { Table } from "../components/Table";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUsers, selectUsers } from "../redux/user/userSlice";
import { fetchPosts } from "../redux/post/postSlice";

const StyledWrapper = styled.div`
  padding: 24px;
  background-color: var(--bg);
`;

export const Home = () => {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem("currentPage")) || 1,
  );

  const recordsPerPage = 20;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const subsetOfUsers = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);
  const pNumbers = [...Array(nPages).keys()].slice(1);
  const currentPSlice =
    currentPage >= 3 && currentPage !== pNumbers.length
      ? [
          currentPage !== 1 ? currentPage - 1 : 1,
          currentPage === 1 ? 2 : currentPage,
          users.length > recordsPerPage * 2 &&
          currentPage !== pNumbers.length &&
          currentPage !== 1
            ? currentPage + 1
            : users.length > recordsPerPage * 2 && currentPage === 1
            ? currentPage + 2
            : 0,
        ]
      : currentPage === pNumbers.length
      ? [currentPage - 2, currentPage - 1, currentPage]
      : [1, 2, 3];
  const next = () => {
    localStorage.setItem("currentPage", String(currentPage + 1));
    setCurrentPage(currentPage + 1);
  };
  const previous = () => {
    localStorage.setItem("currentPage", String(currentPage - 1));
    setCurrentPage(currentPage - 1);
  };
  const active = (item: number) => {
    localStorage.setItem("currentPage", String(item));
    setCurrentPage(item);
  };
  const first = () => {
    localStorage.setItem("currentPage", String(1));
    setCurrentPage(1);
  };
  const last = () => {
    localStorage.setItem("currentPage", String(pNumbers.length));
    setCurrentPage(pNumbers.length);
  };
  // pagination

  return (
    <StyledWrapper>
      <h1>NavigPartner Tech Test Zlatimir</h1>
      <Table subsetOfUsers={subsetOfUsers} />
      {users.length > recordsPerPage && (
        <Pagination
          active={active}
          currentPSlice={currentPSlice}
          currentPage={currentPage}
          first={first}
          last={last}
          next={next}
          pNumbers={pNumbers}
          previous={previous}
        />
      )}
    </StyledWrapper>
  );
};
