import React from 'react';
import ReactDOM from 'react-dom';

import styled, { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global-styles';
import theme from './styles/theme';

import Route from './util/Route';
import { StandardGradient } from './util/Icons';
import Modal from '../src/components/Modal';

const Socket = new window.WebSocket(`ws://${window.location.hostname}:443`);

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

Socket.onopen = () => {
  // add socket commands
  require('./util/socketSetup')(Socket);

  // add sections
  const Login = require('./sections/Login')(Socket);
  const RoomList = require('./sections/RoomList')(Socket);
  const RoomLobby = require('./sections/RoomLobby')(Socket);

  // main App
  class App extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        darkMode: window.localStorage['dtym_darkmode'] === 'true',
        section: 'Login',
        modal: [(<Modal
          title='Hey there!'
          desc='Welcome back! Happy Lying!! This is a lorem ipsum.'
          options={[{
            text: 'Great!',
            primary: true,
            default: false,
            action: () => console.log('aa')
          }, {
            text: 'No',
            default: true
          }]} />)]
      };
      // section change
      this.$sc = name => this.setState({ section: name });
      // global data
      this.$gd = data => {
        if (data !== undefined) this._$gd = data;
        else return this._$gd;
      };

      // remove modal
      this.$closemodal = modal => {
        const index = this.state.modal.indexOf(modal);
        this.setState({ modal: this.state.modal.slice(0, index).concat(this.state.modal.slice(index + 1)) });
      };
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
            {this.state.modal.map(c => React.cloneElement(c, { $close: () => this.$closemodal(c) }))}

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
