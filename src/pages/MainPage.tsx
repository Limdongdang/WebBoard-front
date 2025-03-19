import React from "react";
import MyChessBoard from "../components/MyChessBoard";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
`;

const sidebarStyle = css`
  width: 200px;
  height: 100%;
  padding: 20px;
  background-color: #f0f0f0;
`;

const MainPage: React.FC = () => {
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
