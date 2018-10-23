import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tile from './Tile';
import Rules from './Rules';
import { boardSize } from '../helpers/constants';

const GameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 2%;
`;

const BoardWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: ${props => boardSize + (props.dimX * 2)}px;
    height: ${props => boardSize + (props.dimY * 2)}px;
`;

const StyledLabel = styled.label`
    font-size: 2rem;
    width: 100%;
    text-align: center;
    margin-top: 1rem;
`;

const mapTile = (tile, board) => {
  const { dimX, dimY } = board;

  return (
    <Tile
      number={tile.number}
      key={tile.number}
      dimX={dimX}
      dimY={dimY}
      portalColor={tile.color || ''}
      portalDirection={tile.portalDirection || 'NONE'}
      goal={tile.goal}
      start={tile.start}
    />
  );
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { portalTiles: [] };
  }

  /* Add portalDirection to both ends of a portal. Set start/goal. */
  componentDidMount() {
    const { board: { goal, startSquare }, tiles } = this.props;
    const portalTiles = tiles.slice();

    const portals = portalTiles
      .filter(t => t.wormhole)
      .map(t => ({ from: t.number, to: t.wormhole, color: this.randomHex() }));

    portals.forEach(({ from, to, color }) => {
      if (from !== goal && to !== goal) {
        portalTiles[from - 1].portalDirection = 'UP';
        portalTiles[to - 1].portalDirection = 'DOWN';
        portalTiles[from - 1].color = color;
        portalTiles[to - 1].color = color;
      }
    });

    const start = parseInt(startSquare.split('/').pop(), 10);
    portalTiles[start - 1].start = true;
    portalTiles[goal - 1].goal = true;

    this.setState({ portalTiles });
  }

  /* Reverse every other row */
  orderTiles = (tiles, dim) => {
    const chunks = [];

    while (tiles.length > 0) {
      chunks.push(tiles.splice(0, dim));
    }

    return chunks
      .map((chunk, i) => (i % 2 === 1 ? chunk : chunk.reverse()))
      .reduce((acc, chunk) => acc.concat(chunk), [])
      .reverse();
  }

  /* Taken from https://www.paulirish.com/2009/random-hex-color-code-snippets/ */
  randomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  render() {
    const { board, players } = this.props;
    const { portalTiles } = this.state;
    const renderTiles = portalTiles && portalTiles.length > 0;

    const orderedTiles = this.orderTiles(portalTiles.slice(), board.dimX);

    return (
      <GameWrapper>
        <h1>{board.name}</h1>
        <BoardWrapper dimX={board.dimX} dimY={board.dimY}>
          {renderTiles && orderedTiles.map(t => mapTile(t, board))}
        </BoardWrapper>
        <StyledLabel>{`${players[0]} vs. ${players[1]}`}</StyledLabel>
        <Rules />
      </GameWrapper>
    );
  }
}


Game.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    dimX: PropTypes.number.isRequired,
    dimY: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
    startSquare: PropTypes.string.isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  tiles: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
  })).isRequired,
};

export default Game;
