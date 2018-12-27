import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';

const length = 300;

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

  transition: ${props => props.theme.transition({ d: `${length}m` })};

  &.modal-enter {
    opacity: 0;
  }
  &.modal-enter-active {
    opacity: 1;
  }
  &.modal-exit {
    opacity: 1;
  }
  &.modal-exit-active {
    opacity: 0;
  }
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
  background-color: ${props => props.theme.backgroundColor};
  border-radius: 1em;
  max-width: 90vw;
  min-width: 200px;
  overflow: hidden;
  
  transition: ${props => props.theme.transition({ d: `${length}m` })};

  .modal-exit & {
    transform: scale(1);
  }
  .modal-exit-active & {
    transform: scale(0.9);
  }
  .modal-enter & {
    transform: scale(0.9);
  }
  .modal-enter-active & {
    transform: scale(1);
  }
`;

const StyledModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
`;

const StyledModalButtons = styled.div`
  width: 100%;
  display: flex;
`;

const StyledButton = styled.div`
  cursor: pointer;
  flex-grow: 1;
  font-weight: ${props => props.default ? 'bold' : 'initial'};
  text-align: center;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  width: 100%;
  margin-bottom: 1em;
  text-align: center;
  font-size: 1.25em;
`;

const StyledDesc = styled.div`
  text-align: center;
`;

const countdown = keyframes`
  to {
    transform: scaleX(0);
  }
`;

const CountdownBar = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  pointer-events: none;
  background: ${props => props.theme.mainGradient};
  height: .25em;
  animation: ${countdown} ${props => props.delay}s both linear;
`;

export default class extends React.Component {
  constructor (props) {
    super(props);
    this.options = [];
    this.state = { active: false };

    for (let option of this.props.options) {
      this.options.push(
        <StyledButton
          default={option.default === true}
          onClick={() => this.selectOption(option.action)} >
          {option.default && option.timeout > 0.5 ? <CountdownBar delay={option.timeout} /> : null}
          {option.text}
        </StyledButton>
      );
      if (option.default === true) {
        this.default = option.action;
        if (!isNaN(option.timeout) && option.timeout > 0.5) {
          this.timeout = window.setTimeout(() => this.selectOption(this.default), option.timeout * 1000);
        }
      }
    }
  }
  componentDidMount () {
    this.setState({ active: true });
  }
  selectOption (action) {
    window.clearTimeout(this.timeout);
    if (action != null) action();
    // this.props.$close();
    this.setState({ active: false });
  }
  render () {
    return (
      <CSSTransition
        in={this.state.active}
        timeout={length}
        classNames='modal'
        unmountOnExit
        onExit={e => this.props.$purgeModal()} >
        <StyledModalContainer>
          <StyledModalBG onClick={() => this.selectOption(this.default)} />
          <StyledModal>
            <StyledModalText>
              <StyledTitle>
                {this.props.title}
              </StyledTitle>
              <StyledDesc>
                {this.props.desc}
              </StyledDesc>
            </StyledModalText>
            <StyledModalButtons>
              {this.options}
            </StyledModalButtons>
          </StyledModal>
        </StyledModalContainer>
      </CSSTransition>
    );
  }
}
