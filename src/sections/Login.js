import React from 'react'

import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Section from '../components/Section'

export default function (props) {
  return (
    <Section>
      <h1>Hi, there.</h1>
      <h4>What's your name?</h4>
      <TextInput
        placeholder='gowno xD' />
      <Button
        onClick={e => console.log('gowno xD')}
        primary >
        that's me!
      </Button>
      <Button
        onClick={e => props.themeChange(e)} >
        gowno
      </Button>
    </Section>
  )
}
