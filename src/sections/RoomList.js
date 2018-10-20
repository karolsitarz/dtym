import React from 'react'

import Button from '../components/Button'
import Card from '../components/Card'
import TextInput from '../components/TextInput'
import Section from '../components/Section'
import ScrollInput from '../components/ScrollInput'
import Toggle from '../components/Toggle'

module.exports = Socket => {
  return function RoomList (props) {
    if (props.currentSection === 'RoomList') {
      return (
        <Section>
          <Button>
            siemano
          </Button>
          <Card>
            <TextInput placeholder='room name' />
            <TextInput placeholder='room password' />
            <ScrollInput min={0} max={20} default={8} infinity label='czesc' />
            <Toggle label='siemano' />
            <Button primary>
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
