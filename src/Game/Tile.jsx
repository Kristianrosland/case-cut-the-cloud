import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SvgIcon from '../helpers/SvgIcon';
import { boardSize, colors } from '../helpers/constants';

const StyledTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;   
  flex-direction: column; 
  background-color: white;
  border: 1px solid ${colors.primaryGray};
  
  width: ${props => boardSize / props.dimX}px;
  height: ${props => boardSize / props.dimY}px;
`;

const StyledIcon = styled(SvgIcon)`
  width: ${props => (boardSize / props.dimX) * 0.5}px;
  height: ${props => (boardSize / props.dimY) * 0.5}px;
  color: ${props => props.color};
`;

const TileNumber = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  color: ${colors.primaryGray};
`;

const Tile = ({
  number, dimX, dimY, portalColor, portalDirection, goal, start,
}) => (
  <StyledTile dimX={dimX} dimY={dimY}>
    { portalDirection && !goal && !start
        && (
        <StyledIcon
          name={portalDirection}
          color={portalColor}
          dimX={dimX}
          dimY={dimY}
        />
        )
      }
    { goal
        && (
        <StyledIcon
          name="GOAL"
          color={colors.primaryGold}
          dimX={dimX}
          dimY={dimY}
        />
        )
      }
    { start
        && (
        <StyledIcon
          name="START"
          color="black"
          dimX={dimX}
          dimY={dimY}
        />
        )
      }
    <TileNumber>{number}</TileNumber>
  </StyledTile>

);

Tile.propTypes = {
  number: PropTypes.number.isRequired,
  dimX: PropTypes.number.isRequired,
  dimY: PropTypes.number.isRequired,
  portalColor: PropTypes.string,
  portalDirection: PropTypes.oneOf(['UP', 'DOWN', 'NONE']),
  goal: PropTypes.bool,
  start: PropTypes.bool,
};

Tile.defaultProps = {
  portalDirection: 'NONE',
  portalColor: null,
  goal: false,
  start: false,
};

export default Tile;
