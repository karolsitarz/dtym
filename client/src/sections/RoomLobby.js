import React from 'react';

import Button from '../components/form/Button';
import Card from '../components/Card';
import { Section, MiddleSection } from '../components/Section';
import ScrollInput from '../components/form/ScrollInput';
import FancySpan from '../components/FancySpan';

module.exports = socket => {
  return class RoomLobby extends React.Component {
    constructor (props) {
      super(props);

      this.a = undefined;
    }
    componentWillMount () {
      socket.receive('room_joinRoom_else');
    }
    render () {
      return (
        <Section>
          <Button onClick={e => socket.comm('roomList_refresh')}>
            refresh
          </Button>
          <MiddleSection>
            <FancySpan>xD</FancySpan>
          </MiddleSection>
          <Card $isACard>
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
