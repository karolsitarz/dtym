import React from 'react';

import styled from 'styled-components';

const StyledModalContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const StyledModalBG = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.semi_2};
  cursor: pointer;
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 1em;
`;

const StyledModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em 2em;
`;

const StyledModalButtons = styled.div`
  width: 100%;
  display: flex;
`;

const StyledButton = styled.div`
  cursor: pointer;
  padding: .5em;
  flex-grow: 1;
  font-weight: ${props => props.primary ? 'bold' : 'initial'};
`;

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.options = [];

    for (let option of this.props.options) {
      this.options.push(
        <StyledButton
          primary={option.primary === true}
          onClick={() => this.selectOption(option.action)} >
          {option.text}
        </StyledButton>
      );
      if (option.default === true) this.default = option.action;
    }
  }
  selectOption (action) {
    if (action != null) action();
    this.props.$close();
  }
  render () {
    return (
      <StyledModalContainer>
        <StyledModalBG onClick={() => this.selectOption(this.default)} />
        <StyledModal>
          <StyledModalText>
            {this.props.title}
            {this.props.desc}
          </StyledModalText>
          <StyledModalButtons>
            {this.options}
          </StyledModalButtons>
        </StyledModal>
      </StyledModalContainer>
    );
  }
}
