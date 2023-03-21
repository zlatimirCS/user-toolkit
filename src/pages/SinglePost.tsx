import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { BackButton } from "../components/BackButton";
import { Btn } from "../components/Btn";
import { ConfirmModal } from "../components/ConfirmModal";
import { Notification } from "../components/Notification";
import { Overlay } from "../components/Overlay";
import { convertDate } from "../helper";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  editPost,
  fetchPosts,
  removePost,
  selectPosts,
} from "../redux/post/postSlice";

const StyledPost = styled.div`
  padding: 24px;
  @media (max-width: 768px) {
    padding: 10px;
  }
  h1 {
    margin-bottom: 2vh;
  }
  .hero {
    width: 100%;
    height: 60vh;
    object-fit: cover;
    margin-bottom: 2vh;
  }
  p.body-text {
    font-size: 20px;
    line-height: 2em;
    white-space: pre-wrap;
  }
  p.required {
    color: var(--primary);
    font-weight: bold;
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  a {
    text-decoration: none;
    color: var(--primary);
  }
  h3 {
    margin-bottom: 2vh;
  }
  textarea {
    resize: none;
    width: 100%;
    font-size: 2em;
    margin-bottom: 2vh;
    font-weight: 700;
    white-space: pre-wrap;
    &.body-text {
      font-size: 20px;
      line-height: 2em;
    }
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2vh;
    @media (max-width: 567px) {
    flex-direction: column;
    }}
    .btn-container > div:first-child {
      @media (max-width: 567px) {
     margin-bottom: 10px;
    }
    }
`;

export const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const posts = useTypedSelector(selectPosts);
  const [userId, setUserId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [datePosted, setDatePosted] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [titleText, setTitleText] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const curPost = posts && posts.filter((post: { id: string }) => post.id === id)[0];
  const date = convertDate(curPost?.datePosted);

  useEffect(() => {
    dispatch(fetchPosts());
    setBodyText(curPost?.body);
    setTitleText(curPost?.title);
  }, [posts]);

  useEffect(() => {
    setTitle(curPost?.title);
    setDatePosted(date);
    setBody(curPost?.body);
    setUserId(curPost?.userId);
  }, [posts]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 6000);
    return () => clearTimeout(timeout);
  }, [id]);

  const data = { userId, datePosted, title, body };

  return (
    curPost && (
      <StyledPost>
        <Notification
          alert={alert}
          text={`Deleting post ${title?.substring(0, 50)}...`}
        />
        <Link to="/">
          <BackButton />
        </Link>
        {isEditing ? (
          <div>
            <textarea
              cols={50}
              onChange={(event) => setTitle(event.target.value)}
              rows={4}
              value={title}
            >
              {titleText}
            </textarea>
          </div>
        ) : (
          <h1>{titleText}</h1>
        )}
        <img
          alt="hero image"
          className="hero"
          src="https://www.intercoolstudio.com/wp-content/uploads/2023/03/blog-g32ba87a39_1920-1.jpg"
        />
        <h3>Last updated: {datePosted}</h3>
        {isEditing ? (
          <div>
            <textarea
              className="body-text"
              cols={50}
              onChange={(event) => setBody(event.target.value)}
              rows={8}
              value={body}
            >
              {bodyText}
            </textarea>
          </div>
        ) : (
          <p className="body-text">{bodyText}</p>
        )}
        {title === "" && <p className="required">Post title can't be empty!</p>}
        {body === "" && <p className="required">Post body can't be empty!</p>}
        <div className="btn-container">
          <div>
            {isEditing && id ? (
              <Btn
                large
                onClick={() => {
                  if (body === "" || title === "") {
                    return;
                  }
                  dispatch(editPost({ id, data }));
                  setTitleText(title);
                  setBodyText(body);
                  setIsEditing(false);
                }}
                text="Save changes"
                type="save"
              />
            ) : (
              <Btn
                large
                onClick={() => setIsEditing(true)}
                text="Edit post"
                type="view"
              />
            )}
            {isEditing ? (
              <Btn
                large
                onClick={() => {
                  setIsEditing(false);
                  setTitle(titleText);
                  setBody(bodyText);
                }}
                text="Cancel editing"
                type="cancel"
              />
            ) : null}
          </div>
          {id ? (
            <div>
              <Btn
                large
                onClick={() => setModal(true)}
                text="Delete post"
                type="alert"
              />
            </div>
          ) : null}
        </div>
        {modal ? <Overlay /> : null}
        {modal && id ? (
          <ConfirmModal
            onCancel={() => setModal(false)}
            onConfirm={() => {
              setTimeout(() => dispatch(removePost(id)), 2000);
              setAlert(true);
              setTimeout(() => {
                navigate("/");
              }, 2000);
            }}
            text={`Are you sure to delete post with title "${
              title.length > 30 ? `${title.substring(0, 30)}...` : title
            }"`}
          />
        ) : null}
      </StyledPost>
    )
  );
};
