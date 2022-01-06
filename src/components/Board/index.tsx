import Tile from 'components/Tile';

import 'components/Board/Board.css';

import { xAxisPositions, yAxisPositions } from 'constants/constants';

import BlackPawn from "assets/images/pawn_b.png";

const Board = () => {
  // reversed yAxisPositions to match the actual board in real life
  let yAxisPositionsReversed = yAxisPositions.reverse();

  return (
    <div className="board">
      {
        yAxisPositionsReversed.map((yAxisPosition: string) => {
          return xAxisPositions.map((xAxisPosition: string) => {
            const xPosition = xAxisPositions.findIndex(position => position === xAxisPosition);
            const yPosition = yAxisPositions.findIndex(position => position === yAxisPosition);
            return (
              <Tile
                key={`tile-${xAxisPosition}-${yAxisPosition}`}
                xAxisPosition={xPosition}
                yAxisPosition={yPosition}
                image={BlackPawn}
              />
            );
          })
        })
      }
    </div>
  );
}

export default Board;
