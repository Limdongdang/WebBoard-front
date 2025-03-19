import React from "react";
import MyChessBoard from "../components/MyChessBoard";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
`;

const sidebarStyle = css`
  width: 200px;
  height: 100px;
  padding: 20px;
  background-color: #f0f0f0;
`;

const MainPage = () => {
  return (
    <div css={containerStyle}>
      <MyChessBoard />
      <div css={sidebarStyle}>
        DD
      </div>
    </div>
  )
};

export default MainPage;
