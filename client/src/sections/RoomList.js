import React from 'react';
import { connect } from 'react-redux';
import { changeSection, joinLobby } from '../actions';

import Button from '../components/form/Button';
import Card from '../components/Card';
import TextInput from '../components/form/TextInput';
import { Section, MiddleSection } from '../components/Section';
import ScrollInput from '../components/form/ScrollInput';
import RoomPlate from '../components/roomList/RoomPlate';
import FancySpan from '../components/FancySpan';

class RoomList extends React.Component {
  constructor (props) {
    super(props);
    const { socket, changeSection, joinLobby } = this.props;

    this.i = {};
    this.state = {
      rooms: []
    };
    this.lastOpened = false;
    this.joinPrompt = data => {
      socket.comm('room_joinRoomPrompt', data);
    };
    this.roomCreate = e => {
      socket.comm('room_createRoom', {
        name: this.roomName || '',
        password: this.roomPassword || '',
        slots: this.roomSlots
      });
    };
    socket.receive('roomList_refresh', data => this.setState({ rooms: data }));

    socket.receive('room_joinRoom_you', data => {
      joinLobby(data);
      changeSection('RoomLobby');
    });
  }
  componentDidMount () {
    // refresh roomList
    this.props.socket.comm('roomList_refresh');
  }
  render () {
    return (
      <Section>
        <Button onClick={e => this.props.socket.comm('roomList_refresh')}>
          refresh
        </Button>
        <MiddleSection>
          {!this.state.rooms.length ? (<FancySpan centered opacity>There are no rooms</FancySpan>) : null }
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
        </MiddleSection>
        <Card
          label='create a new room'
          $isACard>
          <TextInput
            sendValue={e => (this.roomName = e)}
            placeholder='room name' />
          <TextInput
            sendValue={e => (this.roomPassword = e)}
            placeholder='room password' />
          <ScrollInput
            $sendValue={e => (this.roomSlots = e)}
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
}

const mapStateToProps = state => ({ socket: state.socket });

export default connect(mapStateToProps, { changeSection, joinLobby })(RoomList);
