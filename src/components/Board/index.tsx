import { useState } from 'react';
import Tile from 'components/Tile';

import 'components/Board/Board.css';

import { xAxisPositions, yAxisPositions } from 'constants/constants';

import BlackKing from "assets/images/king_b.png";
import BlackQueen from "assets/images/queen_b.png";
import BlackRook from "assets/images/rook_b.png";
import BlackBishop from "assets/images/bishop_b.png";
import BlackKnight from "assets/images/knight_b.png";
import BlackPawn from "assets/images/pawn_b.png";

import WhiteKing from "assets/images/king_w.png";
import WhiteQueen from "assets/images/queen_w.png";
import WhiteRook from "assets/images/rook_w.png";
import WhiteBishop from "assets/images/bishop_w.png";
import WhiteKnight from "assets/images/knight_w.png";
import WhitePawn from "assets/images/pawn_w.png";

interface Piece {
  x: number;
  y: number;
  image: string;
}

const initialPiecePositions: Piece[] = [];

[ 0, 1, 2, 3, 4, 5, 6, 7 ].forEach(x => {
  initialPiecePositions.push({ x, y: 1, image: BlackPawn });
  initialPiecePositions.push({ x, y: 6, image: WhitePawn });
});

initialPiecePositions.push({ x: 0, y: 0, image: BlackRook });
initialPiecePositions.push({ x: 1, y: 0, image: BlackKnight });
initialPiecePositions.push({ x: 2, y: 0, image: BlackBishop });
initialPiecePositions.push({ x: 3, y: 0, image: BlackQueen });
initialPiecePositions.push({ x: 4, y: 0, image: BlackKing });
initialPiecePositions.push({ x: 5, y: 0, image: BlackBishop });
initialPiecePositions.push({ x: 6, y: 0, image: BlackKnight });
initialPiecePositions.push({ x: 7, y: 0, image: BlackRook });

initialPiecePositions.push({ x: 0, y: 7, image: WhiteRook });
initialPiecePositions.push({ x: 1, y: 7, image: WhiteKnight });
initialPiecePositions.push({ x: 2, y: 7, image: WhiteBishop });
initialPiecePositions.push({ x: 3, y: 7, image: WhiteQueen });
initialPiecePositions.push({ x: 4, y: 7, image: WhiteKing });
initialPiecePositions.push({ x: 5, y: 7, image: WhiteBishop });
initialPiecePositions.push({ x: 6, y: 7, image: WhiteKnight });
initialPiecePositions.push({ x: 7, y: 7, image: WhiteRook });

const Board = () => {
  const [ piecePositions, setPiecePositions ] = useState<Piece[]>(initialPiecePositions);

  // reversed yAxisPositions to match the actual board in real life
  let yAxisPositionsReversed = yAxisPositions.reverse();

  return (
    <div className="board">
      {
        yAxisPositionsReversed.map((yAxisPosition: string) => {
          return xAxisPositions.map((xAxisPosition: string) => {
            const xPosition = xAxisPositions.findIndex(position => position === xAxisPosition);
            const yPosition = yAxisPositions.findIndex(position => position === yAxisPosition);
            const piece = piecePositions.find(piece => piece.x === xPosition && piece.y === yPosition);
            return (
              <Tile
                key={`${xAxisPosition}${yAxisPosition}`}
                xAxisPosition={xPosition}
                yAxisPosition={yPosition}
                image={piece && piece.image}
              />
            );
          });
        })
      }
    </div>
  );
}

export default Board;
