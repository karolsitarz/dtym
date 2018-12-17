import styled from 'styled-components';

export default styled.span`
  text-transform: uppercase;
  font-size: .8em;
  letter-spacing: .2em;
  font-weight: 700;
  padding-left: .2em;
  color: ${props => props.theme.main_4};
  opacity: ${props => !props.opacity ? '1' : (props.opacity === true ? '0.5' : props.opacity)};
  margin: ${props => props.centered ? 'auto' : ''};
`;
