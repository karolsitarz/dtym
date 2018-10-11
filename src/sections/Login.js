import React from 'react'

import Button from '../components/Button'
import Section from '../components/Section'

export default function (props) {
  return (
    <Section>
      <h1>Hi, there.</h1>
      <h4>What's your name?</h4>
      <Button primary>that's me!</Button>
    </Section>
  )
}
