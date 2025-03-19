import React from 'react';
import { Chessboard } from 'react-chessboard';

const MyChessBoard: React.FC = () => {
  return (
    <div className="chess-board" style={{ width: '800px', height: '800px' }}>
      <Chessboard id="BasicBoard" />
    </div>
  );
};

export default MyChessBoard;