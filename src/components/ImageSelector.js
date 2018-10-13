import React from 'react'

import style from 'styled-components'

import ImageToURI from '../utils/ImageToURI'

const StyledImageSelector = style.label`
  &,
  & > div {
    border-radius: 5em;
    height: 10em;
    width: 10em;
    cursor: pointer;
  }

  & > div {
    background-color: #00000014;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
  }

  & > input {
    display: none;
  }
`

export default class ImageSelector extends React.Component {
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
      <StyledImageSelector>
        <div
          style={{ backgroundImage: `url(${this.state.image})` }} />
        <input
          onChange={e => this.handleOnChange(e)}
          type='file'
          accept='image/*' />
      </StyledImageSelector>
    )
  }
}
