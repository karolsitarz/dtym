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
if (!window.localStorage.dtym_name) window.localStorage.dtym_name = '';
if (!window.localStorage.dtym_avatar) window.localStorage.dtym_avatar = '';
if (!window.localStorage.dtym_sessionKey) window.localStorage.dtym_sessionKey = '';
if (!window.localStorage.dtym_darkmode) window.localStorage.dtym_darkmode = 'false';

socket.onopen = () => {
  // add socket commands
  require('./util/socketSetup')(socket);

  // main App
  const App = props => (
    <ThemeProvider
      theme={theme[props.theme ? 'dark' : 'light']} >
      <RootStyle>
        <GlobalStyles />
        {/* modals */}
        {props.modal.map(({ id, title, desc, options }) => (
          <Modal
            id={id}
            key={id}
            title={title}
            desc={desc}
            options={options} />
        ))}

        {/* routes */}
        <Route for='Login' target={Login} />
        <Route for='RoomList' target={RoomList} />
        <Route for='RoomLobby' target={RoomLobby} />
        <StandardGradient />
      </RootStyle>
    </ThemeProvider>
  );

  const mapStateToProps = state => ({
    theme: state.theme,
    modal: state.modal
  });
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
