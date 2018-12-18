import React from 'react';

import styled from 'styled-components';

import { Host, Speaker } from '../../util/Icons';

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
  transition: ${props => props.theme.transition({ t: ['transform'], d: '.5' })};

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
    transform: translateZ(0);
    transition: ${props => props.theme.transition({ t: ['transform'], d: '.4' })};
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
  transition: ${props => props.theme.transition({ d: '.4', dy: '.2' })};
  transform: translateZ(0);
  opacity: 1;
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

const StyledSpeaker = styled(Speaker)`
  position: absolute;
  top: 0px;
  left: 50%;
  width: 2em;
  transform: translate(-50%, -100%) rotate(65deg);
  transform-origin: 50% calc(100% + 1.25em) 0px;
  fill: ${props => props.theme.semi_2};
`;

export default class LobbyPlayer extends React.Component {
  constructor (props) {
    super(props);
    this.state = { open: false };
    this.ID = props.ID;
  }
  render () {
    return (
      <Container>
        <UserData>
          <AvContainer>
            <Avatar alt={this.props.name} src={this.props.avatar} />
            {this.props.host ? <StyledHost /> : null}
            {this.props.speaker ? <StyledSpeaker /> : null}
          </AvContainer>
          <PlayerName>{this.props.name}</PlayerName>
        </UserData>
      </Container>
    );
  }
}
