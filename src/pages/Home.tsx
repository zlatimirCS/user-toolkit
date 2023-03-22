import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUsers, selectUsers, loadingUsers } from "../redux/user/userSlice";
import { fetchPosts } from "../redux/post/postSlice";

import { Pagination } from "../components/Pagination";
import { Table } from "../components/Table";
import { Spinner } from "../components/Spinner";

const StyledWrapper = styled.div`
  padding: 24px;
  background-color: var(--bg);
  @media (max-width: 768px) {
    padding: 10px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  input {
    padding: 10px;
    border-radius: 5px;
  }
`;

export const Home = () => {
  const dispatch = useAppDispatch();
  const loading = useTypedSelector(loadingUsers);

  const users = useTypedSelector(selectUsers);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");

  const changeSearchTerm = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.first_name.toLowerCase().startsWith(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm]);

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(
    Number(sessionStorage.getItem("currentPage")) || 1,
  );

  const recordsPerPage = 20;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const subsetOfUsers = filteredUsers?.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );
  const nPages = Math.ceil(filteredUsers.length / recordsPerPage);
  const pNumbers = [...Array(nPages).keys()].slice(1);
  const currentPSlice =
    currentPage >= 3 && currentPage !== pNumbers.length
      ? [
          currentPage !== 1 ? currentPage - 1 : 1,
          currentPage === 1 ? 2 : currentPage,
          filteredUsers.length > recordsPerPage * 2 &&
          currentPage !== pNumbers.length &&
          currentPage !== 1
            ? currentPage + 1
            : filteredUsers.length > recordsPerPage * 2 && currentPage === 1
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
      <div className="flex">
        <h1>NaviPartner Tech Test</h1>
        <input
          onChange={changeSearchTerm}
          type="text"
          value={searchTerm}
          placeholder="Search users by first name"
        ></input>
      </div>
      {loading ? <Spinner /> : <Table subsetOfUsers={subsetOfUsers} />}
      {filteredUsers.length > recordsPerPage && !loading && (
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
