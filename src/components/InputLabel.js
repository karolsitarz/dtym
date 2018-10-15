import React from 'react'

import styled from 'styled-components'

const StyledToggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0.5em 0;
`

const FancySpan = styled.span`
  text-transform: uppercase;
  font-size: .8em;
  letter-spacing: .2em;
  font-weight: 700;
  padding-left: .2em;
  color: ${props => props.theme.main_4};
`

export default function InputLabel (props) {
  return (
    <StyledToggle>
      <FancySpan>
        {props.label}
      </FancySpan>
      {props.children}
    </StyledToggle>
  )
}
