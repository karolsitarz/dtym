import React from 'react'

import style from 'styled-components'

const StyledSection = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 1em;
  transition: padding .3s ease;
  background: ${props => props.theme.backgroundColor}
`

export default function Section (props) {
  return (
    <StyledSection>
      {props.children}
    </StyledSection>
  )
}
