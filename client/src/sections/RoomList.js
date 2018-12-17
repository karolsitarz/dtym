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
          name: this.i.roomName ? this.i.roomName.value : '',
          password: this.i.roomPassword ? this.i.roomPassword.value : '',
          slots: this.i.roomSlots
        });
      };

      socket.receive('roomList_refresh', data => this.setState({ rooms: data }));
    }
    render () {
      if (this.props.currentSection === 'RoomList') {
        return (
          <Section>
            <Button>
              siemano
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
                sendValue={e => (this.i.roomName = e)}
                placeholder='room name' />
              <TextInput
                sendValue={e => (this.i.roomPassword = e)}
                placeholder='room password' />
              <ScrollInput
                sendValue={e => (this.i.roomSlots = e)}
                min={4} max={20} default={6} label='players no.' />
              <Button
                onClick={e => this.roomCreate()}
                primary>
                create
              </Button>
            </Card>
          </Section>
        );
      } else {
        return null;
      }
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
