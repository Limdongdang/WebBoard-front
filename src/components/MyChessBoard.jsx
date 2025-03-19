import React from 'react';
import { Chessboard } from 'react-chessboard';

const MyChessBoard = () => {
    return (
        <div className="chess-board" style={{width: '400px', height: '400px'}}>
            <Chessboard id="BasicBoard" />
        </div>
    )
}

export default MyChessBoard;