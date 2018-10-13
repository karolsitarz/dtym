import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  border-radius: 10000000px;
  overflow: hidden;
  padding: ${props => typeof (props.children) === 'object' ? '.75em 1.5em' : '.75em 3.7em .75em 4em'};
  text-transform: uppercase;
  font-weight: 700;
  font-size: .65em;
  letter-spacing: .3em;
  cursor: pointer;
  border: 0;
  transition: transform .3s ease;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0 1px #00000014;
  background-size: cover;
  background-position: center;
  background-color: ${props => props.theme.semiTransparentValue};
  background-image: ${props => props.primary ? props.theme.mainGradient : ''};

  color: ${props => props.primary ? props.theme.white : props.theme.main_2};
  fill: ${props => props.primary ? props.theme.white : props.theme.main_2};

  & svg {
    height: 1em;
    pointer-events: none;
  }
`

export default function Button (props) {
  return (
    <StyledButton
      onClick={props.onClick}
      primary={props.primary || null} >
      {props.children}
    </StyledButton>
  )
}
