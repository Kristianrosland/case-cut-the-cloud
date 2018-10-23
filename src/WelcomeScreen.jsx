import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { colors } from './helpers/constants';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
`;

const NameInput = styled.input`
    height: 3rem;
    width: 25rem;
    margin-top: 2rem;
    font-size: 1.5rem;
    line-height: 1.5rem;
    padding: 0 1rem;
    border: 1px solid white;
    border-radius: 0.5rem;
`;

const BoardInput = styled(NameInput)`
    width: 10rem;
    text-align: center;
    justify-self: center;
`;

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const StartButton = styled.button`
    height: 3rem;
    width: 12rem;
    margin-top: 0.25rem;
    background-color: ${colors.primary};
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;

    :disabled {
        background-color: ${colors.primaryGray};
        color: ${colors.secondaryGray};
    }
`;

const Icon = styled(FontAwesome).attrs({ size: '3x' })`
    margin-left: 1rem;
    margin-top: 2rem;
    color: ${props => props.color}
`;

const Filler = styled.div`
    margin-right: 1rem;
    width: 3rem;
    `;

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fstName: '',
      sndName: '',
      boardNumber: '',
      loading: false,
    };
  }

  submit = () => {
    const { callback } = this.props;
    const { fstName, sndName, board } = this.state;

    if (this.isValid()) {
      callback(board, fstName, sndName);
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && this.isValid()) {
      this.submit();
    }
  }

  isValid = () => {
    const { fstName, sndName, fetchStatus } = this.state;

    return fstName && sndName && fetchStatus === 'OK';
  }

  changeBoardNumber = (event) => {
    const boardNum = event.target.value;
    const boardsUrl = 'http://localhost:5000/proxy/boards';

    /* Don't fetch empty board number */
    if (boardNum === '') {
      this.setState({
        board: undefined,
        boardNumber: '',
        fetchStatus: undefined,
        loading: false,
      });
      return;
    }

    if (boardNum) {
      this.setState({ loading: true, boardNumber: boardNum });
      fetch(`${boardsUrl}/${boardNum}`)
        .then(res => res.json())
        .then(data => this.setState({
          board: data,
          fetchStatus: 'OK',
          loading: false,
        }))
        .catch(() => this.setState({
          board: undefined,
          fetchStatus: 'ERROR',
          loading: false,
        }));
    }
  }

  render() {
    const {
      fstName, sndName, boardNumber, fetchStatus, loading,
    } = this.state;

    return (
      <StyledWrapper>
        <NameInput
          value={fstName}
          placeholder="Navn på spiller 1"
          onChange={e => this.setState({ fstName: e.target.value })}
          onKeyPress={this.handleKeyPress}
        />
        <NameInput
          value={sndName}
          placeholder="Navn på spiller 2"
          onChange={e => this.setState({ sndName: e.target.value })}
          onKeyPress={this.handleKeyPress}
        />
        <FlexRow>
          { (loading || fetchStatus) && <Filler />}
          <BoardInput
            value={boardNumber}
            placeholder="Brettnummer"
            type="number"
            onChange={this.changeBoardNumber}
            onKeyPress={this.handleKeyPress}
          />

          { loading && <Icon name="cog" spin color={colors.primaryGray} /> }
          { !loading && fetchStatus === 'OK' && <Icon name="check-circle" color="green" /> }
          { !loading && fetchStatus === 'ERROR' && <Icon name="times-circle" color="red" /> }
        </FlexRow>
        <StartButton
          disabled={!this.isValid()}
          onClick={this.submit}
        >
                    Start spillet
        </StartButton>
      </StyledWrapper>
    );
  }
}

WelcomeScreen.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default WelcomeScreen;
