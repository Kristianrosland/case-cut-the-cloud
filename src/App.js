import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import WelcomeScreen from './WelcomeScreen';
import { colors } from './helpers/constants';
import GameContainer from './Game/GameContainer';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    background-color: ${colors.secondary};
    margin: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.5rem;
  width: 100%;
  height: 5rem;
  padding: 1%;
  background-color: ${colors.primary};
  color: white;
  text-transform: uppercase;
  margin: 0;
`;

class App extends Component {
  initialState = { board: undefined, fstName: undefined, sndName: undefined };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  welcomeScreenCallback = (board, fstName, sndName) => {
    this.setState({ board, fstName, sndName });
  }

  invalidate = () => this.setState(this.initialState);

  render() {
    const { board, fstName, sndName } = this.state;
    const players = [fstName, sndName];
    return (
      <React.Fragment>
        <GlobalStyle />
        <Header> Cut the cloud </Header>
        { !board && <WelcomeScreen callback={this.welcomeScreenCallback} /> }
        { board && <GameContainer board={board} players={players} invalidate={this.invalidate} />}
      </React.Fragment>
    );
  }
}

export default App;
