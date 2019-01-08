import React from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import { setSocket } from './actions';

import GlobalStyles from './styles/global-styles';
import theme from './styles/theme';

import Route from './util/Route';
import { StandardGradient } from './util/Icons';
import Modal from '../src/components/Modal';

import Login from './sections/Login';
import RoomList from './sections/RoomList';
import RoomLobby from './sections/RoomLobby';

const socket = new window.WebSocket(`ws://${window.location.hostname}:443`);
const store = createStore(reducers);
store.dispatch(setSocket(socket));

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

  // main App
  class App extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        modal: []
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
    render () {
      return (
        <ThemeProvider
          theme={theme[this.props.theme ? 'dark' : 'light']} >
          <RootStyle>
            <GlobalStyles />
            {/* modals */}
            {this.state.modal}

            {/* routes */}
            <Route for='Login' target={Login} />
            <Route for='RoomList' target={RoomList} />
            <Route for='RoomLobby' target={RoomLobby} />
            <StandardGradient />
          </RootStyle>
        </ThemeProvider>
      );
    }
  }

  const mapStateToProps = state => ({ theme: state.theme });
  const Application = connect(mapStateToProps)(App);

  // on close event
  socket.onclose = () => {
    Error('connection_lost');
    console.error('Connection lost');
  };

  // when server sends language data
  socket.receive('connect_setup', ({ ID, lang }) => {
    socket.ID = ID;

    ReactDOM.render((
      <Provider store={store}>
        <Application />
      </Provider>),
    document.getElementById('container'));
  });
};
