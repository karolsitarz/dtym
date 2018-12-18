import React from 'react';

import styled from 'styled-components';

import InputLabel from './InputLabel';

const ToggleContainer = styled.div`
  display: block;
  height: 1.75em;
  background: ${props => props.theme.bg_2};
  min-width: 3.5em;
  border-radius: .875em;
  overflow: hidden;
  flex-shrink: 0;
`;

const ToggleBackground = styled.div`
  height: 100%;
  width: 100%;
  transition: ${props => props.theme.transition({ t: ['all'], e: '.4' })};
  background: ${props => props.theme.secondGradient};
  border-radius: 2em;
  position: absolute;
  left: 0;
  top: 0;
  transform-origin: left center;
  transform: scaleX(.5) translateZ(0);
  opacity: 0;

  input[type=checkbox]:checked + div & {
    transform: scaleX(1) translateZ(0);
    opacity: 1;
  }
`;
const ToggleIndicator = styled.div`
  height: calc(1.75em - 4px);
  width: calc(1.75em - 4px);
  background: ${props => props.theme.mainGradient};
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  transition: ${props => props.theme.transition({ t: ['transform'], e: '.4' })};
  z-index: 2;
  transform: translateZ(0);

  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: ${props => props.theme.transition({ t: ['opacity'], e: '.4' })};
    opacity: 0;
    background: ${props => props.theme.mainGradient};
  }

  input[type=checkbox]:checked + div & {
    transform: translate3d(1.75em,0,0);
  }
  input[type=checkbox]:checked + div &::before {
    opacity: 1;
  }
`;

const Checkbox = styled.input`
  display: none;
  opacity: 0;
  pointer-events: none;
`;

export default function ToggleInput (props) {
  if (props.label) {
    return (
      <InputLabel label={props.label}>
        <Checkbox type='checkbox' />
        <ToggleContainer>
          <ToggleBackground />
          <ToggleIndicator />
        </ToggleContainer>
      </InputLabel>
    );
  } else {
    return (
      <span>
        <Checkbox type='checkbox' />
        <ToggleContainer>
          <ToggleBackground />
          <ToggleIndicator />
        </ToggleContainer>
      </span>
    );
  }
}
