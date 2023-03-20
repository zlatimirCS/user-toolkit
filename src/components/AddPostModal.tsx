import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { Btn } from "./Btn";
import { addNewPost } from "../redux/post/postSlice";
import { Notification } from "./Notification";

const StyledAddPostModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  background-color: var(--med-blue);
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 2;
  border-radius: 5px;
  border: 2px solid var(--med-blue);
  border-top: 6px solid var(--primary);
  font-size: 16px;
  p {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 5px;
  }
  textarea {
    font-size: 16px;
    resize: none;
    margin-bottom: 2vh;
  }
`;

interface IProps {
  onClose?: (event: { stopPropagation: () => void }) => void;
  userId: number;
  setModal: any;
}

export const AddPostModal = ({ onClose, userId, setModal }: IProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  const datePosted = new Date().toDateString();
  const id = uuidv4();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 6000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <>
      <Notification alert={alert} text="adding new" />
      <StyledAddPostModal>
        <p>Post title:</p>
        <textarea
          cols={50}
          onChange={(event) => setTitle(event.target.value)}
          rows={4}
          value={title}
          disabled={alert}
        >
          {title}
        </textarea>
        <p>Post content:</p>
        <textarea
          className="body-text"
          cols={50}
          onChange={(event) => setBody(event.target.value)}
          rows={8}
          value={body}
          disabled={alert}
        >
          {body}
        </textarea>
        {!alert && (
          <div>
            <Btn
              text="Submit post"
              type="save"
              onClick={(event: { stopPropagation: () => void }) => {
                event.stopPropagation();
                dispatch(addNewPost({ id, userId, title, body, datePosted }));
                setAlert(true);
                setTimeout(() => {
                  setModal(false);
                }, 2000);
              }}
            />
            <Btn text="Cancel posting" type="alert" onClick={onClose} />
          </div>
        )}
      </StyledAddPostModal>
    </>
  );
};
