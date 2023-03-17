import React from "react";
import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = React.memo(
  createGlobalStyle`${css`
    :root {
      --primary: #b60a0a;
      --secondary: #fadddd;
      --dark-grey: #555555;
      --med-grey: #888888;
      --grey: #f2f2f2;
      --light-grey: #f7f7f7f8;
      --white: #fff;
      --bg: #ffd29f;
      --border: #dddddd;
      --light-green: #19cf19;
      --blue: #0744cf;
      --med-blue: #c0d3f6;
      --light-blue: #edf5ff;
      --dark-yellow: #f3c831;
      --med-yellow: #fdf2ca;
      --light-yellow: #fff8e2;
    }
    * {
      margin: 0;
      box-sizing: border-box;
      padding: 0;
      border: 0;
      font-family: "Montserrat", sans-serif;
    }
    body {
      min-height: 100vh;
      background-color: var(--bg);
    }
    .overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--white);
      z-index: 1;
      opacity: 0.3;
    }
  `}`,
);
