import React from "react";
import MyChessBoard from "../components/MyChessBoard";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
`;

const sidebarStyle = css`
  width: 300px;
  height: 90vh;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  margin-left: 10px;
`;

const MainPage: React.FC = () => {
  return (
    <div css={containerStyle}>
      <div style={{width: "80vh"}}>
        <div style={{backgroundColor: "#e0e0e0"}}>상대</div>
        <MyChessBoard/>
        <div style={{backgroundColor: "#e0e0e0"}}>나</div>
      </div>
      <div css={sidebarStyle}>
        <div style={{ backgroundColor: "#e0e0e0", marginBottom: "10px"}}>
          초대 링크 전송
        </div>
        <div style={{ backgroundColor: "#e0e0e0"}}>
          채팅창
        </div>
        
      </div>
    </div>
  )
};

export default MainPage;
