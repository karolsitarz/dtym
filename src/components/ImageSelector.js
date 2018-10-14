import React from 'react'

import styled from 'styled-components'

import ImageToURI from '../utils/ImageToURI'

const ImageSelector = styled.label`
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
  }

  & > input {
    display: none;
  }
`

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: undefined
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  handleOnChange (e) {
    ImageToURI(e.target, 200)
      .then(url => {
        this.setState({ image: url })
      })
  }
  render () {
    return (
      <ImageSelector>
        <div
          style={{ backgroundImage: `url(${this.state.image})` }} />
        <input
          onChange={e => this.handleOnChange(e)}
          type='file'
          accept='image/*' />
      </ImageSelector>
    )
  }
}
