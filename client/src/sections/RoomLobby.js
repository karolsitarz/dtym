import React from 'react';
import { connect } from 'react-redux';
import { changeSection, joinLobbyElse, leaveLobbyElse, updateLobbyHost, updateLobbySpeaker } from '../actions';

import Button from '../components/form/Button';
import Card from '../components/Card';
import { Section, MiddleSection } from '../components/Section';
import ScrollInput from '../components/form/ScrollInput';
import Toggle from '../components/form/Toggle';

import LobbyPlayer from '../components/roomLobby/LobbyPlayer';

class RoomLobby extends React.Component {
  constructor (props) {
    super(props);
    const { socket, changeSection, joinLobbyElse, leaveLobbyElse, updateLobbyHost, updateLobbySpeaker } = this.props;

    // comms
    socket.receive('room_joinRoom_else', player => joinLobbyElse(player));
    socket.receive('room_leaveRoom_you', () => changeSection('RoomList'));
    socket.receive('room_leaveRoom_else', data => leaveLobbyElse(data));
    socket.receive('room_setSpeaker', playerID => updateLobbySpeaker(playerID));
    socket.receive('room_setHost', playerID => updateLobbyHost(playerID));
  }
  setSpeaker (playerID) {
    this.props.socket.comm('room_host_setSpeaker', playerID);
  }
  setHost ({ ID, name }) {
    window.dispatchEvent(new window.CustomEvent('newModal', {
      detail: {
        title: 'Careful!',
        desc: <span>Are you sure you want to set <b>{name}</b> as this room's host? You will lose all your powers.</span>,
        options: [{
          text: 'Yes',
          action: () => this.props.socket.comm('room_host_setHost', ID)
        }, {
          text: 'No',
          default: true,
          timeout: 10
        }]
      }
    }));
  }
  kickUser ({ ID, name }) {
    window.dispatchEvent(new window.CustomEvent('newModal', {
      detail: {
        title: 'Careful!',
        desc: <span>Are you sure you want to kick <b>{name}</b> out of this room?</span>,
        options: [{
          text: 'Yes',
          action: () => this.props.socket.comm('room_host_kick', ID)
        }, {
          text: 'No',
          default: true,
          timeout: 10
        }]
      }
    }));
  }
  leaveLobby () {
    window.dispatchEvent(new window.CustomEvent('newModal', {
      detail: {
        title: 'Careful!',
        desc: 'Are you sure you want to leave this room?',
        options: [{
          text: 'Yes',
          action: () => this.props.socket.comm('room_leaveRoom')
        }, {
          text: 'No',
          default: true,
          timeout: 10
        }]
      }
    }));
  }
  render () {
    console.log(this.props);
    const { players, host, speaker, socket } = this.props;
    // rearrange so the socket is the first
    let keys = Object.keys(players);
    const socketIndex = keys.indexOf(socket.ID);
    keys = [socket.ID].concat(keys.slice(0, socketIndex).concat(keys.slice(socketIndex + 1)));

    return (
      <Section>
        <Button onClick={e => this.leaveLobby()}>
          exit
        </Button>
        <MiddleSection>
          {keys.map(e =>
            <LobbyPlayer
              ID={e}
              name={players[e].name}
              avatar={players[e].avatar}
              host={host === e}
              speaker={speaker === e}
              isHost={host === socket.ID}
              $setSpeaker={d => this.setSpeaker(d)}
              $setHost={d => this.setHost(d)}
              $kickUser={d => this.kickUser(d)}
            />
          )}
        </MiddleSection>
        {host !== socket.ID
          ? null : (<Card
            label='game settings'
            $isACard>
            <ScrollInput
              $sendValue={e => (this.$roomSlots = e)}
              min={4} max={20} default={6} label='players no.' />
            <Toggle
              checked
              label='Default settings' />
            <Button
              onClick={e => {}}
              primary>
              save
            </Button>
          </Card>)}
      </Section>
    );
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  players: state.lobby.players,
  host: state.lobby.host,
  speaker: state.lobby.speaker
});

export default connect(mapStateToProps, { changeSection, joinLobbyElse, leaveLobbyElse, updateLobbyHost, updateLobbySpeaker })(RoomLobby);
