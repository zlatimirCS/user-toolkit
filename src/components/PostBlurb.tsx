import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { removePost } from "../redux/post/postSlice";

import { Btn } from "./Btn";
import { Notification } from "./Notification";
import { ConfirmModal } from "../components/ConfirmModal";
import { Overlay } from "../components/Overlay";

import { convertDate } from "../helper";

const StyledPostBlurb = styled.div`
  padding: 10px;
  border: 1px solid var(--secondary);
  background-color: var(--secondary);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 170px;
  font-size: 14px;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    background-color: var(--white);
  }
  .top {
    flex: 1;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  span {
    font-weight: bold;
  }
  .btn-container {
    display: flex;
    gap: 10px;
  }
  a {
    text-decoration: none;
  }
`;

interface IProps {
  post: {
    id: string;
    userId: number;
    datePosted: string;
    title: string;
    body: string;
  };
}

export const PostBlurb = ({ post }: IProps) => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const { id, datePosted, title, body } = post;
  const isoDate = convertDate(datePosted);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 6000);
    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <StyledPostBlurb>
      <Notification
        alert={alert}
        text={`Deleting post ${title.substring(0, 50)}...`}
      />
      <div className="top">
        <p>
          <span>Title:</span>{" "}
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </p>
        <p style={{ marginTop: "5px" }}>
          <span>Excerpt:</span>{" "}
          {body.length > 120 ? `${body.substring(0, 120)}...` : body}
        </p>
      </div>
      <div className="bottom">
        <div className="btn-container">
          <Link to={`/post/${id}`}>
            <Btn text="View" type="view" />
          </Link>
          <Btn onClick={() => setModal(true)} text="Delete" type="alert" />
        </div>
        <div>{isoDate}</div>
      </div>
      {modal ? <Overlay /> : null}
      {modal ? (
        <ConfirmModal
          onCancel={() => setModal(false)}
          onConfirm={() => {
            setTimeout(() => {
              dispatch(removePost(id));
            }, 2000);
            setAlert(true);
          }}
          text={`Are you sure to delete post with title "${
            title.length > 30 ? `${title.substring(0, 30)}...` : title
          }"`}
        />
      ) : null}
    </StyledPostBlurb>
  );
};
