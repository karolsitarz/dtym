import React from 'react'

import Button from '../components/Button'
import Card from '../components/Card'
import TextInput from '../components/TextInput'
import Section from '../components/Section'
import ScrollInput from '../components/ScrollInput'
import MiddleSection from '../components/MiddleSection'

module.exports = function (Socket) {
  let i = {}

  const roomCreate = e => {
    // Socket.comm('room_createRoom', {
    //   name: i.roomName,
    //   password: i.roomPassword
    // })
    console.log({
      name: i.roomName.value,
      password: i.roomPassword.value,
      slots: i.roomSlots
    })
  }
  return function RoomList (props) {
    if (props.currentSection === 'RoomList') {
      return (
        <Section>
          <Button>
            siemano
          </Button>
          <MiddleSection>
            siema
          </MiddleSection>
          <Card $isACard>
            <TextInput
              sendValue={e => (i.roomName = e)}
              placeholder='room name' />
            <TextInput
              sendValue={e => (i.roomPassword = e)}
              placeholder='room password' />
            <ScrollInput
              sendValue={e => (i.roomSlots = e)}
              min={4} max={20} default={6} label='players no.' />
            <Button
              onClick={e => roomCreate()}
              primary>
              create
            </Button>
          </Card>
        </Section>
      )
    } else {
      return null
    }
  }
}
