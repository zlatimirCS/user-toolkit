import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  expandedUserList,
  loadingUsers,
  removeUser,
  toggleUserList,
} from "../redux/user/userSlice";
import {
  selectPosts,
} from "../redux/post/postSlice";
import { Btn } from "./Btn";
import { ConfirmModal } from "./ConfirmModal";
import { Notification } from "./Notification";
import { Overlay } from "./Overlay";
import { PostBlurb } from "./PostBlurb";

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #dddddd;
  border-bottom: 0;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 10px;
  tr.head {
    background-color: var(--med-grey);
  }
  tr.row {
    cursor: pointer;
    transition: all 1s;
    &:nth-child(even) {
      background-color: var(--grey);
    }
    &:nth-child(odd) {
      background-color: var(--white);
    }
    &:hover {
      background-color: var(--secondary);
    }
    &--active {
      background-color: var(--secondary) !important;
    }
  }
  tr.rowExpand {
    background-color: var(--light-grey);
  }
  td,
  th {
    border-bottom: 1px solid var(--border);
    text-align: left;
    padding: 8px;
  }
  .user-post-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .row td:last-child,
  .row th:last-child {
    width: 1%;
    white-space: nowrap;
  }
`;

export interface IProps {
  subsetOfUsers: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
  }[];
}

export const Table = ({ subsetOfUsers }: IProps) => {
  const dispatch = useAppDispatch();
  const loading = useTypedSelector(loadingUsers);
  const expandList = useTypedSelector(expandedUserList);
  const posts = useTypedSelector(selectPosts);
  const [curUser, setCurUser] = useState<string>("");
  const [curUserId, setCurUserId] = useState<number>(1);
  const [alert, setAlert] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [notType, setNotType] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [curUser, curUserId]);

  return (
    <div>
      <Notification
        alert={alert}
        text={`${
          notType === "no-posts"
            ? `${curUser} have no posts.`
            : notType === "user-deleted"
            ? `User ${curUser} successfully deleted.`
            : ""
        }`}
      />
      <StyledTable>
        <thead>
          <tr className="head">
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? (
          <tbody>
            <tr>
              <td>load</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {subsetOfUsers.map((user) => {
              const hasPosts =
                posts.filter((post) => post.userId === user.id).length > 0;
              return (
                <React.Fragment key={user.id}>
                  <tr
                    className={`${
                      expandList.includes(user.id) && hasPosts
                        ? "row row--active"
                        : "row"
                    }`}
                    onClick={
                      hasPosts
                        ? () => dispatch(toggleUserList(user.id))
                        : () => {
                            setNotType("no-posts");
                            setAlert(true);
                            setCurUser(user.first_name);
                          }
                    }
                  >
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td style={{ textAlign: "right" }}>
                      <Btn
                        onClick={(event: { stopPropagation: () => void }) => {
                          event.stopPropagation();
                          setCurUserId(user.id);
                          setModal(true);
                        }}
                        text="Delete user"
                        type="alert"
                      />
                    </td>
                  </tr>
                  {expandList.includes(user.id) && hasPosts ? (
                    <tr className="rowExpand">
                      <td colSpan={4}>
                        <div className="user-post-list">
                          {posts
                            .filter((post) => post.userId === user.id)
                            .sort(
                              (a, b) =>
                                -a.datePosted.localeCompare(b.datePosted),
                            )
                            .map((item) => (
                              <PostBlurb key={item.id} post={item} />
                            ))}
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        )}
      </StyledTable>
      {modal ? <Overlay /> : null}
      {modal ? (
        <ConfirmModal
          onCancel={() => setModal(false)}
          onConfirm={(event: { stopPropagation: () => void }) => {
            event.stopPropagation();
            dispatch(removeUser(curUserId));
            setModal(false);
            setNotType("user-deleted");
            setAlert(true);
            setCurUser(
              subsetOfUsers.filter((user) => user.id === curUserId)[0]
                ?.first_name,
            );
          }}
          text={`Are you sure you want to delete user ${
            subsetOfUsers.filter((user) => user.id === curUserId)[0]?.first_name
          } ${
            subsetOfUsers.filter((user) => user.id === curUserId)[0]?.last_name
          }?`}
        />
      ) : null}
    </div>
  );
};
