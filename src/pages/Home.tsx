import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Pagination } from "../components/Pagination";
import { Table } from "../components/Table";
import { Spinner } from "../components/Spinner";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUsers, selectUsers, loadingUsers } from "../redux/user/userSlice";
import { fetchPosts } from "../redux/post/postSlice";

const StyledWrapper = styled.div`
  padding: 24px;
  background-color: var(--bg);
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Home = () => {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(selectUsers);
  const loading = useTypedSelector(loadingUsers);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(
    Number(sessionStorage.getItem("currentPage")) || 1,
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
    sessionStorage.setItem("currentPage", String(currentPage + 1));
    setCurrentPage(currentPage + 1);
  };
  const previous = () => {
    sessionStorage.setItem("currentPage", String(currentPage - 1));
    setCurrentPage(currentPage - 1);
  };
  const active = (item: number) => {
    sessionStorage.setItem("currentPage", String(item));
    setCurrentPage(item);
  };
  const first = () => {
    localStorage.setItem("currentPage", String(1));
    setCurrentPage(1);
  };
  const last = () => {
    sessionStorage.setItem("currentPage", String(pNumbers.length));
    setCurrentPage(pNumbers.length);
  };
  // pagination

  return (
    <StyledWrapper>
      <h1>NaviPartner Tech Test</h1>
      {loading ? <Spinner /> : <Table subsetOfUsers={subsetOfUsers} />}
      {users.length > recordsPerPage && !loading && (
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
