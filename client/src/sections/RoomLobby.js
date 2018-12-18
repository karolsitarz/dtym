import React from 'react';

import Button from '../components/form/Button';
import Card from '../components/Card';
import { Section, MiddleSection } from '../components/Section';
import ScrollInput from '../components/form/ScrollInput';
import Toggle from '../components/form/Toggle';

import LobbyPlayer from '../components/roomLobby/LobbyPlayer';

module.exports = socket => {
  return class RoomLobby extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        players: {},
        host: '',
        speaker: ''
      };
    }
    componentWillMount () {
      console.log(this.props.$gd());
      this.setState({
        players: this.props.$gd().players,
        host: this.props.$gd().host,
        speaker: this.props.$gd().speaker
      });
    }
    render () {
      // rearrange so the socket is the first
      let keys = Object.keys(this.state.players);
      const socketIndex = keys.indexOf(socket.ID);
      keys = [socket.ID].concat(keys.slice(0, socketIndex).concat(keys.slice(socketIndex + 1)));

      return (
        <Section>
          <Button onClick={e => socket.comm('roomList_refresh')}>
            refresh
          </Button>
          <MiddleSection>
            {keys.map(e =>
              <LobbyPlayer
                ID={e}
                name={this.state.players[e].name}
                avatar={this.state.players[e].avatar}
                host={this.state.host === e}
                speaker={this.state.speaker === e}
                isHost={this.state.host === socket.ID}
              />
            )}
          </MiddleSection>
          <Card
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
          </Card>
        </Section>
      );
    }
  };
};
