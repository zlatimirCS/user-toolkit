import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { SinglePost } from "../pages/SinglePost";

export const App = () => (
  <Router>
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<SinglePost />} path="post/:id" />
    </Routes>
  </Router>
);
