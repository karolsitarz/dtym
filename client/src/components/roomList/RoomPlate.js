import React from 'react';

import styled, { css } from 'styled-components';

import { Padlock, Check } from '../Icons';

const PlateContainer = styled.div`
  align-self: stretch;
  margin: 0.5em 1.5em;
  transition: transform .3s ease;
  ${props => props['data-openpassword'] !== null && css`
    &[data-openpassword] ~ & {
      transform: translateY(2em);
    } 
    ${PasswordForm} {
      transform: translateY(2.5em);
    } 
  `} 
`;

const InfoPlate = styled.div`
  padding: 1em;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  background: ${props => props.theme.mainGradient};
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  border-radius: .75em;
`;

const RoomName = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .2em;
  word-break: break-word;
  color: ${props => props.theme.white};
`;

const SubInfo = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  font-size: .75em;
  color: ${props => props.theme.white};
  opacity: 0.5;
  letter-spacing: .1em;
  word-break: break-word;
  & > svg {
    height: 1em;
    width: 1em;
    fill: ${props => props.theme.white};
    padding-left: 0.1em;
    margin-bottom: -0.1em;
  }
`;

const PasswordForm = styled.form`
  display: flex;
  height: 3em;
  background: ${props => props.theme.secondGradient};
  overflow: hidden;
  border-radius: 0 0 .75em .75em;
  margin-top: 0;
  position: absolute;
  width: 100%;
  bottom: .5em;
  padding-top: 1em;
  transition: transform .3s ease;
`;

const PasswordInput = styled.input`
  border: none;
  background: transparent;
  flex-grow: 1;
  padding: .5em 1em;
  color: ${props => props.theme.main_5};
  font-weight: 700;
  letter-spacing: .1em;
`;

const StyledCheck = styled.div`
  height: 2em;
  width: 2em;
  fill: ${props => props.theme.main_5};
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  transition: 
    opacity .3s ease,
    transform .3s ease;
  transform: translate3d(-1em,0,0);

  > svg {
    pointer-events: none;
    height: 50%;
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  ${PasswordInput}:not(:placeholder-shown) + & {
    opacity: 1;
    pointer-events: auto;
    transform: translate3d(0,0,0);
  }
`;

export default class InputLabel extends React.Component {
  constructor (props) {
    super(props);
    this.state = { open: false };
    this.passwordInput = '';
  }
  render () {
    return (
      <PlateContainer data-openpassword={this.state.open ? '' : null}>
        {this.props.password
          ? (<PasswordForm>
            <PasswordInput
              placeholder='Password'
              onInput={e => (this.passwordInput = e.target.value)} />
            <StyledCheck onClick={e => {
              this.props.$joinPrompt({
                name: this.props.$id,
                password: this.passwordInput
              });
            }}>
              <Check />
            </StyledCheck>
          </PasswordForm>)
          : null}
        <InfoPlate onClick={e => {
          if (this.props.password) {
            this.props.$openPassword(this);
            this.setState({ open: !this.state.open });
          } else {
            this.props.$joinPrompt({
              name: this.props.$id,
              password: this.passwordInput
            });
          }
        }}>
          <RoomName>{this.props.name}</RoomName>
          <SubInfo>#{this.props.number} {this.props.password ? <Padlock /> : null}</SubInfo>
          <SubInfo>{this.props.playerCount}/{this.props.slots}</SubInfo>
        </InfoPlate>
      </PlateContainer>
    );
  }
}
