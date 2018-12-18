import React from 'react';

import styled from 'styled-components';

import { Host, SpeakerWave, Menu, Speaker, Door } from '../../util/Icons';

const Container = styled.div`
  box-shadow: 0 -1px 0 0 ${props => props.theme.bg_2};
  flex-shrink: 0;
  :first-child {
    box-shadow: none;
  }
  order: ${props => props.you ? '-1' : '0'};
`;

const UserData = styled.div`
  display: flex;
  height: 5em;
  width: 100%;
  align-items: center;
  transform: translateZ(0);
  overflow: hidden;
  padding: 1em .5em;
  flex-grow: 0;
  flex-shrink: 0;

  ::before {
    content: "";
    background: ${props => props.theme.backgroundColor};
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 0 1em 1em 0;
    transform-origin: left center;
    transition: ${props => !props.$open
    ? props.theme.transition({ t: ['transform'], d: '.4' })
    : props.theme.transition({ t: ['transform'], d: '.4', dy: '.15' })};
    transform: ${props => !props.$open ? 'translateZ(0)'
    : (props.$host ? 'translate3d(-5.2em,0,0)' : 'translate3d(-13.6em,0,0)')}
  }
`;

const PlayerName = styled.div`
  flex-grow: 1;
  padding: 0 1em 0 1.25em;
  font-size: 1em;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${props => props.theme.main_1};

  transition: ${props => !props.$open
    ? props.theme.transition({ d: '.4', dy: '.2' })
    : props.theme.transition({ d: '.4' })};
  transform: ${props => !props.$open ? 'translateZ(0)' : 'translate3d(-3em,0,0)'};
  opacity: ${props => !props.$open ? 1 : 0}
`;

const AvContainer = styled.div`
  z-index: 1;
`;

const Avatar = styled.img`
  display: flex;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledHost = styled(Host)`
  position: absolute;
  transform: translate(-50%,-100%) rotate(-20deg);
  transform-origin: 50% calc(100% + 2.5em / 2);
  height: .95em;
  top: 0;
  left: 50%;

  > path {
    fill: url(#SG);
  }
`;

const StyledSpeaker = styled(SpeakerWave)`
  position: absolute;
  top: 0px;
  left: 50%;
  width: 2em;
  transform: translate(-50%, -100%) rotate(65deg);
  transform-origin: 50% calc(100% + 1.25em) 0px;
  fill: ${props => props.theme.main_5};
`;

const HostSettingsButton = styled.div`
  height: 3em;
  width: 2em;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: ${props => !props.$open
    ? props.theme.transition({ t: ['transform'], d: '.4', dy: '.05' })
    : props.theme.transition({ t: ['transform'], d: '.4', dy: '.1' })};
  transform: ${props => !props.$open ? 'translateZ(0)'
    : (props.$host ? 'translate3d(-5.2em,0,0)' : 'translate3d(-13.6em,0,0)')}
`;

const StyledMenuIcon = styled(Menu)`
  width: 1.2em;
  height: 1.2em;
  fill: ${props => props.theme.semi_2};
`;

// SETTINGS

const StyledSettings = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${props => props.theme.semi_0_5};
  height: 5em;
  overflow: hidden;
  width: 100%;
  border-radius: 0 1em 1em 0;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 .5em;
`;

const StyledSettingsButton = styled.div`
  border-radius: 1em;
  height: 3.5em;
  min-width: 4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin: 0 .1em;
  flex-basis: 0;
  transform-origin: right;
  background-color: ${props => props.theme.semiTransparentValue};
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme[`g_${props.$border}`]}

  > svg {
    fill: ${props => props.theme.main_4};
    max-height: 1.5em;
    max-width: 1.5em;
    width: 100%;
    padding-bottom: .2em;
  }

  > span {
    color: ${props => props.theme.main_4};
    font-weight: 700;
    font-size: .55em;
    line-height: 1em;
    text-transform: uppercase;
    letter-spacing: .05em;
  }
`;

const SettingsButton = props => (
  <StyledSettingsButton
    $border={props.$p} >
    {<props.icon />}
    <span>{props.label}</span>
  </StyledSettingsButton>
);

export default class LobbyPlayer extends React.Component {
  constructor (props) {
    super(props);
    this.state = { open: false };
    this.ID = props.ID;
  }
  render () {
    return (
      <Container>
        <StyledSettings>
          {this.props.host
            ? (<SettingsButton $p='50' label='set as speaker' icon={Speaker} />)
            : ([<SettingsButton $p='25' label='set as speaker' icon={Speaker} />,
              <SettingsButton $p='50' label='transfer host' icon={Host} />,
              <SettingsButton $p='75' label='kick the user' icon={Door} />])}
        </StyledSettings>
        <UserData
          $host={this.props.host}
          $open={this.state.open}>
          <AvContainer>
            <Avatar alt={this.props.name} src={this.props.avatar} />
            {this.props.host ? <StyledHost /> : null}
            {this.props.speaker ? <StyledSpeaker /> : null}
          </AvContainer>
          <PlayerName $open={this.state.open}>{this.props.name}</PlayerName>
          {!this.props.isHost ? null : (
            <HostSettingsButton
              $host={this.props.host}
              $open={this.state.open}
              onClick={e => this.setState({ open: !this.state.open })}>
              <StyledMenuIcon />
            </HostSettingsButton>
          )}
        </UserData>
      </Container>
    );
  }
}
