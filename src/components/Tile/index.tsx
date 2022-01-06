import { FC } from 'react';
import { TilePropsInterface } from 'components/Tile/types';

import "components/Tile/Tile.css";

const Tile: FC<TilePropsInterface> = ({ xAxisPosition, yAxisPosition, image }) => {
  const number = xAxisPosition + yAxisPosition + 2;

  const classes = number % 2 === 0 ? "tile white-tile" : "tile black-tile";

  return <div className={classes}>
    {image &&
    <div style={{ backgroundImage: `url(${image})`, width: '60px', height: '60px', backgroundRepeat: 'no-repeat' }} />}
  </div>
}

export default Tile;
