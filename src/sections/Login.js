import React from 'react'

import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Section from '../components/Section'
import ImageSelector from '../components/ImageSelector'

export default function (props) {
  if (props.currentSection === 'login') {
    return (
      <Section>
        <h1>Hi, there.</h1>
        <h4>What's your name?</h4>
        <ImageSelector />
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
  } else {
    return null
  }
}
