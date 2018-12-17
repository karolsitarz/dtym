import React from 'react';

import styled from 'styled-components';

import Button from '../components/Button';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import Section from '../components/Section';
import ScrollInput from '../components/ScrollInput';
import RoomPlate from '../components/roomList/RoomPlate';

module.exports = socket => {
  return class RoomList extends React.Component {
    constructor (props) {
      super(props);

      this.i = {};
      this.state = {
        rooms: []
      };
      this.lastOpened = false;

      this.joinPrompt = data => {
        socket.comm('room_joinRoomPrompt', data);
      };
    }
    componentWillMount () {
      this.roomCreate = e => {
        socket.comm('room_createRoom', {
          name: this.$roomName ? this.$roomName.value : '',
          password: this.$roomPassword ? this.$roomPassword.value : '',
          slots: this.$roomSlots
        });
      };

      socket.receive('roomList_refresh', data => this.setState({ rooms: data }));
    }
    render () {
      return (
        <Section>
          <Button onClick={e => socket.comm('roomList_refresh')}>
            refresh
          </Button>
          <StyledList>
            {this.state.rooms.map(e =>
              <RoomPlate
                key={e.id}
                $id={e.id}
                name={e.name}
                slots={e.slots}
                playerCount={e.playerCount}
                number={e.number}
                password={e.password}
                $openPassword={el => {
                  if (this.lastOpened && this.lastOpened !== el) this.lastOpened.setState({ open: false });
                  this.lastOpened = el;
                }}
                $joinPrompt={e => this.joinPrompt(e)}
              />
            )}
          </StyledList>
          <Card $isACard>
            <TextInput
              $sendValue={e => (this.$roomName = e)}
              placeholder='room name' />
            <TextInput
              $sendValue={e => (this.$roomPassword = e)}
              placeholder='room password' />
            <ScrollInput
              $sendValue={e => (this.$roomSlots = e)}
              min={4} max={20} default={6} label='players no.' />
            <Button
              onClick={e => this.roomCreate()}
              primary>
              create
            </Button>
          </Card>
        </Section>
      );
    }
  };
};

const StyledList = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.MiddleSectionBottomPadding ? props.theme.MiddleSectionBottomPadding : '0px'}
`;
