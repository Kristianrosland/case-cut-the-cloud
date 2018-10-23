import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import Game from './Game';
import { colors } from '../helpers/constants';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const Spinner = styled(FontAwesome).attrs({
  spin: true,
  name: 'cog',
  size: '5x',
})`
  color: ${colors.primaryGray};
  margin-top: 10%;
`;

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    const { board: { dimX, dimY, id } } = this.props;
    const numTiles = dimX * dimY;
    const boardUrl = `http://localhost:5000/proxy/boards/${id}/`;

    const tileFetches = Array(numTiles + 1)
      .fill(boardUrl)
      .map((url, tile) => url + tile)
      .slice(1)
      .map(url => fetch(url));

    Promise.all(tileFetches).then((responses) => {
      const toJson = responses.map(res => res.json());
      Promise.all(toJson).then(tiles => this.setState({ tiles }));
    }).catch((error) => {
      this.setState({ error });
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { board, players, invalidate } = this.props;
    const { loading, error, tiles } = this.state;
    const shouldRender = tiles && !loading && !error;

    if (error) {
      invalidate();
    }

    return (
      <React.Fragment>
        { loading && <StyledWrapper><Spinner /></StyledWrapper> }
        { shouldRender
          && (
          <Game
            players={players}
            board={board}
            tiles={tiles}
            invalidate={invalidate}
          />
          )
        }
      </React.Fragment>
    );
  }
}

GameContainer.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    dimX: PropTypes.number.isRequired,
    dimY: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  invalidate: PropTypes.func.isRequired,
};

export default GameContainer;
