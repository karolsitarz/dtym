import React from 'react';

import styled, { css } from 'styled-components';

const StyledCard = styled.div`
  position: fixed;
  bottom: 1em;
  transform: translate3d(0,calc(100% - 2em),0);
  left: 0;
  right: 0;
  flex-direction: column;
  transition: transform .6s ease;
  height: auto;
  width: calc(100vw - 2em);
  margin: auto;
  max-height: calc(100vh - 2em);
  display: flex;
  align-items: center;
  /* animation: stickyenter .4s ease backwards; */
  will-change: transform;
  pointer-events: all;

  ::before {
    content: "";
    position: fixed;
    left: -1em;
    bottom: -1em;
    width: 100vw;
    height: 200vh;
    display: block;
    transition: opacity .6s ease;
    background: #00000040;
    opacity: 0;
    pointer-events: none;
  }
  
  ${props => props.$open && css`
    transform: translate3d(0,0,0);
    ::before {
      opacity: 1;
      pointer-events: all;
    }
  `}
`;
const Label = styled.div`
  width: 100%;
  height: 3em;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1;
  background: ${props => props.theme.semiTransparentValue};
  overflow: hidden;
  box-shadow: 0 0 0 1px #0000001f;
  border-radius: 1em 1em 0 0;

  ::before {
    content: "";
    background: ${props => props.theme.mainGradient};
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    opacity: 0;
    transition: opacity .4s ease;
  }
  
  ${props => props.$open && css`
    ::before {
      opacity: 1;
    }
  `}
`;

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  align-self: stretch;
  background-color: ${props => props.theme.backgroundColor};
  border-radius: 0 0 1.5em 1.5em;
`;

const OpenButton = styled.span`
    color: ${props => props.theme.main_2};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    transition: transform .5s ease,opacity .5s ease;
    white-space: nowrap;
    z-index: 2;
    will-change: transform;
    padding: .75em 3.7em .75em 4em;
    display: inline-block;
    text-transform: uppercase;
    font-weight: 700;
    font-size: .65em;
    letter-spacing: .3em;
    pointer-events: none;
  
  ${props => props.$open && css`
    opacity: 0;
    transform: translate3d(-50%,-50%,0) scale(0.5);
  `}
`;
const CloseButton = styled.span`
    color: ${props => props.theme.white};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%,-50%,0) scale(0.5);
    transition: transform .5s ease,opacity .5s ease;
    white-space: nowrap;
    z-index: 2;
    will-change: transform;
    padding: .75em 3.7em .75em 4em;
    display: inline-block;
    text-transform: uppercase;
    font-weight: 700;
    font-size: .65em;
    letter-spacing: .3em;
    pointer-events: none;
    opacity: 0;
  
  ${props => props.$open && css`
    opacity: 1;
    transform: translate3d(-50%,-50%,0);
  `}
`;

export default class Card extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render () {
    return (
      <StyledCard $open={this.state.open} >
        <Label
          onClick={e => this.setState({ open: !this.state.open })}
          $open={this.state.open}>
          <OpenButton $open={this.state.open} >create a new room</OpenButton>
          <CloseButton $open={this.state.open} >close</CloseButton>
        </Label>
        <Container>
          {this.props.children}
        </Container>
      </StyledCard>
    );
  }
}
