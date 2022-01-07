import { useState, useRef, MouseEvent } from 'react';
import Tile from 'components/Tile';

import type { Piece } from 'components/Board/types';

import { getDeepCopy } from 'helper/utils';

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
  const [ activePiece, setActivePiece ] = useState<HTMLDivElement | null>(null);
  const [ fromX, setFromX ] = useState<number | null>(null);
  const [ fromY, setFromY ] = useState<number | null>(null);
  const [ fromImage, setFromImage ] = useState<string | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  // reversed yAxisPositions to match the actual board in real life
  const yAxisPositionsReversed = yAxisPositions.reverse();

  const grabPiece = (e: MouseEvent) => {
    const element = e.target as HTMLDivElement;
    if (element.classList.contains('piece') && boardRef.current) {
      const fromX = Math.floor((e.clientX - boardRef.current.offsetLeft) / 80);
      const fromY = Math.floor((e.clientY - boardRef.current.offsetTop) / 80);
      const fromImage = element.style.backgroundImage.slice(4, -1).replace(/"/g, "");

      setFromX(fromX);
      setFromY(fromY);
      setFromImage(fromImage);

      setActivePiece(element);
    }
  }

  const movePieceWithMouse = (e: MouseEvent) => {
    if (!activePiece || !boardRef.current) {
      return
    }

    // - 30 because the piece image is 60px so it centers on the piece cursor
    const clientX = e.clientX - 30;
    const clientY = e.clientY - 30;

    const minX = boardRef.current.offsetLeft;
    const minY = boardRef.current.offsetTop;

    // some how diff is 50 with clientX and actual maxX, hence -50
    const maxX = boardRef.current.offsetLeft + boardRef.current.clientWidth - 50;
    const maxY = boardRef.current.offsetTop + boardRef.current.clientHeight - 50;

    activePiece.style.position = 'absolute';

    if (clientX < minX) {
      // out side of the board on left side so use minX
      activePiece.style.left = `${minX}px`;
    } else if (clientX > maxX) {
      // out side of the board on right side so use maxX
      activePiece.style.left = `${maxX}px`;
    } else {
      activePiece.style.left = `${clientX}px`;
    }

    if (clientY < minY) {
      // out side of the board on top side so use minY
      activePiece.style.top = `${minY}px`;
    } else if (clientY > maxY) {
      // out side of the board on bottom side so use maxY
      activePiece.style.top = `${maxY}px`;
    } else {
      activePiece.style.top = `${clientY}px`;
    }
  }

  const dropPiece = (e: MouseEvent) => {
    if (!activePiece || !boardRef.current) {
      return
    }

    const toX = Math.floor((e.clientX - boardRef.current.offsetLeft) / 80);
    const toY = Math.floor((e.clientY - boardRef.current.offsetTop) / 80);

    if (fromX !== null && fromY !== null && fromImage !== null) {
      setPiecePositions(prevState => {
        const state = getDeepCopy(prevState)

        const fromIndex = state.findIndex((piece: Piece) => piece.x === fromX && piece.y === fromY)
        const toIndex = state.findIndex((piece: Piece) => piece.x === toX && piece.y === toY);

        if (toIndex === -1) {
          // empty tile so move the piece directly
          state.splice(fromIndex, 1, { x: toX, y: toY, image: fromImage });

          console.log(state.length)

          return [ ...state ];
        }

        // not empty tile so remove both the existing piece to make tiles empty
        state.splice(fromIndex, 1);
        state.splice(toIndex, 1);

        // push new piece to the end of the array with the new position
        // state.push({ x: toX, y: toY, image: fromImage });

        return [ ...state ];
      });

      setActivePiece(null);
      setFromX(null)
      setFromY(null)
      setFromImage(null);
    }
  }

  return (
    <div
      onMouseDown={e => grabPiece(e)}
      onMouseMove={e => movePieceWithMouse(e)}
      onMouseUp={e => dropPiece(e)}
      ref={boardRef}
      className="board"
    >
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
