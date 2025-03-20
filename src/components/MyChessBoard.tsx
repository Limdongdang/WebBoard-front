import { Chess, Piece, Square } from 'chess.js';
import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';

const MyChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [myColor, setMyColor] = useState<"white" | "black">("white");
  const [highlightedSquares, setHighlightedSquares] = useState<{ [key: string]: React.CSSProperties }>({});

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const gameCopy = new Chess(game.fen());

    setHighlightedSquares({});
    
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

  function onPieceClick(piece: string, square: Square) {
    const validMoves = game.moves({ square, verbose: true });
    const highlights: { [key: string]: React.CSSProperties } = {};
    
    validMoves.forEach((move) => {
      if (move.to) {
        highlights[move.to] = { background: "radial-gradient(circle,rgba(38, 88, 39, 0.64) 20%, transparent 25%)" };
      }
    });
    console.log("highlights:", highlights);
  
    setHighlightedSquares(highlights);
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
       onPieceClick={onPieceClick}
       // 테스트 용 css 바로 넣기
       customSquareStyles={highlightedSquares}
      />
    </div>
  );
};

export default MyChessBoard;