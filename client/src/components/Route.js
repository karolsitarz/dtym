import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const length = 400;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: ${props => props.theme.transition({ d: `${length}m` })};

  &.section-exit {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
  &.section-exit-active {
    pointer-events: none;
    z-index: 100;
    opacity: 0;
    transform: translate3d(0,1em,0);
  }
  &.section-enter {
    opacity: 0;
  }
  &.section-enter-active {
    pointer-events: none;
    opacity: 1;
  }
`;

export default props => (
  <CSSTransition
    in={props.for === props.state}
    timeout={length}
    classNames='section'
    unmountOnExit >
    <StyledDiv key={props.for}>
      {/* {props.for === props.state ? props.children : null} */}
      {props.children}
    </StyledDiv>
  </CSSTransition>
);
