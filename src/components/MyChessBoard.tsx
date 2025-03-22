import { Chess, Square } from 'chess.js';
import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';

const MyChessBoard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [myColor, setMyColor] = useState<"w" | "b">("w");
  const [highlightedSquares, setHighlightedSquares] = useState<{ [key: string]: React.CSSProperties }>({});
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");
    ws.onopen = () => {
      console.log("Connected to the server");
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "MOVE") {
        // 서버에서 fen 상태를 전달하는것으로 수정해야 함
        const gameCopy = new Chess(message.move.before);

        const result = gameCopy.move({
          from: message.move.from,
          to: message.move.to,
          promotion: "q",
        })

        if (!result) {
          console.log("Invalid move received:", message.move);
        } else {
          setGame(gameCopy);
        }
      }
    };
    setSocket(ws);

    return () => {
      console.log("Closing the connection");
      ws.close();
    };
  }, []);

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

      if(move) {
        // move객체의 모든 값 표시
        console.log("Move made: " + JSON.stringify(move));
        setGame(gameCopy);
        socket?.send(JSON.stringify({ type: "MOVE", move: move }));
      }
      return true;
    } catch (error) {
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
  
    setHighlightedSquares(highlights);
  }

  return (
    <div>
      <Chessboard 
       id="BasicBoard" 
       position={game.fen()} 
       onPieceDrop={onDrop}
       boardOrientation={myColor === "w" ? "white" : "black"}
       areArrowsAllowed={true}
       arePremovesAllowed={true}
       allowDragOutsideBoard={false}
       onPieceClick={onPieceClick}
       onPieceDragBegin={onPieceClick}
       customSquareStyles={highlightedSquares}
      />
      <button onClick={() => setMyColor(myColor === "w" ? "b" : "w")}>
        색 변경
      </button>
    </div>
  );
};

export default MyChessBoard;