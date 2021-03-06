import React, { Component } from 'react';

import styled from 'styled-components';

const TextInputSpan = styled.span`
  text-transform: uppercase;
  font-size: .8em;
  letter-spacing: .2em;
  font-weight: 700;
  padding-left: .2em;
  position: absolute;
  left: 50%;
  top: 50%;
  white-space: nowrap;
  transition: ${props => props.theme.transition({})};
  transform: translate3d(-50%,-50%,0);
  opacity: .5;
  color: ${props => props.theme.main_4};
  
  &::before {
    content: "";
    background: ${props => props.theme.secondGradient};
    position: absolute;
    width: calc(100% + 2em);
    height: calc(100% + .5em);
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%,-50%,0);
    border-radius: 100px;
    transition: ${props => props.theme.transition({ t: ['opacity'] })};
    opacity: 0;
  }
`;
const StyledTextInput = styled.input`
  border-radius: 3em;
  overflow: hidden;
  padding: .75em 3.95em .75em 4em;
  display: inline-block;
  color: ${props => props.theme.main_3};
  background-color: ${props => props.theme.semiTransparentValue};
  border: 0;
  text-align: center;
  font-weight: 700;
  letter-spacing: .05em;
  font-size: .8em;
  width: 100%;
  max-width: 300px;
  margin: .5em 0;

  &:focus + span,
  &:not(:placeholder-shown) + span {
    transform: translate3d(-50%,-2em,0) scale(.75);
    opacity: 1;
  }
  &:focus + span::before,
  &:not(:placeholder-shown) + span::before {
    opacity: 1;
  }
`;

export default class TextInput extends Component {
  constructor (props) {
    super(props);
    const { initial } = this.props;

    this.state = { value: initial && initial.length <= 20 ? initial : '' };
    // this.updateText = this.updateText.bind(this);
  }
  updateText (value) {
    if (value.length <= 20) this.setState({ value });
  }
  render () {
    this.props.sendValue(this.state.value);
    return (
      <label>
        <StyledTextInput
          onChange={e => this.updateText(e.target.value)}
          value={this.state.value}
          type='text'
          maxLength='20'
          placeholder=' ' />
        <TextInputSpan>
          {this.props.placeholder}
        </TextInputSpan>
      </label>
    );
  }
}
