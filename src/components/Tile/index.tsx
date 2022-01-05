import { FC } from 'react';
import "components/Tile/Tile.css";
import { xAxisPositions, yAxisPositions } from 'constants/constants';

const Tile: FC<{ xAxisPosition: string, yAxisPosition: string }> = ({ xAxisPosition, yAxisPosition }) => {
  const xPosition = xAxisPositions.findIndex(position => position === xAxisPosition);
  const yPosition = yAxisPositions.findIndex(position => position === yAxisPosition);
  const number = xPosition + yPosition + 2;

  const classes = number % 2 === 0 ? "tile white-tile" : "tile black-tile";

  return <div className={classes}>{xAxisPosition} - {yAxisPosition}</div>
}

export default Tile;
