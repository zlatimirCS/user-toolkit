import React from "react";

interface IProps {
  content?: number;
  currentPage?: number;
  onClick?: (arg0: number) => void;
}

export const PaginationItem = ({ currentPage, content, onClick }: IProps) => (
  <div
    className={`${
      currentPage === content
        ? "paginationitem paginationitem--active"
        : "paginationitem"
    }`}
    onClick={onClick && content ? () => onClick(content) : undefined}
  >
    {content}
  </div>
);
