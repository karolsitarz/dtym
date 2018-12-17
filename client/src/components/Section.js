import React from 'react';

import styled, { ThemeProvider } from 'styled-components';

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 50em;
  margin: auto;
  padding: 1em;
  transition: ${props => props.theme.transition({ t: ['padding'] })};
  /* background: ${props => props.theme.backgroundColor}; */
`;

const padding = {
  MiddleSectionBottomPadding: '3em'
};

export default function Section (props) {
  return (
    <ThemeProvider
      theme={Array.isArray(props.children) && props.children.some(e => e.props.$isACard) ? padding : {}}>
      <StyledSection>
        {props.children}
      </StyledSection>
    </ThemeProvider>
  );
}
