import React from 'react'

import Button from '../components/Button'
import Card from '../components/Card'
import TextInput from '../components/TextInput'
import Section from '../components/Section'

export default function (props) {
  if (props.currentSection === 'roomlist') {
    return (
      <Section>
        <Button>
          siemano
        </Button>
        <Card>
          <TextInput placeholder='room name' />
          <TextInput placeholder='room password' />
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
