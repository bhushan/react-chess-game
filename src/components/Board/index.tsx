import Tile from 'components/Tile';
import 'components/Board/Board.css';
import { xAxisPositions, yAxisPositions } from 'constants/constants';

const Board = () => {
  // reversed yAxisPositions to match the actual board in real life
  let yAxisPositionsReversed = yAxisPositions.reverse();

  return (
    <div className="board">
      {
        yAxisPositionsReversed.map((yAxisPosition: string) => {
          return xAxisPositions.map((xAxisPosition: string) => {
            return (
              <Tile
                key={`tile-${xAxisPosition}-${yAxisPosition}`}
                xAxisPosition={xAxisPosition}
                yAxisPosition={yAxisPosition}
              />
            );
          })
        })
      }
    </div>
  );
}

export default Board;
