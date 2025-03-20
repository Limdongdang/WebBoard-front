import { Chess, Piece, Square } from 'chess.js';
import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';

const MyChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [myColor, setMyColor] = useState<"white" | "black">("white");

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const gameCopy = new Chess(game.fen());
    
    const validMoves = gameCopy.moves({ square: sourceSquare, verbose: true });
    const isValidMove = validMoves.some(
      (move) => move.from === sourceSquare && move.to === targetSquare
    );

    if(!isValidMove) {
      console.log("Invalid move");
      return false;
    }

    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // 항상 퀸으로 승진
      });
  
      if (move === null) {
        console.log("Invalid move");
        return false;
      }
  
      setGame(gameCopy); // 상태 업데이트
      console.log("Move made: ", move);
      return true;
    } catch (error) {
      console.error("Error during move:", error);
      return false;
    }
  }

  return (
    <div>
      <Chessboard 
       id="BasicBoard" 
       position={game.fen()} 
       onPieceDrop={onDrop}
       boardOrientation={myColor}
       areArrowsAllowed={true}
       arePremovesAllowed={true}
       allowDragOutsideBoard={false}
      />
    </div>
  );
};

export default MyChessBoard;