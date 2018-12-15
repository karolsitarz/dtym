import React from 'react';

import styled from 'styled-components';

import ImageToURI from '../utils/ImageToURI';

const StyledImageSelector = styled.label`
  margin: 2em 0 1em;
  &,
  & > div {
    border-radius: 5em;
    height: 10em;
    width: 10em;
    cursor: pointer;
  }

  & > div {
    background-color: ${props => props.theme.semiTransparentValue};
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    background-image: url(${props => props.image ? props.image : ''})
  }

  & > input {
    display: none;
  }
`;

export default class ImageSelector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      image: undefined
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentWillMount () {
    if (typeof (this.props.initial) === 'string') {
      this.state.image = this.props.initial;
    }
  }
  handleOnChange (e) {
    ImageToURI(e.target, 200)
      .then(url => {
        this.setState({ image: url });
        this.props.success(url);
      });
  }
  render () {
    return (
      <StyledImageSelector image={this.state.image}>
        <div />
        <input
          onChange={e => this.handleOnChange(e)}
          type='file'
          accept='image/*' />
      </StyledImageSelector>
    );
  }
}
