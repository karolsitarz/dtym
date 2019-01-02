import React from 'react';
import ReactDOM from 'react-dom';

import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global-styles';
import theme from './styles/theme';

import Route from './util/Route';
import { StandardGradient } from './util/Icons';
import Modal from '../src/components/Modal';

const socket = new window.WebSocket(`ws://${window.location.hostname}:443`);

const RootStyle = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

// if localstorage is empty, setup some values
if (!window.localStorage['dtym_name']) window.localStorage['dtym_name'] = '';
if (!window.localStorage['dtym_avatar']) window.localStorage['dtym_avatar'] = '';
if (!window.localStorage['dtym_sessionKey']) window.localStorage['dtym_sessionKey'] = '';
if (!window.localStorage['dtym_darkmode']) window.localStorage['dtym_darkmode'] = 'false';

socket.onopen = () => {
  // add socket commands
  require('./util/socketSetup')(socket);

  // add sections
  const Login = require('./sections/Login')(socket);
  const RoomList = require('./sections/RoomList')(socket);
  const RoomLobby = require('./sections/RoomLobby')(socket);

  // main App
  class App extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        darkMode: window.localStorage['dtym_darkmode'] === 'true',
        section: 'Login',
        modal: []
      };
      // section change
      this.$sc = name => this.setState({ section: name });
      // global data
      this.$gd = data => {
        if (data !== undefined) this._$gd = data;
        else return this._$gd;
      };

      // remove modal
      this.$purgeModal = i => {
        const index = this.state.modal.findIndex(c => c.props.id === i);

        this.setState({ modal: this.state.modal.slice(0, index).concat(this.state.modal.slice(index + 1)) });
      };

      // add modal
      window.addEventListener('newModal', e => {
        const index = new Date() * 1;
        const { title, desc, options } = e.detail;
        this.setState({ modal: this.state.modal.concat([<Modal id={index} key={index} $purgeModal={() => this.$purgeModal(index)} title={title} desc={desc} options={options} />]) });
      });
    }

    onThemeChange () {
      window.localStorage['dtym_darkmode'] = !this.state.darkMode;
      this.setState({ darkMode: !this.state.darkMode });
    }

    render () {
      return (
        <ThemeProvider
          theme={theme[this.state.darkMode ? 'dark' : 'light']} >
          <RootStyle>
            <GlobalStyles />
            {/* modals */}
            {this.state.modal}

            {/* routes */}
            <Route for='Login' state={this.state.section}>
              <Login $sc={this.$sc}
                themeChange={e => this.onThemeChange()} />
            </Route>
            <Route for='RoomList' state={this.state.section}>
              <RoomList $sc={this.$sc} $gd={this.$gd} />
            </Route>
            <Route for='RoomLobby' state={this.state.section}>
              <RoomLobby $sc={this.$sc} $gd={this.$gd} />
            </Route>
            <StandardGradient />
          </RootStyle>
        </ThemeProvider>
      );
    }
  }

  // on close event
  socket.onclose = () => {
    Error('connection_lost');
    console.error('Connection lost');
  };

  // when server sends language data
  socket.receive('connect_setup', data => {
    // TODO locale

    ReactDOM.render(<App />, document.getElementById('container'));
  });
};
