import { FC } from 'react';
import { TilePropsInterface } from 'components/Tile/types';

import "components/Tile/Tile.css";

const Tile: FC<TilePropsInterface> = ({ xAxisPosition, yAxisPosition, image }) => {
  const number = xAxisPosition + yAxisPosition + 2;

  const classes = number % 2 === 0 ? "tile white-tile" : "tile black-tile";

  return <div className={classes}>
    {
      image &&
      <div
        className="piece"
        style={{ backgroundImage: `url(${image})` }}
      />
    }
  </div>
}

export default Tile;
