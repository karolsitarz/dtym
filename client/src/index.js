import React from 'react';
import ReactDOM from 'react-dom';

import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global-styles';
import theme from './styles/theme';

const Socket = new window.WebSocket(`ws://${window.location.hostname}:443`);

const RootStyle = styled.div`
  height: 100%;
  width: 100%;`;

// if localstorage is empty, setup some values
if (!window.localStorage['dtym_name']) window.localStorage['dtym_name'] = '';
if (!window.localStorage['dtym_avatar']) window.localStorage['dtym_avatar'] = '';
if (!window.localStorage['dtym_sessionKey']) window.localStorage['dtym_sessionKey'] = '';
if (!window.localStorage['dtym_darkmode']) window.localStorage['dtym_darkmode'] = 'true';

Socket.onopen = () => {
  // add socket commands
  require('./util/socketSetup')(Socket);

  // add sections
  const Login = require('./sections/Login')(Socket);
  const RoomList = require('./sections/RoomList')(Socket);

  // main App
  class App extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        darkMode: window.localStorage['dtym_darkmode'] === 'true',
        section: 'Login'
      };
    }

    onThemeChange () {
      window.localStorage['dtym_darkmode'] = !this.state.darkMode;
      this.setState({ darkMode: !this.state.darkMode });
    }

    onSectionChange (name) {
      this.setState({ section: name });
    }

    render () {
      return (
        <ThemeProvider
          theme={theme[this.state.darkMode ? 'dark' : 'light']} >
          <RootStyle>
            <GlobalStyles />
            <Login
              goToSection={name => this.onSectionChange(name)}
              currentSection={this.state.section}
              themeChange={e => this.onThemeChange()} />
            <RoomList
              currentSection={this.state.section} />
          </RootStyle>
        </ThemeProvider>
      );
    }
  }

  // on close event
  Socket.onclose = () => {
    Error('connection_lost');
    console.log('lol');
  };

  // when server sends language data
  Socket.receive('connect_setup', data => {
    // set ID
    Socket.ID = data.ID;

    // TODO locale

    ReactDOM.render(<App />, document.getElementById('container'));
  });
};
